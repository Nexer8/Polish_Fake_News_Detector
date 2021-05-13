import pandas as pd
import numpy as np
from feature_creation.features import load_split_sets, create_features, create_selected_features, create_selected_features_for_single_text
from features_test.chi2test import chi2test
import models.random_forest as rf
from keras.models import load_model

import models.rnn
import models.mlp
from models.rnn import evaluate_rnn_model_params, fit_rnn_model
from models.rnn import predict_single_instance as rnn_predict_single_instance
from models.mlp import evaluate_mlp_model_params, fit_mlp_model


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


# Uncomment only when there is a need to do something about RNN model
# Evaluate params
# evaluate_rnn_model_params(X_tfidf_feat, df['label'])
# Create
# rnn_model = fit_rnn_model(X_tfidf_feat, df['label'])
# Save
# rnn_model.save('models/rnn_model.h5')
# Load
# rnn_model = load_model('models/rnn_model.h5')

# Uncomment only when there is a need to do something about MLP model
# Evaluate params
# evaluate_mlp_model_params(X_tfidf_feat, df['label'])
# Create
# mlp_model = fit_mlp_model(X_tfidf_feat, df['label'])
# Save
# mlp_model.save('models/mlp_model.h5')
# Load
# mlp_model = load_model('models/mlp_model.h5')


# Examples of single instances predicitons
# for numb in range(100, 120):
#     print('Treść wypowiedzi:')
#     print(df['content'].iloc[numb])
#     print('Klasyfikacja: ', df['label'].iloc[numb])
#     prediction = models.rnn.predict_single_instance(rnn_model, X_tfidf_feat.iloc[numb])
#     print('Predykcja: ', prediction)
#     print('================================================')

# Example of creating selected features for single text and prediction
# text = "Pod względem przeliczenia na PKB Polska jest na pierwszym miejscu w Unii Europejskiej, jeżeli chodzi o skalę pomocy dla przedsiębiorców."# Fałsz
# selected_featrures_for_single_text = create_selected_features_for_single_text(text)
# print('Treść wypowiedzi:')
# print(text)
# print('Klasyfikacja: 0')
# prediction = models.mlp.predict_single_instance(mlp_model, selected_featrures_for_single_text)
# # prediction = models.mlp.predict_single_instance(mlp_model, selected_featrures_for_single_text)
# print('Predykcja: ', prediction)