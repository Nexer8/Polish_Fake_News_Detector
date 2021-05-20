import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV, StratifiedKFold, train_test_split
import pandas as pd
import pickle


def fit_model(X_tfidf_feat, labels, max_depth: int = 2, max_features: str = 'auto', min_samples_split: int = 6,
              n_estimators: int = 10):
    rf = RandomForestClassifier(max_depth=max_depth, max_features=max_features, min_samples_split=min_samples_split,
                                n_estimators=n_estimators)
    X_train, X_test, y_train, y_test = train_test_split(X_tfidf_feat, labels, test_size=0.2, random_state=1410)
    rf.fit(X_train, y_train)

    return rf


def save(model, file):
    with open(file, 'wb') as f:
        pickle.dump(model, f)


def load_model(file):
    with open(file, 'rb') as f:
        rf = pickle.load(f)
    return rf


def evaluate_best_params(X_tfidf_feat: pd.DataFrame, labels: pd.DataFrame):
    rf = RandomForestClassifier(random_state=1410)

    param = {
        'max_depth': [1, 2, 5, 10, 20, 40, 50, 80, 90, 100, 110, None],
        'max_features': ['sqrt', 'auto', 'log2'],
        'min_samples_split': [2, 4, 6, 8],
        'n_estimators': [10, 100, 250, 500, 1000]
    }

    gs = GridSearchCV(rf, param, cv=StratifiedKFold(n_splits=5, random_state=1410, shuffle=True), n_jobs=-1,
                      return_train_score=True)
    gs_fit = gs.fit(X_tfidf_feat, labels)

    print(pd.DataFrame(gs_fit.cv_results_).sort_values('mean_test_score', ascending=False))


def predict_single_instance(model, instance):
    predictions = model.predict_proba(np.array([instance]))

    return predictions[0]
