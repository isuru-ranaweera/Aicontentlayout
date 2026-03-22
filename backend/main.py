from fastapi import FastAPI 
from ai_model import summarize
from pydantic import BaseModel

class LINK(BaseModel):
    link:str

app=FastAPI()


@app.post("/generate")

def generate_template(link:LINK):
    print(summarize(link))
    
    return {"success":200}

