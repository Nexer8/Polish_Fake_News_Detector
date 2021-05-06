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
#create_features(df)
#create_selected_features()

# Uncoment if another features test is needed
#chi2test()

X_train_vect, X_test_vect, y_train, y_test = load_split_sets()
X_tfidf_feat = pd.read_csv('data/tfidf_all_features.csv')

# Selecting best Random Forest parameters using GridSearchCV
# Uncomment only when there is a need to reevaluate all the params
# rf.evaluate_best_params(X_tfidf_feat, df['label'])
