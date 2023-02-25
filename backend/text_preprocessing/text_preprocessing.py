import os
import re
import string
import xml.etree.ElementTree as ET
from io import StringIO
from shutil import make_archive, rmtree

import pandas as pd
from lpmn_client import Task, download_file_as_dict, upload_file

TEMP_DIR = 'temp_out'
TEMP_ZIP = 'temp_zip'
TEMP_FILE = 'temp'


def df_to_file(df, field):
    if os.path.exists(TEMP_DIR):
        rmtree(TEMP_DIR, ignore_errors=True)
    os.mkdir(TEMP_DIR)
    for index, _ in df.iterrows():
        with open(f'{TEMP_DIR}/{index}.txt', 'w') as file:
            file.write(df.at[index, field])


def execute_query(file, lpmn_query):
    task = Task(lpmn_query)
    file_id = upload_file(file)
    output_file_id = task.run(file_id)
    return download_file_as_dict(output_file_id)


def remove_punctuation(text):
    no_punctuation_text = ''.join(
        [char for char in text if char not in string.punctuation])
    return no_punctuation_text


def make_lowercase(text):
    lowercase_text = [word.lower() for word in text]
    return lowercase_text


def tokenize(text):
    tokens = re.split(r'\W+', text)
    return tokens


def remove_stopwords(text):
    column_names = ['idx', 'ranking', 'output_phrase', 'original_phrase', 'c-value',
                    'length', 'freq_s', 'freq_in', 'context']
    df = pd.read_csv(StringIO(text), sep='\t', names=column_names)
    return df['output_phrase'].tolist()


def parse_sentiment(data):
    try:
        df = pd.read_csv(StringIO(data), sep=';')
        sentiment_value = sum([int(entry) for entry in df['Polarity'].values if
                               (type(entry) == str and entry.isnumeric()) or isinstance(entry, (int, float, complex))])
        positive_words = (sum([1 for entry in df['Polarity'].values if
                               (type(entry) == str and entry.isnumeric() or isinstance(entry,
                                                                                       (int, float, complex))) and int(
                                   entry) > 0]) / len(df['Polarity']))
        negative_words = (sum([1 for entry in df['Polarity'].values if
                               (type(entry) == str and entry.isnumeric() or isinstance(entry,
                                                                                       (int, float, complex))) and int(
                                   entry) < 0]) / len(df['Polarity']))
    except Exception as e:
        print(e)
        sentiment_value = 0
        positive_words = 0
        negative_words = 0

    return sentiment_value, positive_words, negative_words


def parse_lemmatization(text):
    lemmatized_text = [word.text for word in ET.fromstring(
        text).findall('chunk/sentence/tok/lex/base')]
    return ' '.join(lemmatized_text)


def remove_stopwords(text):
    column_names = ['idx', 'ranking', 'output_phrase', 'original_phrase', 'c-value',
                    'length', 'freq_s', 'freq_in', 'context']
    df = pd.read_csv(StringIO(text), sep='\t', names=column_names)
    return df['output_phrase'].tolist()


def get_sentiments_dict(df):
    df_to_file(df, 'content')
    zip_path = make_archive(TEMP_ZIP, 'zip', TEMP_DIR)
    lpmn_sentiment_query = 'any2txt|wcrft2|wsd|ccl_emo({"lang":"polish"})|ccl_emo_stats({' \
        '"lang":"polish", "split_paragraphs": false})'
    return execute_query(zip_path, lpmn_sentiment_query)


def get_sentiment():
    lpmn_sentiment_query = 'any2txt|wcrft2|wsd|ccl_emo({"lang":"polish"})|ccl_emo_stats({' \
        '"lang":"polish", "split_paragraphs": false})'
    res = execute_query(f'{TEMP_FILE}.txt', lpmn_sentiment_query)
    return res[next(iter(res))]


def lemmatize():
    lpmn_lemmatization_query = 'any2txt|wcrft2({"guesser":false, "morfeusz2":true})'
    res = execute_query(f'{TEMP_FILE}.txt', lpmn_lemmatization_query)
    return res[next(iter(res))]


def get_lemmatized_texts_dict(df):
    for index, _ in df.iterrows():
        no_punctuation_text = remove_punctuation(df.at[index, 'content'])
        with open(f'{TEMP_DIR}/{index}.txt', 'w') as file:
            file.write(''.join(no_punctuation_text))
    zip_path = make_archive(TEMP_ZIP, 'zip', TEMP_DIR)
    lpmn_lemmatization_query = 'any2txt|wcrft2({"guesser":false, "morfeusz2":true})'
    return execute_query(zip_path, lpmn_lemmatization_query)
