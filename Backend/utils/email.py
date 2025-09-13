import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", 465))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")
EMAIL_FROM = os.getenv("EMAIL_FROM")

def send_reset_email(to_email, reset_token):
    reset_link = f"http://localhost:3000/reset-password?token={reset_token}"

    msg = MIMEText(f"Click here to reset your password: {reset_link}", "html")
    msg["Subject"] = "Password Reset - Kalakriti AI"
    msg["From"] = EMAIL_FROM
    msg["To"] = to_email

    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(EMAIL_FROM, to_email, msg.as_string())
