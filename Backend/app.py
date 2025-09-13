import os #access environment variable
import smtplib #send email
import jwt
import bcrypt #bcrypt algorithm converts pt password into secure unreadable
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from pymongo import MongoClient
from email.mime.text import MIMEText #send email
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
MONGO_URI = os.getenv("MONGODB_URI")
MONGO_DB = os.getenv("MONGODB_DB")
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
EMAIL_FROM = os.getenv("EMAIL_FROM")

# Flask App
app = Flask(__name__)

# MongoDB Connection
client = MongoClient(MONGO_URI)
db = client[MONGO_DB]
users = db["users"]

# Helper: Generate JWT
def generate_token(email):
    payload = {
        "email": email,
        "exp": datetime.utcnow() + timedelta(hours=2)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

# Helper: Send email
def send_email(to_email, subject, body):
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = EMAIL_FROM
    msg["To"] = to_email

    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(EMAIL_FROM, to_email, msg.as_string())

# ====================
# Routes
# ====================

# Signup
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if users.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users.insert_one({"email": email, "password": hashed_pw})

    return jsonify({"message": "User created successfully"}), 201

# Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users.find_one({"email": email})
    if not user or not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    token = generate_token(email)
    return jsonify({"message": "Login successful", "token": token}), 200

# Forgot Password
@app.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.json
    email = data.get("email")

    user = users.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    reset_token = generate_token(email)
    reset_link = f"http://localhost:3000/reset-password?token={reset_token}"

    send_email(email, "Password Reset - Kalakriti AI", f"Click to reset password: {reset_link}")

    return jsonify({"message": "Password reset email sent"}), 200

# Reset Password
@app.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.json
    token = data.get("token")
    new_password = data.get("new_password")

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email = decoded["email"]
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 400
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 400

    hashed_pw = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt())
    users.update_one({"email": email}, {"$set": {"password": hashed_pw}})

    return jsonify({"message": "Password reset successful"}), 200

if __name__ == "__main__":
    app.run(debug=True)
