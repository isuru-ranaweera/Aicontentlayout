import requests


from bs4 import BeautifulSoup

soup=BeautifulSoup(requests.get("https://www.roboai.fi/uutinen/uuden-sukupolven-dobot-atom-humanoidirobotti-saapui-roboai-laboratorioon/").content,"html.parser")
images=soup.find_all('img',class_="fl-photo-img")
print(images)
for j,i in enumerate(images):
    print(i.get("src"))
