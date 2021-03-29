import string
from lpmn_client.src.requester import Requester
import zipfile
import xml.etree.ElementTree as ET


def count_uppercase_letters(text):
    count = sum([1 for char in text if char.isupper()])
    return count / (len(text) - text.count(' ')) * 100


def count_exclamation_marks(text):
    count = text.count('!')
    return count / (len(text) - text.count(' ')) * 100


def count_question_marks(text):
    count = text.count('?')
    return count / (len(text) - text.count(' ')) * 100


def count_quotation_marks(text):
    count = text.count('"')
    return count / (len(text) - text.count(' ')) * 100


def count_punctuation(text):
    count = sum([1 for char in text if char in string.punctuation])
    return count / (len(text) - text.count(' ')) * 100


def count_text_length(text):
    return len(text) - text.count(' ')


# TODO waiting for an example on https://wiki.clarin-pl.eu/pl/nlpws/services/ccl_emo website
def get_sentiment(text):
    requester = Requester('241393@student.pwr.edu.pl')
    lpmn_query = 'any2txt|wcrft2|wsd|ccl_emo({"lang":"polish"})|ccl_emo_stats({' \
                 '"lang":"polish", "split_paragraphs": false})'

    file_ids = requester.upload_strings([text])
    response = requester.process_query(lpmn_query, [id.text for id in file_ids])
    requester.download_response(response[0], './sentiment.zip')

    archive = zipfile.ZipFile('sentiment.zip', 'r')
    data = archive.read(archive.namelist()[0])

    # text = [word.text for word in ET.fromstring(data).findall('chunk/sentence/tok/lex/base')]
