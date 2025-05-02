from playwright.sync_api import sync_playwright
import time

def test_login():
    with sync_playwright() as p:
        print("Starting the browser...")
        browser = p.chromium.launch(headless=False)  
        page = browser.new_page()
        
        print("Navigating to the page...")
        page.goto("http://localhost:5173/")

        print("Filling out username and password...")
        time.sleep(1)
        page.fill("input.UsernameInput", "assal99") 
        time.sleep(1)
        page.fill("input.PasswordInput", "assal111")
        
        time.sleep(1)
        print("Clicking submit button...")
        page.click("button.LoginBtn")

        time.sleep(3)

        print("Login test passed.")
        page.locator("button.NewTask").click()
        page.wait_for_selector(".NewTaskPopup", state="visible")
        page.fill(".TaskNameInput", "Buy groceries")
        page.select_option(".TaskStatusSelect", label="In Progress")
        page.fill(".TaskDueDateInput", "2025-05-10")
        page.select_option(".CategorySelect", label="Personal")
        page.select_option(".PrioritySelect", label="High")
        page.fill(".ProgressInput", "50")
        page.click("button.CreateTaskBtn")
        time.sleep(10)

test_login()