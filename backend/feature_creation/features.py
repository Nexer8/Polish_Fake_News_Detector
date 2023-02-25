import os
import string

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from text_preprocessing.text_preprocessing import (TEMP_FILE,
                                                   get_lemmatized_texts_dict,
                                                   get_sentiment,
                                                   get_sentiments_dict,
                                                   lemmatize,
                                                   parse_lemmatization,
                                                   parse_sentiment)


def count_uppercase_letters(text):
    count = sum([1 for char in text if char.isupper()])
    return (count / (len(text) - text.count(' ')))


def count_exclamation_marks(text):
    count = text.count('!')
    return (count / (len(text) - text.count(' ')))


def count_question_marks(text):
    count = text.count('?')
    return (count / (len(text) - text.count(' ')))


def count_quotation_marks(text):
    count = text.count('"')
    return (count / (len(text) - text.count(' ')))


def count_punctuation(text):
    count = sum([1 for char in text if char in string.punctuation])
    return (count / (len(text) - text.count(' ')))


def count_text_length(text):
    return len(text) - text.count(' ')


def create_features(df: pd.DataFrame):
    df['uppercase%'] = df['content'].apply(
        lambda x: count_uppercase_letters(x))
    df['exclamation_mark%'] = df['content'].apply(
        lambda x: count_exclamation_marks(x))
    df['question_mark%'] = df['content'].apply(
        lambda x: count_question_marks(x))
    df['quotation_mark%'] = df['content'].apply(
        lambda x: count_quotation_marks(x))
    df['punctuation%'] = df['content'].apply(lambda x: count_punctuation(x))
    df['length'] = df['content'].apply(lambda x: count_text_length(x))

    rows_list = []
    for index, _ in df.iterrows():
        try:
            sentiments_dict = get_sentiments_dict(df)
            lemmatized_texts_dict = get_lemmatized_texts_dict(df)
            sentiment, positive_words, negative_words = parse_sentiment(
                sentiments_dict[f'{index}.txt'])
            cleaned_text = parse_lemmatization(
                lemmatized_texts_dict[f'{index}.txt'])
            dictionary = {
                'sentiment': sentiment,
                'positive_words%': positive_words,
                'negative_words%': negative_words,
                'clean_text': cleaned_text
            }
            rows_list.append(dictionary)
        except KeyError:
            print(f'KeyError on index: {index}')

    df = pd.concat([df.reset_index(drop=True), pd.DataFrame(
        rows_list).reset_index(drop=True)], axis=1)
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
    try:
        with open(f'{TEMP_FILE}.txt', 'w') as temp_file:
            temp_file.write(text)
        sentiment_dict = get_sentiment()
        sentiment, positive_words, negative_words = parse_sentiment(
            sentiment_dict)
        # lemmatized_dict = lemmatize()
        # cleaned_text = parse_lemmatization(lemmatized_dict)
        selected_features = pd.DataFrame(
            {
                'punctuation%': [count_punctuation(text)],
                'length': [count_text_length(text)],
                'sentiment': [sentiment],
                'positive_words%': [positive_words],
                # 'negative_words%': [negative_words],
                # 'clean_text': cleaned_text,
            }
        ).iloc[0]
    except Exception as e:
        print(e)
    finally:
        os.remove(f'{TEMP_FILE}.txt')

    return selected_features
