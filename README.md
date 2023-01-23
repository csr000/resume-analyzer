# Resume Analyzer
Welcome to Resume Analyzer, a project that utilizes cutting-edge technology to help you analyze resumes and extract valuable information. This information can include skills, work experience, and other key details that can help you make better hiring decisions. With Resume Analyzer, you can streamline your recruitment process and find the best candidates in no time.

## Getting Started
Clone the repository:
~~~
git clone https://github.com/csr000/resume-analyzer.git
~~~
Install the dependencies for the React frontend:
~~~
cd resume-analyzer
yarn 
~~~
Run the React development server:
~~~
yarn dev
~~~
Install the dependencies for the FastAPI backend:
~~~
cd api
pip install -r requirements.txt
~~~
Create a .env file and paste this: (*NB: sk-xxxxxxxxxx is supposed to be your secret key to the model)*
~~~
API_KEY=sk-xxxxxxxxxx 
model=text-davinci-003
~~~
Run the FastAPI development server:
~~~
python main.py
~~~
Open http://localhost:3000 in your browser to access the application.

## Usage
To use the application, simply upload a resume in either PDF or Word format and the application will extract useful information such as contact information and work experience. With this information, you can quickly and easily identify the best candidates for your open positions.

## Built With
- React - The web framework used for the frontend
- FastAPI - The web framework used for the backend

## Authors
- Richard Stephen - [csr000](https://github.com/csr000)
- Jasmine Baba Yara - [JasmineBabaYara](https://github.com/JasmineBabaYara)

## Note
Please make sure that you have the latest version of Node.js and Python installed on your machine before running the project. Also, yarn should be installed on your machine before running the project.