import pandas as pd
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.callbacks import EarlyStopping


def create_mlp_model():
    padding_length = len(max(X_train_seq, key=len))

    model = Sequential()
    model.add(Dense(padding_length, activation='relu'))
    model.add(Dense(512, activation='relu'))
    model.add(Dense(256, activation='relu'))
    # model.add(Dropout(0.25))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(64, activation='relu'))
    # model.add(Dropout(0.25))
    model.add(Dense(32, activation='relu'))
    model.add(Dense(32, activation='relu'))
    # model.add(Dropout(0.25))
    model.add(Dense(16, activation='relu'))
    model.add(Dense(16, activation='relu'))
    model.add(Dense(8, activation='relu'))
    model.add(Dense(8, activation='relu'))
    model.add(Dense(2, activation='softmax'))

    model.compile(optimizer='adam',
              loss='mse',
              metrics=['accuracy'])

    X_train_seq_pad = pad_sequences(X_train_seq, padding_length)
    X_test_seq_pad = pad_sequences(X_test_seq, padding_length)

    early_stopping = EarlyStopping(monitor='loss', patience=3)

    history = model.fit(X_train_seq_pad, y_train_cat, validation_data=(X_test_seq_pad, y_test_cat), batch_size=16, epochs=10, callbacks=[early_stopping])

    model.summary()

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

    model = create_mlp_model()
