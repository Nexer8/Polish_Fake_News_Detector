from fastapi import FastAPI
import uvicorn

from feature_creation.features import create_selected_features_for_single_text
import models.random_forest as rf

model = rf.load_model('models/rf_model.pickle')
app = FastAPI()


@app.get("/classify/{text_body}")
async def classify_test(text_body: str):
    features = create_selected_features_for_single_text(text_body)
    prediction = rf.predict_single_instance(model, features)
    return dict(zip(['fake', 'true'], prediction))


def main():
    uvicorn.run(app, port=8000)


if __name__ == "__main__":
    main()
