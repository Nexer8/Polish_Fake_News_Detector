import re
import string
from lpmn_client.src.requester import Requester
import zipfile
import xml.etree.ElementTree as ET


def remove_punctuation(text):
    no_punctuation_text = ''.join([char for char in text if char not in string.punctuation])
    return no_punctuation_text


def make_lowercase(text):
    lowercase_text = [word.lower() for word in text]
    return lowercase_text


def tokenize(text):
    tokens = re.split(r'\W+', text)
    return tokens


# TODO
def remove_stopwords(tokenized_text):
    # text = [word for word in tokenized_text if word not in stopwords]
    # return text
    pass


def lemmatize(text):
    requester = Requester('241393@student.pwr.edu.pl')
    lpmn_query = 'any2txt|wcrft2({"guesser":false, "morfeusz2":true})'

    string_ids = requester.upload_strings([text])
    response = requester.process_query(lpmn_query, [id.text for id in string_ids])
    requester.download_response(response[0], './lem.zip')

    archive = zipfile.ZipFile('lem.zip', 'r')
    data = archive.read(archive.namelist()[0])

    text = [word.text for word in ET.fromstring(data).findall('chunk/sentence/tok/lex/base')]
    return text
