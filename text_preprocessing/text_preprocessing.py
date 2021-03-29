import re
import string
from lpmn_client.src.requester import Requester
import zipfile
import xml.etree.ElementTree as ET
import pandas as pd


def remove_punctuation(text):
    no_punctuation_text = ''.join([char for char in text if char not in string.punctuation])
    return no_punctuation_text


def make_lowercase(text):
    lowercase_text = [word.lower() for word in text]
    return lowercase_text


def tokenize(text):
    tokens = re.split(r'\W+', text)
    return tokens


def remove_stopwords(text):
    requester = Requester('241393@student.pwr.edu.pl')
    lpmn_query = 'any2txt|morphoDita|dir|termopl2({\"mw\":false,\"sw\":\"/resources/termopl/termopl_sw.txt\",' \
                 '\"cp\":\"/resources/termopl/termopl_cp.txt\"}) '

    string_ids = requester.upload_strings([text])
    response = requester.process_query(lpmn_query, [string_id.text for string_id in string_ids])
    requester.download_response(response[0], './no_stopwords.zip')

    with zipfile.ZipFile('no_stopwords.zip', 'r') as archive:
        with archive.open(archive.namelist()[0]) as data:
            column_names = ['idx', 'ranking', 'output_phrase', 'original_phrase', 'c-value',
                            'length', 'freq_s', 'freq_in', 'context']
            df = pd.read_csv(data, sep='\t', names=column_names)

    lemmatized_text_without_stopwords = df['output_phrase'].tolist()
    return lemmatized_text_without_stopwords


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
