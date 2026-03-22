from prompts import summarize_prompt,selecting_image_prompt,defining_layout_prompt,layout_variant_prompt
import requests 
from bs4 import BeautifulSoup
import re
from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts import MessagesPlaceholder
import os 
from langchain_core.messages import AIMessage,HumanMessage
import base64
from google import genai
from dotenv import load_dotenv
import qrcode
load_dotenv()
import time
import json
from langchain_google_genai import ChatGoogleGenerativeAI


client=genai.Client()
summarize_template=ChatPromptTemplate(
    [
        ("system",summarize_prompt),
        ("human","{input}")
    ]
)

ollama_model_text="qwen3.5:9b"
ollama_model_vl="qwen3-vl:8b"

summarize_model=ChatOllama(model=ollama_model_text)
summarize_chain=summarize_template|summarize_model

selecting_image_template=ChatPromptTemplate(
    [
        ("system",selecting_image_prompt),
        ("human","{input}")
    ]
)


agent_2=ChatOllama(model=ollama_model_vl)

agent_2_chain=selecting_image_template|agent_2

def summarize(link):
        global summarize_chain,agent_2_chain
        response=requests.get(link)
        soup=BeautifulSoup(response.content,'html.parser')
        text=soup.text
        text_clean=re.sub(r"\n+","\n",text)
        
        images=soup.find_all('img',class_="fl-photo-img")
        summarization=summarize_chain.invoke({"input":text_clean})
        ai_response=json.loads(summarization.content)    
        title=ai_response['Title']
        image_path=f"./image/{title}"
        os.makedirs(image_path,exist_ok=True)
        
        
        multi_images=[]
        files_name=[]
        print("images")
        print(images)
        
        for j,i in enumerate(images):
            im=i.get("data-src")
            if im==None:
                im=i.get("src")
            re_image=requests.get(im)

            download_path=f"download_image{j}.png"
            files_name.append(download_path)
            print(im)
            with open(os.path.join(image_path,download_path),"wb") as d:
                d.write(re_image.content)

        for i in os.listdir(image_path):
            tempo_path=os.path.join(image_path,i)
            multi_images.append(
                {
                    "type":"image",
                    "image":f"file//{tempo_path}"
                        
                }
            )

            multi_images.append(
                {    
                    "type":"text",
                    "text":f"the file name is {i}"
                }
            )
            
        agent_2_response=agent_2_chain.invoke({"summary":ai_response['overview'],
                             "input":multi_images})
        
        qr_image=qrcode.make(link)
        
        qr_path=os.path.join(image_path,"qr_code.png")
        
        qr_image.save(qr_path)
        
        return ai_response,agent_2_response.content,image_path



uploaded = client.files.upload(
    file="/home/user/persistent/TV_AI_AGENT/backend/examplate_template/image.png"
)
gemini= ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",   # or "gemini-2.5-flash"
    temperature=0.9
)

message = HumanMessage(
    content=[
        {"type": "text", "text": "This is the example template you can use as reference."},
        {
            "type": "file",
            "file_id": uploaded.uri,   
            "mime_type": "image/png",
        },
    ]
)


layout_variance_agent=ChatOllama(model=ollama_model_vl)
layout_variance_template=ChatPromptTemplate(
    [
        ("system",layout_variant_prompt),
        MessagesPlaceholder('history'),
        ("human","{input}")
    ]
)

layout_variant_chain=layout_variance_template|gemini

layout_template=ChatPromptTemplate(
    [
        ("system",defining_layout_prompt),
        ("human","{input}")
    ]
)

layout_chain=layout_template|gemini

def define_the_templay_out(link):
    history_layout=[]
    global layout_chain,layout_variant_chain
    
    summary,image,image_path=summarize(link)
    print(summary)
    print(image)
    
    for i in range(5):
        variance_respone=layout_variant_chain.invoke(
            {"history":history_layout,"input":summary}
            
        )
        
        

        history_layout.append(AIMessage(variance_respone.content))
        print(variance_respone.content)
    
        time.sleep(70)
        layout_response=layout_chain.invoke({"summary":summary,"input":message.content,
        "layout_spec":variance_respone.content,
        "content_language":summary["language"],
        "main_project_image":os.path.join(image_path,image),
        "qr_code_path":os.path.join(image_path,"qr_code.png")
        })
        time.sleep(70)
        
        print(layout_response.content)
        
    
    
if __name__ == "__main__":
    define_the_templay_out("https://www.roboai.fi/en/news-en/robodog-monitoring-in-vr/")
    
    # import base64
    # gemini = ChatGoogleGenerativeAI(model="gemini-2.5-flash") # or gemini-1.5-pro

    # # 2. Define your image path
    # image_path = "/home/user/persistent/TV_AI_AGENT/backend/examplate_template/image.png"

    # # 3. Read the local image and encode it to base64
    # with open(image_path, "rb") as image_file:
    #     image_base64 = base64.b64encode(image_file.read()).decode("utf-8")
    # print(image_base64)

    # # 4. Construct the message with both text and the image data
    # message = HumanMessage(
    #     content=[
    #         {
    #             "type": "text", 
    #             "text": "What is inside the image?"
    #         },
    #         {
    #             "type": "image_url",
    #             "image_url": {
    #                 "url": f"data:image/png;base64,{image_base64}"
    #             }
    #         }
    #     ]
    # )

    # # 5. Invoke the model (pass it as a list)
    # response = gemini.invoke([message])
    # print(response.content)