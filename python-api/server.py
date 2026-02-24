from flask import Flask, request, jsonify
import json
from database import (
    init_db,
    create_user,
    authenticate_user,
    get_user_by_token,
    get_articles
)

app = Flask(__name__)

# Headers CORS
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


# On simule quelques articles
@app.route("/articles", methods=["GET"])
def articles():
    user = get_user_from_bearer_token()
    if user is None:
        return jsonify({"error": "Invalid token"}), 401
    
    articles = get_articles()
    output = 

    return jsonify({
        "id": user["id"],
        "username": user["username"]
    })
    return jsonify(articles)

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    token = create_user(username, password)

    if token is None:
        return jsonify({"error": "User already exists"}), 400

    return jsonify({
        "message": "User registered successfully", 
        "token": token
    }), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    token = authenticate_user(username, password)

    if not token:
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({"token": token})

def get_user_from_bearer_token():
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        return None

    token = auth_header.split(" ")[1]
    return get_user_by_token(token)

@app.route("/user", methods=["GET"])
def get_user():
    user = get_user_from_bearer_token()
 
    if user is None:
        return jsonify({"error": "Invalid or absent token"}), 401

    return jsonify({
        "id": user["id"],
        "username": user["username"]
    })

if __name__ == "__main__":
    init_db()
    app.run(debug=True)