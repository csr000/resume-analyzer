import fitz, requests
from fastapi import HTTPException

def pdf_to_txt(file: bytes) -> str:
    """Convert a pdf file to text.

    Args:
    file (bytes): The pdf file to be converted.

    Returns:
    str: Text extracted from the pdf file.
    """    
    result = ""
    # Open the PDF file
    pdf_doc = fitz.open("pdf", file)

    # Iterate over each page
    for page in pdf_doc:
        # Extract the text from the page
        page_text = page.get_text()
        # Append the text
        result += page_text
    return result


def post_to_gpt(text: str):
    api_url = "https://api.example.com"
    response = requests.post(api_url, data=text)

    # check if response status code is ok
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response


