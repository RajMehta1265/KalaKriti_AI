from utils.db import db
import bcrypt

users = db["users"]

def create_user(email, password, name):
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    user = {"email": email, "password": hashed_pw, "name": name}
    users.insert_one(user)
    return user

def find_user_by_email(email):
    return users.find_one({"email": email})

def verify_password(password, hashed_pw):
    return bcrypt.checkpw(password.encode("utf-8"), hashed_pw)
