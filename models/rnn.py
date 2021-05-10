import pandas as pd
import numpy as np

from tensorflow.keras.callbacks import EarlyStopping
from sklearn.model_selection import train_test_split
from keras.layers import Dense, Embedding, LSTM, Dropout
from keras.models import Sequential
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import Tokenizer
from keras.losses import sparse_categorical_crossentropy
from tensorflow.keras.utils import to_categorical

def create_rnn_model():

    batch_size = 32

    model = Sequential()
    model.add(Embedding(len(tokenizer.index_word)+1, 32))
    model.add(LSTM(64, dropout=0.3, recurrent_dropout=0.3, recurrent_initializer='glorot_uniform', return_sequences=True))
    model.add(LSTM(32, dropout=0.3, recurrent_dropout=0.3, recurrent_initializer='glorot_uniform'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(2, activation='softmax'))
    model.summary()

    model.compile(optimizer='adam',
                loss='categorical_crossentropy',
                metrics=['accuracy'])

    early_stopping = EarlyStopping(monitor='loss', patience=3)

    history = model.fit(X_train_seq_pad, y_train_cat, validation_data=(X_test_seq_pad, y_test_cat), batch_size=batch_size, epochs=10, callbacks=[early_stopping])

    return model


if __name__ == '__main__':
    df = pd.read_csv('../data/clean.csv')
    X_train, X_test, y_train, y_test = train_test_split(df['clean_text'], df['label'], test_size=0.25)

    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(X_train)
    X_train_seq = tokenizer.texts_to_sequences(X_train)
    X_test_seq = tokenizer.texts_to_sequences(X_test)

    padding_length = len(max(X_train_seq, key=len))

    X_train_seq_pad = pad_sequences(X_train_seq, padding_length)
    X_test_seq_pad = pad_sequences(X_test_seq, padding_length)

    y_train_cat = to_categorical(y_train, 2)
    y_test_cat = to_categorical(y_test, 2)

    model = create_rnn_model()