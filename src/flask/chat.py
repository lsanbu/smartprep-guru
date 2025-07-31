
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import logging
import traceback

# Create Flask app
app = Flask(__name__)
CORS(app, origins=["*"])  # Allow all origins for development

# Create blueprint for chat routes
chat_bp = Blueprint('chat', __name__)

# Configure logging
logging.basicConfig(level=logging.INFO)

@chat_bp.route("/ask", methods=["POST"])
def ask_question():
    """Handle general AI tutor chat questions"""
    data = request.json
    question = data.get("question")
    
    if not question:
        return jsonify({"error": "Missing 'question' field"}), 400
    
    try:
        from services.qa_service import process_query
        response = process_query(question)
        return jsonify({"answer": response})
    except Exception as e:
        logging.error(f"Error in ask_question: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@chat_bp.route("/generate-question", methods=["POST"])
def generate_question():
    """Generate MCQ or explanation questions"""
    data = request.json
    question_type = data.get("type", "mcq")
    subject = data.get("subject", "all")
    class_level = data.get("class", "all")
    
    if question_type not in ["mcq", "explanation"]:
        return jsonify({"error": "Invalid 'type' field. Must be 'mcq' or 'explanation'."}), 400
    
    try:
        from services.qa_service import generate_question_logic
        result = generate_question_logic(question_type, subject, class_level)
        return jsonify(result)
    except Exception as e:
        logging.error(f"Error in generate_question: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@chat_bp.route("/validate-answer", methods=["POST"])
def validate_answer():
    """Validate student answers against model answers"""
    data = request.json
    user_answer = data.get("userAnswer")
    model_answer = data.get("modelAnswer")
    
    if not user_answer or not model_answer:
        return jsonify({"error": "Both 'userAnswer' and 'modelAnswer' are required."}), 400
    
    try:
        from services.qa_service import validate_explanation_answer
        result = validate_explanation_answer(user_answer, model_answer)
        return jsonify(result)
    except Exception as e:
        logging.error(f"Error in validate_answer: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@chat_bp.route("/generate-mock-test", methods=["POST"])
def generate_mock_test():
    """Generate complete mock tests with questions"""
    data = request.json
    test_name = data.get("testName")
    test_type = data.get("testType", "full_mock")
    subjects = data.get("subjects", ["Physics", "Chemistry", "Biology"])
    
    if not test_name:
        return jsonify({"error": "Missing 'testName' field"}), 400
    
    try:
        from services.qa_service import generate_mock_test_logic
        result = generate_mock_test_logic(test_name, test_type, subjects)
        return jsonify(result)
    except Exception as e:
        logging.error(f"Error in generate_mock_test: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# Register blueprint
app.register_blueprint(chat_bp, url_prefix='/api/chat')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
