from pymongo import MongoClient

user1 = {
    "name": "user2",
    "templates": ["the fox jumped over the hound", "spiderman was denied a bank loan", "unique new york"]
}

client = MongoClient("mongodb://localhost:27017/")
db = client["mind_palace"]

def seed_database(user):
    db["users"].insert_one(user)
    for doc in db["users"].find():
        print(doc)

def get_all(user):
    for doc in db["users"].find({"name": user}):
        data = {
            "breakfast": doc["breakfast"],
            "lunch": doc["lunch"],
            "dinner": doc["dinner"]
            }
        return data