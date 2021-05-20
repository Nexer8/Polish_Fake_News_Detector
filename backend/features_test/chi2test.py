import pandas as pd
from sklearn.feature_selection import chi2, SelectKBest


def chi2test():
    X_chi2 = pd.read_csv('data/X_train_tfidf.csv', dtype='float32', usecols = range(0, 9))
    y_chi2 = pd.read_csv('data/y_train_tfidf.csv')

    # venerable_features is 4 with our data
    chi2vals, pvals = chi2(X_chi2, y_chi2)
    venerable_features = 0
    alpha = 0.05
    for pval in pvals:
        if pval <= alpha:
            venerable_features = venerable_features + 1

    # chosen for k=4: punctuation%, length, sentiment, positive_words
    chosen_features = SelectKBest(chi2, k=venerable_features).fit(X_chi2, y_chi2).get_support()
    print(chosen_features)
