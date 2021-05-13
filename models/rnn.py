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

def create_rnn_model(X_tfidf_feat: pd.DataFrame, labels: pd.DataFrame):

    nmb_of_features = X_tfidf_feat.shape[1]
    batch_size = 32

    X_train, X_test, y_train, y_test = train_test_split(X_tfidf_feat, labels, test_size=0.2, stratify=labels)
    y_train_cat = to_categorical(y_train, 2)
    y_test_cat = to_categorical(y_test, 2)

    model = Sequential()
    model.add(Embedding(1000, 32))
    model.add(LSTM(64, dropout=0.3, recurrent_dropout=0.3, recurrent_initializer='glorot_uniform', return_sequences=True))
    model.add(LSTM(32, dropout=0.3, recurrent_dropout=0.3, recurrent_initializer='glorot_uniform'))
    model.add(Dense(256, activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(2, activation='softmax'))
    model.summary()

    model.compile(optimizer='adam',
                loss='categorical_crossentropy',
                metrics=['accuracy'])

    early_stopping = EarlyStopping(monitor='loss', patience=3)

    history = model.fit(X_train, y_train_cat, validation_data=(X_test, y_test_cat), batch_size=batch_size, epochs=10, callbacks=[early_stopping])

    return model


def predict_single_instance(model, instance):
    prediction = model.predict(np.array([instance]))

    return [round(prc, 4) for prc in prediction[0]]
