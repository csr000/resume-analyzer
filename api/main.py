from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from utils import pdf_to_txt, post_to_model
from functions.rank import get_grade
import uvicorn


app = FastAPI(debug=True)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return {"message": "running"}


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

    stringified_structure = str(
        {
            "name": "<name>",
            "email": "<email>",
            "location": "<location>",
            "education": "<education>",
            "skills": "<an array of skills>",
        }
    )

    template = f"""I extracted this information from a resume pdf: 
    {text}. 
    Extract the necessary information and return it using the template below:
    {stringified_structure}
    """

    return post_to_model(template)


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
    uvicorn.run("main:app", port=8000, reload=True)
