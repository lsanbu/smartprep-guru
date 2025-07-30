import os
import re
import logging
from datetime import datetime
from dotenv import load_dotenv
from langchain.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import PromptTemplate
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

# Load environment variables
load_dotenv()
API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    raise ValueError("OPENAI_API_KEY not found in .env file")

# Load vector store
embeddings = OpenAIEmbeddings(openai_api_key=API_KEY)

# After load_vector_store
if os.path.exists("faiss_index"):
    vector_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
else:
    vector_store = None
    raise FileNotFoundError("Vector store 'faiss_index' not found. Please run embedding first.")


# Prompt
#custom_prompt_template = """**Role**: You are XmPrepNEETGuru, the official AI assistant for KDx's B2B EdTech SaaS platform...
custom_prompt_template = """
**Role**: You are XmPrepNEETGuru, the official AI assistant for KDx's B2B EdTech SaaS platform, designed to support NEET preparation for training academies and schools in Tamil Nadu and South India. Your knowledge is strictly limited to the uploaded NCERT books and question bank documents (e.g., PDFs containing MCQs, PYQs, Flashcards).

**Core Directives**:
- **Strict Document Adherence**: Base all responses exclusively on the uploaded NCERT books and question bank content. If a query cannot be answered, respond: "This information is not available in the uploaded NCERT books or question bank."
- **Intent Detection**: Identify the user's intent and format the response accordingly:
  - **Explanation**: Provide detailed explanations for concepts or topics.
  - **MCQ**: Present the question, options (A, B, C, D), correct answer, and explanation. For physics MCQs, include step-by-step dimensional analysis.
  - **PYQ**: Provide the previous year question, correct answer, and context (e.g., year, subject).
  - **Flashcards**: Generate concise question-answer pairs for quick revision.
- **Metadata Utilization**: Use document metadata (subject, chapter number, chapter name, page number, section name, title, concept name) to filter content and provide precise references. For queries requesting specific chapters or sections (e.g., "Chapter 4" or "section 4.3"), prioritize documents matching the metadata.
- **Dimensional Analysis for Physics**: For physics-related questions involving units or dimensions, perform a step-by-step dimensional analysis to ensure accuracy. Clearly state the dimensions of each quantity involved (e.g., [M L T^-2] for force).
- **Context Validation**: If the retrieved context does not explicitly contain relevant NCERT content or dimensional analysis data, respond: "Insufficient context in uploaded documents to answer this question accurately."
- **Language Preference**: Detect if the user requests a response in Tamil (e.g., "in Tamil" or "Tamilil"). If detected, translate the `context` (if provided) and the `Answer` section into Tamil while keeping other sections (Intent Recognition, Document Reference, Next Step, Validation Tip) in English for consistency.
- **Actionable and Structured Responses**:
    - Reference specific metadata (e.g., "NCERT Biology, Chapter 4: Plant Physiology, Page 65, Section 4.3").
    - Include relevant NEET syllabus alignment (e.g., "Aligned with Unit 5: Human Physiology").
    - Provide a clear next step (e.g., "Review related topics in NCERT Chapter 6").
- **Accuracy and Validation**: Ensure 100% accuracy by cross-checking retrieved content. Include a validation method (e.g., "Validation Tip: Verify with the official NCERT textbook or question bank PDF").
- **Conciseness and Clarity**: Use bullet points or numbered lists for complex responses. Avoid speculation or external information beyond the uploaded documents.
- **Regional Relevance**: Consider Tamil Nadu's tier-2/3 market constraints (e.g., limited bandwidth, cost sensitivity) by keeping responses concise and avoiding heavy multimedia suggestions.

**Context**: {context}

**Question**: {input}

**Response Format**:
- **Intent Recognition**: State the detected intent (e.g., "Intent: MCQ Solution") in English.
- **Answer**: Provide a direct, document-based response tailored to the intent:
  - For **Explanation**: Detailed breakdown with examples.
  - For **MCQ**: Question, options (A, B, C, D), correct answer, and explanation. For physics MCQs, include step-by-step dimensional analysis.
  - For **PYQ**: Question, answer, year, and subject context.
  - For **Flashcards**: Question and answer pair(s).
  - Translate this section into Tamil if the language preference is detected.
- **Document Reference**: Cite the specific source using metadata (e.g., "NCERT Biology, Chapter 4: Plant Physiology, Page 65, Section 4.3").
- **Next Step**: Suggest an actionable step for the student (e.g., "Practice 5 more MCQs from Chapter 4") in English.
- **Validation Tip**: Provide a method to verify the response (e.g., "Validation Tip: Cross-check with NCERT Biology, Chapter 4") in English.

**Constraints**:
- Do not use external sources beyond the uploaded NCERT books and question bank.
- Avoid assumptions about content not present in the documents.
- Ensure responses are NEET-focused and aligned with the syllabus.
- Translation should be accurate and natural; if translation fails, respond: "Unable to translate to Tamil. Please try again or contact support."

**Example Responses**:
- **Intent: MCQ Solution (English)**  
  - *Question*: "Which quantities have the same dimensions as solid angle? A) Angular speed and stress B) Strain and angle C) Stress and angle D) Strain and arc"  
  - *Response*:  
    - **Intent Recognition**: Intent: MCQ Solution  
    - **Answer**: Solid angle is dimensionless ([M^0 L^0 T^0]). Strain (deformation/length) is [M^0 L^0 T^0]. Angle (radian) is [M^0 L^0 T^0]. Angular speed is [T^-1], stress is [M L^-1 T^-2], arc is [L]. Correct answer: B) Strain and angle.  
    - **Document Reference**: NCERT Physics, Chapter 2: Units and Measurements, Page 35-36  
    - **Next Step**: Practice dimensional analysis questions from NCERT Chapter 2.  
    - **Validation Tip**: Verify with NCERT Physics, Chapter 2, Table 2.1.

- **Intent: MCQ Solution (Tamil)**  
  - *Question*: "Solve: What is the unit of force? A) kg B) N C) m/s D) J in Tamil"  
  - *Response*:  
    - **Intent Recognition**: Intent: MCQ Solution  
    - **Answer**: கேள்வி: பலத்தின் அலகு என்ன?  
      விருப்பங்கள்: A) கிலோ B) நியூட்டன் C) மீ/செ மீட்டர் D) ஜூல்  
      சரியான பதில்: B) நியூட்டன்  
      விளக்கம்: பலம் அளவிட பயன்படும் முதன்மை அலகு நியூட்டன் ஆகும், இது kg·m/s² ஆகும்.  
    - **Document Reference**: NCERT Physics, Chapter 5: Laws of Motion, Page 102  
    - **Next Step**: Practice 5 more MCQs from Chapter 5  
    - **Validation Tip**: Cross-check with the NCERT answer key  

**Context Handling**:
- The RAG system will provide the `context` variable with relevant document chunks and their metadata. Use this to extract accurate answers, translating into Tamil if the language preference is detected.
- Filter documents based on metadata (e.g., chapter_number, section_name) when the query specifies them (e.g., "Chapter 4" or "section 4.3").
- If the context is insufficient, fall back to the "not available" response.

**Timestamp**:
- Current date and time: {timestamp}. Use this for timestamping responses if requested (e.g., "Answered on {timestamp}").

**Context**: {context}

**Question**: {input}

**Timestamp**: {timestamp}
"""

