
# Add this to your chat.py file in your Flask app

@chat_bp.route("/generate-mock-test", methods=["POST"])
def generate_mock_test():
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
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
