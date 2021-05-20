# Polish_Fake_News_Detector
Application's purpose is to detect fake news in Polish.

Miejsce na notatki: https://drive.google.com/drive/folders/1TcSwB1FPnDxofhXQszAL_Su2EUMOzpwA?usp=sharing

# Wiki
Checklist:
1. create venv
  ```bash
  python3 -m venv venv
  ```

2. install dependencies
```bash
. venv/bin/activate
pip3 install -r requiremnts.txt
```



##### Commands list

scrap data:

```bash
# go to scraper directory
scrapy crawl citations -O citations.csv
```
