from flask import Blueprint, request, jsonify
from models import create_user, find_user_by_email, verify_password
from utils.token import generate_token
from utils.email import send_reset_email

auth_bp = Blueprint("auth", __name__)

# Signup
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    if find_user_by_email(data["email"]):
        return jsonify({"error": "User already exists"}), 400

    user = create_user(data["email"], data["password"], data.get("name", "User"))
    return jsonify({"message": "User created successfully"}), 201

# Login
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = find_user_by_email(data["email"])
    if not user or not verify_password(data["password"], user["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    token = generate_token(str(user["_id"]))
    return jsonify({"message": "Login successful", "token": token, "name": user.get("name")}), 200

# Forgot Password
@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.json
    user = find_user_by_email(data["email"])
    if not user:
        return jsonify({"error": "No user with this email"}), 404

    reset_token = generate_token(str(user["_id"]))
    send_reset_email(user["email"], reset_token)
    return jsonify({"message": "Password reset email sent"}), 200

