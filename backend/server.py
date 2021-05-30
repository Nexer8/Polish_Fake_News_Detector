from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel

from feature_creation.features import create_selected_features_for_single_text
import models.random_forest as rf

model = rf.load_model('models/rf_model.pickle')
app = FastAPI()


class Item(BaseModel):
    statement: str


@app.post("/classify/")
async def classify_text(item: Item):
    features = create_selected_features_for_single_text(item.statement)
    prediction = rf.predict_single_instance(model, features)
    return dict(zip(['fake', 'true'], prediction))


def main():
    uvicorn.run(app, port=8000, host="0.0.0.0")


if __name__ == "__main__":
    main()
