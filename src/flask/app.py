
from flask import Flask
from flask_cors import CORS
from chat import chat_bp
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

def create_app():
    """Factory function to create Flask app"""
    app = Flask(__name__)
    
    # Enable CORS for all routes
    CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])
    
    # Register blueprints
    app.register_blueprint(chat_bp, url_prefix='/api/chat')
    
    @app.route('/health')
    def health_check():
        return {"status": "healthy", "service": "XmPrepNEET Flask API"}
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
