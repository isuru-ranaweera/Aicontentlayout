from fastapi import FastAPI 
from ai_model import summarize,define_the_templay_out
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
class LINK(BaseModel):
    link:str

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. For production, replace with your frontend URL (e.g., ["http://localhost:3000"])
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers (Content-Type, etc.)
)

@app.post("/generate")

def generate_template(link:LINK):
    print('enter')
    print(define_the_templay_out(link.link))
    
    return {"success":200}