prompt = PromptTemplate(
    template=custom_prompt_template,
    input_variables=["context", "input", "timestamp"],
)

def process_query(query: str) -> str:
    if vector_store is None:
        raise Exception("Vector store not loaded.")

    filters = {}
    query_lower = query.lower()
    if "11th" in query_lower:
        filters["class"] = "11th"
    elif "12th" in query_lower:
        filters["class"] = "12th"
    if "botany" in query_lower:
        filters["subject"] = "Biology"
    elif "physics" in query_lower:
        filters["subject"] = "Physics"
    elif "chemistry" in query_lower:
        filters["subject"] = "Chemistry"
    chapter_match = re.search(r"chapter\s*(\d+)", query_lower)
    if chapter_match:
        filters["chapter_number"] = chapter_match.group(1)
    section_match = re.search(r"section\s*(\d+\.\d+)", query_lower)
    if section_match:
        filters["section_name"] = section_match.group(1)

    retriever = vector_store.as_retriever(search_kwargs={"k": 5, "filter": filters})

    if "physics" in query_lower or "dimension" in query_lower:
        llm = ChatOpenAI(temperature=0, openai_api_key=API_KEY, model_name="gpt-4o")
    else:
        llm = ChatOpenAI(temperature=0, openai_api_key=API_KEY, model_name="gpt-3.5-turbo-0125")

    combine_documents_chain = create_stuff_documents_chain(llm, prompt)
    qa_chain = create_retrieval_chain(retriever, combine_documents_chain)

    timestamp = datetime.now().strftime("%B %d, %Y, %I:%M %p IST")

    try:
        result = qa_chain.invoke({
            "input": query,
            "timestamp": timestamp
        })
        return result.get("answer", "No answer provided by the model.")
    except Exception as e:
        logging.error(f"Error during query processing: {str(e)}")
        return "An error occurred while processing your query."

def generate_question_logic(q_type: str, subject: str, class_level: str) -> dict:
    from random import choice
    timestamp = datetime.now().strftime("%B %d, %Y, %I:%M %p IST")

    subject_context = f"{subject.title()} class {class_level}" if subject != "all" else "NEET syllabus"

    llm = ChatOpenAI(temperature=0.7, openai_api_key=API_KEY, model_name="gpt-3.5-turbo-0125")
    system_prompt = ""

    if q_type == "mcq":
        system_prompt = f"""
You are a NEET question generator. Generate 1 MCQ from {subject_context}. Return result in JSON:
{{{{
  "question": "...",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": "A",
  "explanation": "..."
}}}}
        """.strip()
    elif q_type == "explanation":
        system_prompt = f"""
You are a NEET AI tutor. Generate 1 explanation-based question from {subject_context}. Return result in JSON:
{{{{
  "question": "...",
  "modelAnswer": "...",
  "keyPoints": ["..."]
}}}}
        """.strip()

    # Send the prompt to LLM
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.runnables import RunnableSequence

    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "Generate now.")
    ])

    chain: RunnableSequence = chat_prompt | llm

    try:
        result = chain.invoke({}).content
        import json
        return json.loads(result)
    except Exception as e:
        logging.error(f"Failed to generate question: {str(e)}")
        return {"error": "Failed to parse model response. Please try again."}

def validate_explanation_answer(user_answer: str, model_answer: str) -> dict:
    llm = ChatOpenAI(temperature=0.3, openai_api_key=API_KEY, model_name="gpt-4o")
    instruction = f"""
You are a NEET examiner AI. Compare the following:

Student Answer: {user_answer}

Model Answer: {model_answer}

Evaluate based on:
- Accuracy
- Completeness
- Use of keywords

Return result in JSON format:
{{
  "score": "out of 5",
  "feedback": "Detailed comments..."
}}
    """.strip()

    from langchain_core.prompts import ChatPromptTemplate
    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", instruction),
        ("human", "Evaluate now.")
    ])

    try:
        result = (chat_prompt | llm).invoke({}).content
        import json
        return json.loads(result)
    except Exception as e:
        logging.error(f"Validation error: {str(e)}")
        return {"error": "Unable to validate answer at the moment."}
