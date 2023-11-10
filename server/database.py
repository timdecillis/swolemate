from pymongo import MongoClient

user2 = {
    "name": "user2",
    "templates": ["the fox jumped over the hound", "spiderman was denied a bank loan", "unique new york"]
}

client = MongoClient("mongodb://localhost:27017/")
db = client["mind_palace"]

def seed_database(user):
    db["users"].insert_one(user)
    print("your users:", db["users"])

def get_all(user):
    for doc in db["users"].find({"name": user}):
        data = doc["templates"]
        return data

def add_temp(user, template):
    for doc in db["users"].find({"name": user}):
        data = doc["templates"]
        data.append(template)
        return data