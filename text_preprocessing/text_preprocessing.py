import re
import string


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


# TODO
def lemmatize(no_stopwords_text):
    # text = [wn.lemmatize(word) for word in no_stopwords_text]
    # return text
    pass
