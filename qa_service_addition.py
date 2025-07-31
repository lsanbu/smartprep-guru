
# Add this function to your qa_service.py file

def generate_mock_test_logic(test_name: str, test_type: str, subjects: list) -> dict:
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
            "is_active": True
        }
        
        return mock_test_data
        
    except Exception as e:
        logging.error(f"Failed to generate mock test: {str(e)}")
        return {"error": "Failed to generate mock test. Please try again."}
