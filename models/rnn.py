import pandas as pd
import numpy as np

from keras.layers import Dense, Embedding, LSTM
from keras.models import Sequential

from keras.wrappers.scikit_learn import KerasClassifier
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.model_selection import StratifiedKFold
from keras.utils import to_categorical


def create_model(optimizer='adam', loss='categorical_crossentropy'):

    model = Sequential()
    model.add(Embedding(1000, 32))
    model.add(LSTM(64, dropout=0.3, recurrent_dropout=0.3, recurrent_initializer='glorot_uniform', return_sequences=True))
    model.add(LSTM(32, dropout=0.3, recurrent_dropout=0.3, recurrent_initializer='glorot_uniform'))
    model.add(Dense(256, activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(2, activation='softmax'))
    model.summary()

    model.compile(optimizer=optimizer,
                loss=loss,
                metrics=['accuracy'])

    return model


def fit_rnn_model(X_tfidf_feat, labels, optimizer='adam', loss='categorical_crossentropy', epochs=60, batch_size=64):
    model = create_model(optimizer, loss)
    X_train, X_test, y_train, y_test = train_test_split(X_tfidf_feat, labels, test_size=0.2, stratify=labels)
    y_train_cat = to_categorical(y_train, 2)
    y_test_cat = to_categorical(y_test, 2)
    history = model.fit(X_train, y_train_cat, validation_data=(X_test, y_test_cat), batch_size=batch_size, epochs=epochs)

    return model

def evaluate_rnn_model_params(X_tfidf_feat: pd.DataFrame, labels: pd.DataFrame):

    model = KerasClassifier(build_fn=create_model)

    param_grid = {
        'epochs': [20, 40, 60, 80],
        'batch_size': [16, 32, 64, 128],
        'optimizer': ['rmsprop', 'adam', 'SGD'],
        'loss': ['mse', 'categorical_crossentropy']
    }

    grid = GridSearchCV(estimator=model, param_grid=param_grid, cv=StratifiedKFold(n_splits=5, random_state=1410, shuffle=True),
                        n_jobs=-1, return_train_score=True)
    grid_result = grid.fit(X_tfidf_feat, labels)

    print(pd.DataFrame(grid_result.cv_results_).sort_values('mean_test_score', ascending=False))


def predict_single_instance(model, instance):
    prediction = model.predict(np.array([instance]))

    return [round(prc, 4) for prc in prediction[0]]
