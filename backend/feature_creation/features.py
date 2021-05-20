import string
from lpmn_client.src.requester import Requester
import zipfile
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split

from text_preprocessing.text_preprocessing import clean_text


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


def create_features(df: pd.DataFrame):
    df['uppercase%'] = df['content'].apply(lambda x: count_uppercase_letters(x))
    df['exclamation_mark%'] = df['content'].apply(lambda x: count_exclamation_marks(x))
    df['question_mark%'] = df['content'].apply(lambda x: count_question_marks(x))
    df['quotation_mark%'] = df['content'].apply(lambda x: count_quotation_marks(x))
    df['punctuation%'] = df['content'].apply(lambda x: count_punctuation(x))
    df['length'] = df['content'].apply(lambda x: count_text_length(x))

    rows_list = []
    for index, row in df.iterrows():
        dictionary = {'sentiment': get_sentiment(df.at[index, 'content']),
                      'positive_words%': count_positive_words(),
                      'negative_words%': count_negative_words()}

        rows_list.append(dictionary)
        print(f'Index: {index}')

    df = pd.concat([df.reset_index(drop=True), pd.DataFrame(rows_list).reset_index(drop=True)], axis=1)
    df.to_csv('data/sentiment.csv')
    df['clean_text'] = df['content'].apply(lambda x: clean_text(x))
    df.to_csv('data/clean.csv')

    X_train, X_test, y_train, y_test = train_test_split(
        df[['clean_text', 'uppercase%', 'exclamation_mark%', 'question_mark%', 'quotation_mark%', 'punctuation%',
            'length', 'sentiment', 'positive_words%', 'negative_words%']], df['label'], test_size=0.25)

    clean_joined = df['clean_text'].apply(lambda x: ' '.join(x))
    X_train_clean_joined = X_train['clean_text'].apply(lambda x: ' '.join(x))
    X_test_clean_joined = X_test['clean_text'].apply(lambda x: ' '.join(x))

    tfidf_vect = TfidfVectorizer(ngram_range=(1, 3))
    tfidf_vect_fit = tfidf_vect.fit(X_train_clean_joined)

    tfidf_train = tfidf_vect_fit.transform(X_train_clean_joined)
    tfidf_test = tfidf_vect_fit.transform(X_test_clean_joined)

    X_train_vect = pd.concat([X_train[
                                  ['uppercase%', 'exclamation_mark%', 'question_mark%', 'quotation_mark%',
                                   'punctuation%',
                                   'length', 'sentiment', 'positive_words%', 'negative_words%']].reset_index(drop=True),
                              pd.DataFrame(tfidf_train.toarray())], axis=1)

    X_test_vect = pd.concat([X_test[
                                 ['uppercase%', 'exclamation_mark%', 'question_mark%', 'quotation_mark%',
                                  'punctuation%',
                                  'length', 'sentiment', 'positive_words%', 'negative_words%']].reset_index(drop=True),
                             pd.DataFrame(tfidf_test.toarray())], axis=1)

    X_train_vect.to_csv('data/X_train_tfidf.csv', index=False, header=True)
    X_test_vect.to_csv('data/X_test_tfidf.csv', index=False, header=True)
    y_train.to_csv('data/y_train_tfidf.csv', index=False, header=True)
    y_test.to_csv('data/y_test_tfidf.csv', index=False, header=True)

    # Saving all the features (only for GridSearchCV)
    X_tfidf = tfidf_vect.fit_transform(clean_joined)
    X_tfidf_feat = pd.concat(
        [df[['uppercase%', 'exclamation_mark%', 'question_mark%', 'quotation_mark%', 'punctuation%',
             'length', 'sentiment', 'positive_words%', 'negative_words%']].reset_index(drop=True),
         pd.DataFrame(X_tfidf.toarray())], axis=1)

    X_tfidf_feat.to_csv('data/tfidf_all_features.csv')


def load_split_sets():
    X_train_vect = pd.read_csv('data/X_train_tfidf.csv')
    X_test_vect = pd.read_csv('data/X_test_tfidf.csv')
    y_train = pd.read_csv('data/y_train_tfidf.csv')
    y_test = pd.read_csv('data/y_test_tfidf.csv')

    return X_train_vect, X_test_vect, y_train, y_test


def create_selected_features():
    selected_features = pd.read_csv('data/tfidf_all_features.csv',
                                    usecols=['punctuation%', 'length', 'sentiment', 'positive_words%'])
    df = pd.DataFrame(selected_features)
    df.to_csv('data/tfidf_selected_features.csv')


def create_selected_features_for_single_text(text: str) -> pd.DataFrame:
    d = {
        'punctuation%': [count_punctuation(text)],
        'length': [count_text_length(text)],
        'sentiment': [get_sentiment(text)],
        'positive_words%': [count_positive_words()]
    }
    selected_features = pd.DataFrame(d).iloc[0]

    return selected_features
