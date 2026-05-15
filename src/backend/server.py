from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
# CORS allows your React app to make requests to this API safely
CORS(app)

# Mock database storing the username and a securely HASHED password.
# The plaintext password 'Help25!' is converted into an irreversible hash here.
users_db = {
    "Admin": generate_password_hash("Help25!")
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Query the mock database for the user's hashed password
    user_hash = users_db.get(username)

    # Securely check if the user exists and the provided password matches the hash
    if user_hash and check_password_hash(user_hash, password):
        return jsonify({"success": True, "message": "Login successful"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401

if __name__ == '__main__':
    app.run(port=5000, debug=True)



#start your server by running python server.py!