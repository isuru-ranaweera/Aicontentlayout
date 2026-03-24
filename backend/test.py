from playwright.sync_api import sync_playwright
import os 
def render_and_get_screenshot(file_path,output_path):
    file_url=f"file://{os.path.abspath(file_path)}"
    with sync_playwright() as p:
        browser=p.firefox.launch(headless=True)
        page = browser.new_page(viewport={"width": 1660, "height": 1000})
        
        page.goto(file_url)
        page.screenshot(path=output_path, full_page=True)
        browser.close()

render_and_get_screenshot("./website_file/index.html","test_ss.png")