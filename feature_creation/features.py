import string
from lpmn_client.src.requester import Requester
import zipfile
import pandas as pd


def count_uppercase_letters(text):
    count = sum([1 for char in text if char.isupper()])
    return (count / (len(text) - text.count(' '))) * 100


def count_exclamation_marks(text):
    count = text.count('!')
    return (count / (len(text) - text.count(' '))) * 100


def count_question_marks(text):
    count = text.count('?')
    return (count / (len(text) - text.count(' '))) * 100


def count_quotation_marks(text):
    count = text.count('"')
    return (count / (len(text) - text.count(' '))) * 100


def count_punctuation(text):
    count = sum([1 for char in text if char in string.punctuation])
    return (count / (len(text) - text.count(' '))) * 100


def count_text_length(text):
    return len(text) - text.count(' ')


def get_sentiment(text):
    requester = Requester('241393@student.pwr.edu.pl')
    lpmn_query = 'any2txt|wcrft2|wsd|ccl_emo({"lang":"polish"})|ccl_emo_stats({' \
                 '"lang":"polish", "split_paragraphs": false})'

    string_ids = requester.upload_strings([text])
    response = requester.process_query(lpmn_query, [string_id.text for string_id in string_ids])
    requester.download_response(response[0], './sentiment.zip')

    try:
        with zipfile.ZipFile('sentiment.zip', 'r') as archive:
            with archive.open(archive.namelist()[0]) as data:
                df = pd.read_csv(data, sep=';')

        sentiment_value = sum([int(entry) for entry in df['Polarity'].values if
                               (type(entry) == str and entry.isnumeric()) or isinstance(entry, (int, float, complex))])
    except Exception as e:
        print(e)
        sentiment_value = 0

    return sentiment_value


def count_positive_words():
    try:
        with zipfile.ZipFile('sentiment.zip', 'r') as archive:
            with archive.open(archive.namelist()[0]) as data:
                df = pd.read_csv(data, sep=';')

        positive_words = (sum([1 for entry in df['Polarity'].values if
                               (type(entry) == str and entry.isnumeric() or isinstance(entry,
                                                                                       (int, float, complex))) and int(
                                   entry) > 0]) / len(df['Polarity'])) * 100
    except Exception as e:
        print(e)
        positive_words = 0

    return positive_words


def count_negative_words():
    try:
        with zipfile.ZipFile('sentiment.zip', 'r') as archive:
            with archive.open(archive.namelist()[0]) as data:
                df = pd.read_csv(data, sep=';')

        negative_words = (sum([1 for entry in df['Polarity'].values if
                               (type(entry) == str and entry.isnumeric() or isinstance(entry,
                                                                                       (int, float, complex))) and int(
                                   entry) < 0]) / len(df['Polarity'])) * 100
    except Exception as e:
        print(e)
        negative_words = 0

    return negative_words
