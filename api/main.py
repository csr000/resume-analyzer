from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from utils import pdf_to_txt, post_to_gpt
from functions.rank import get_grade
import uvicorn, json


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return "running"


@app.post("/parse")
async def parse(file: bytes = File(...)):
    """get pdf, parse it and return json with a specific format.

    Args:
        file (bytes, optional): resume pdf. Defaults to File(...).

    Returns:
        json:  {
                    "name": <name>,
                    "email": <email>
                    "skills": <an array of skills>
                }
    """
    text = pdf_to_txt(file)

    # post request to api
    gpt_response = post_to_gpt(text)

    # convert response to json
    json_response = json.loads(gpt_response)

    return json_response


@app.post("/rank")
async def rank_files(job_description: str, files: List[UploadFile]):
    grades = []
    for file in files:
        pdf_bytes = await file.read()
        resume_content = pdf_to_txt(pdf_bytes)
        grade = get_grade(job_description, resume_content)
        grades.append({"grade": grade, "file": file.filename})
    return grades


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, debug=True)
