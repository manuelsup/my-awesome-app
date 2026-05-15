import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from the root .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env'))

app = Flask(__name__)
# CORS allows your React app to make requests to this API safely
CORS(app)

# Initialize Supabase client
url = os.environ.get("VITE_SUPABASE_URL")
key = os.environ.get("VITE_SUPABASE_PUBLISHABLE_KEY")

if not url or not key:
    print("Warning: Supabase credentials missing. Make sure .env is set up correctly.")

supabase: Client = create_client(url, key) if url and key else None

def get_dummy_email(username):
    # Convert the username to a hex string to handle spaces and special characters safely.
    # This guarantees the generated email is ALWAYS valid and unique.
    return f"{username.encode('utf-8').hex()}@dummy.myapp.com"

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not supabase:
        return jsonify({"success": False, "message": "Server configuration error"}), 500

    try:
        # Supabase Auth requires an email format.
        dummy_email = get_dummy_email(username)
        response = supabase.auth.sign_in_with_password({
            "email": dummy_email,
            "password": password
        })
        
        # If successful, we send back a success response
        return jsonify({
            "success": True, 
            "message": "Login successful", 
            "user": response.user.model_dump() if response.user else None
        }), 200
    except Exception as e:
        # Authentication failed (e.g., invalid credentials)
        error_msg = str(e)
        return jsonify({"success": False, "message": "Invalid username or password"}), 401

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password are required"}), 400

    if not supabase:
        return jsonify({"success": False, "message": "Server configuration error"}), 500

    try:
        # Use the dummy email trick for signup as well
        dummy_email = get_dummy_email(username)
        response = supabase.auth.sign_up({
            "email": dummy_email,
            "password": password
        })
        
        return jsonify({
            "success": True, 
            "message": "Signup successful", 
            "user": response.user.model_dump() if response.user else None
        }), 201
    except Exception as e:
        # Signup failed (e.g., username already taken or password too weak)
        return jsonify({"success": False, "message": str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)

# To run this server with Supabase, ensure you install the dependencies:
# pip install flask flask-cors supabase python-dotenv
# Then start the server: python server.py