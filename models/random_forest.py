from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV
import pandas as pd


def evaluate_best_params(X_tfidf_feat: pd.DataFrame, labels: pd.DataFrame):
    rf = RandomForestClassifier(random_state=1410)

    param = {
        'max_depth': [80, 90, 100, 110, None],
        'max_features': [0.2, None],
        'min_samples_leaf': [3, 4, 5],
        'min_samples_split': [8, 10, 12],
        'n_estimators': [100, 200, 300, 1000]
    }

    gs = GridSearchCV(rf, param, cv=5, n_jobs=-1, return_train_score=True)
    gs_fit = gs.fit(X_tfidf_feat, labels)

    print(pd.DataFrame(gs_fit.cv_results_).sort_values('mean_test_score', ascending=False)[0:5])
