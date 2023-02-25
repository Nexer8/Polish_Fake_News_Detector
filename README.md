# Polish_Fake_News_Detector

Application's purpose is to detect fake news in Polish.
Description (in polish) available in report.pdf

# Wiki

First, to run every part, switch to its directory

## Crawler

Checklist:

1. create venv

```bash
python3 -m venv venv
```

2. install dependencies

```bash
. venv/bin/activate
pip3 install -r requirements.txt
```

##### Commands list

scrap data:

```bash
scrapy crawl citations -O citations.csv
```

## Client

```bash
yarn install
yarn start
# storybook
yarn storybook
```

## Server

```bash
yarn install
yarn start
```

## Backend

### Warning

The `lpmn_client` library provided by _Clarin-PL_ will not run successfully on Windows.

### Instruction

In order to run the server only, execute the command below.

```bash
pip install -r server_requirements.txt
```

To run the server execute:

```bash
python server.py
```

By default, it will run the server under http://127.0.0.1:8000. The only endpoint implements the _POST_ method and is
available under _/classify/_. The text that needs to be classified should be passed in the request's body.

There is also a possibility to run _Swagger_ under _/docs_.

### Model generation

Following command installs all the requirements necessary for the development.

```bash
pip install -r requirements.txt
```

If a reevaluation of models' parameters is necessary, uncomment appropriate lines in _main.py_ and execute the command
below.

```bash
python main.py
```
