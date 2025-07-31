
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
    # ... keep existing code (process_query function)

def generate_question_logic(q_type: str, subject: str, class_level: str) -> dict:
    # ... keep existing code (generate_question_logic function)

def validate_explanation_answer(user_answer: str, model_answer: str) -> dict:
    # ... keep existing code (validate_explanation_answer function)

def generate_mock_test_logic(test_name: str, test_type: str, subjects: list) -> dict:
    """Generate complete mock test with AI-generated questions"""
    timestamp = datetime.now().strftime("%B %d, %Y, %I:%M %p IST")
    
    # Calculate question distribution based on test type
    question_distribution = {}
    if test_type == "full_mock":
        question_distribution = {"Physics": 45, "Chemistry": 45, "Biology": 90}
    else:  # subject_wise
        for subject in subjects:
            question_distribution[subject] = 90 if subject == "Biology" else 45
    
    try:
        # Use your existing question generation logic
        all_questions = []
        question_number = 1
        
        for subject, count in question_distribution.items():
            if subject in subjects:  # Only generate for selected subjects
                logging.info(f"Generating {count} questions for {subject}")
                
                for i in range(count):
                    # Generate question using your existing MCQ generation logic
                    question_data = generate_question_logic("mcq", subject.lower(), "12th")
                    
                    if "error" not in question_data:
                        question_obj = {
                            "question_number": question_number,
                            "subject": subject,
                            "question_text": question_data["question"],
                            "option_a": question_data["options"][0],
                            "option_b": question_data["options"][1], 
                            "option_c": question_data["options"][2],
                            "option_d": question_data["options"][3],
                            "correct_answer": question_data["correctAnswer"],
                            "explanation": question_data["explanation"],
                            "difficulty_level": 2,  # Default medium difficulty
                        }
                        all_questions.append(question_obj)
                        question_number += 1
                    else:
                        logging.warning(f"Failed to generate question {question_number} for {subject}")
        
        # Return mock test data
        mock_test_data = {
            "test_name": test_name,
            "test_type": test_type,
            "total_questions": len(all_questions),
            "physics_questions": len([q for q in all_questions if q["subject"] == "Physics"]),
            "chemistry_questions": len([q for q in all_questions if q["subject"] == "Chemistry"]), 
            "biology_questions": len([q for q in all_questions if q["subject"] == "Biology"]),
            "questions": all_questions,
            "generated_at": timestamp,
            "is_active": True,
            "success": True
        }
        
        logging.info(f"Successfully generated mock test '{test_name}' with {len(all_questions)} questions")
        return mock_test_data
        
    except Exception as e:
        logging.error(f"Failed to generate mock test: {str(e)}")
        return {"error": "Failed to generate mock test. Please try again.", "success": False}
