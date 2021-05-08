import pandas as pd
from feature_creation.features import load_split_sets, create_features, create_selected_features
from features_test.chi2test import chi2test
import models.random_forest as rf

pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', None)

df = pd.read_csv('data/citations.csv')
df = df.dropna()
df = df.reset_index(drop=True)

classes_names = {0: 'Fałsz', 1: 'Prawda', 2: "Manipulacja", 3: "Nieweryfikowalne"}
df['label'].replace({'Fałsz': 0, 'Prawda': 1, 'Manipulacja': 2, 'Nieweryfikowalne': 3}, inplace=True)
df = df[(df['label'] == 0) | (df['label'] == 1)]

# Uncomment only when there is a need to recreate all the features
# create_features(df)
# create_selected_features()

# Uncomment if another features test is needed
# chi2test()

X_tfidf_feat = pd.read_csv('data/tfidf_selected_features.csv')
X_tfidf_feat = X_tfidf_feat.drop(X_tfidf_feat.columns[0], axis=1)

# Selecting best Random Forest parameters using GridSearchCV (full output available in output/ directory)
# Uncomment only when there is a need to reevaluate all the params
# Current model: {'max_depth': 2, 'max_features': 'auto', 'min_samples_split': 6, 'n_estimators': 10}
# mean_score_time=0.017376, mean_test_score=0.720370
# rf.evaluate_best_params(X_tfidf_feat, df['label'])
