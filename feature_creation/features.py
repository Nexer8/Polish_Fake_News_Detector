import string


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


# TODO
def get_sentiment(text):
    pass
