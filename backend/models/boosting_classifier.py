from sklearn.model_selection import GridSearchCV, StratifiedKFold
from sklearn.ensemble import GradientBoostingClassifier
import pandas as pd


def create_boosting_model(X_tfidf_feat: pd.DataFrame, labels: pd.DataFrame):
    gbc = GradientBoostingClassifier(n_estimators=1000, learning_rate=0.7,
                                     max_depth=100, max_features='auto', min_samples_leaf=1, min_samples_split=4,
                                     random_state=0).fit(X_tfidf_feat, labels)
    print("result of gtb:")
    print(gbc.score(X_tfidf_feat, labels))

    return gbc


def tuning_model_metaparameters(X_tfidf_feat: pd.DataFrame, labels: pd.DataFrame):
    gbc = GradientBoostingClassifier(random_state=0).fit(X_tfidf_feat, labels)

    param_grid = {
        'max_depth': [1, 5, 10, 50, 100],
        'learning_rate': [0.1, 0.3, 0.5, 0.7, 1.0],
        'min_samples_leaf': [1, 2, 4],
        'max_features': ['sqrt', 'auto', 'log2'],
        'min_samples_split': [2, 4, 6, 8],
        'n_estimators': [100, 250, 500, 1000]
    }

    print("starting grid search")
    gs = GridSearchCV(gbc, param_grid, cv=StratifiedKFold(n_splits=5, random_state=1410, shuffle=True), n_jobs=-1,
                      return_train_score=True)
    print("testing")
    gs_fit = gs.fit(X_tfidf_feat, labels)

    print(pd.DataFrame(gs_fit.cv_results_).sort_values('mean_test_score', ascending=False))
    print("finito")
