from flask import Flask, request, send_file
from flask_cors import CORS  # Import CORS
from weasyprint import HTML
from io import BytesIO
import logging
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

@app.after_request
def add_cors_headers(response):
    """Add CORS headers manually in case the default setup doesn't work."""
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

@app.route("/")
def home():
    return "Welcome to the AI Resume Builder! Use the /generate-resume endpoint to create resumes."

@app.route("/generate-resume", methods=["POST"])
def generate_resume():
    try:
        data = request.json
        if not data:
            logging.error("No JSON data received in the request.")
            return "Invalid request: No JSON data received", 400

        name = data.get("name", "Name Not Provided")
        address = data.get("address", "Address Not Provided")
        phone = data.get("phone", "Phone Not Provided")
        email = data.get("email", "Email Not Provided")
        areas_of_expertise = data.get("areasOfExpertise", "No expertise listed.")
        experience = data.get("experience", [])

        experience_html = ""
        for exp in experience:
            details_html = "".join([f"<li>{detail}</li>" for detail in exp.get("details", [])])
            experience_html += f"""
                <h3>{exp.get('title', 'Title Not Provided')}</h3>
                <p><strong>{exp.get('company', 'Company Not Provided')}, {exp.get('location', 'Location Not Provided')}</strong> ({exp.get('dates', 'Dates Not Provided')})</p>
                <ul>{details_html}</ul>
            """

        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{name} - Resume</title>
            <style>
                body {{ font-family: Arial, sans-serif; margin: 30px; }}
                h1, h2, h3 {{ color: #2E86C1; }}
                h1 {{ font-size: 24px; margin-bottom: 10px; }}
                h2 {{ font-size: 20px; margin-top: 30px; margin-bottom: 10px; }}
                h3 {{ font-size: 18px; margin-bottom: 5px; }}
                p, li {{ font-size: 14px; }}
                ul {{ margin-top: 0; margin-bottom: 20px; }}
            </style>
        </head>
        <body>
            <h1>{name}</h1>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Email:</strong> {email}</p>
            <h2>Areas of Expertise</h2>
            <p>{areas_of_expertise}</p>
            <h2>Professional Experience</h2>
            {experience_html}
        </body>
        </html>
        """

        pdf_stream = BytesIO()
        HTML(string=html_content).write_pdf(pdf_stream)
        pdf_stream.seek(0)

        logging.info("Resume generated successfully.")
        return send_file(pdf_stream, mimetype="application/pdf", as_attachment=True, download_name="resume.pdf")
    except Exception as e:
        logging.error(f"Error occurred during resume generation: {e}")
        return f"An error occurred: {e}", 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Default to 5000 if PORT is not set
    app.run(host="0.0.0.0", port=port)
