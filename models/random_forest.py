from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV, StratifiedKFold
import pandas as pd


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
