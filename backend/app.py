from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    "https://pjk-applicant.web.app",
    "https://pjk-admin.web.app"
])

@app.route("/api/hello")
def hello():
    return {"message": "Hello from Flask API!"}