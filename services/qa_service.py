
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

# ... keep existing code (custom_prompt_template and prompt definition)

def process_query(query: str) -> str:
    # ... keep existing code (entire process_query function)

def generate_question_logic(q_type: str, subject: str, class_level: str) -> dict:
    from random import choice
    timestamp = datetime.now().strftime("%B %d, %Y, %I:%M %p IST")

    subject_context = f"{subject.title()} class {class_level}" if subject != "all" else "NEET syllabus"

    llm = ChatOpenAI(temperature=0.7, openai_api_key=API_KEY, model_name="gpt-3.5-turbo-0125")
    system_prompt = ""

    if q_type == "mcq":
        system_prompt = f"""
You are a NEET question generator. Generate 1 MCQ from {subject_context}. Return result in JSON:
{{
  "question": "...",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": "A",
  "explanation": "..."
}}
        """.strip()
    elif q_type == "explanation":
        system_prompt = f"""
You are a NEET AI tutor. Generate 1 explanation-based question from {subject_context}. Return result in JSON:
{{
  "question": "...",
  "modelAnswer": "...",
  "keyPoints": ["..."]
}}
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
        result = chain.invoke({}).content  # Fixed: Remove the input parameter
        import json
        return json.loads(result)
    except Exception as e:
        logging.error(f"Failed to generate question: {str(e)}")
        return {"error": "Failed to parse model response. Please try again."}

def validate_explanation_answer(user_answer: str, model_answer: str) -> dict:
    # ... keep existing code (entire validate_explanation_answer function)
