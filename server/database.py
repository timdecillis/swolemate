from pymongo import MongoClient

user1 = {
    "name": "user2",
    "breakfast": ["cereal", "eggs", "bacon", "fruit"],
    "lunch": ["sandwich", "soup", "salad"],
    "dinner": ["spaghetti", "chicken", "waffles"]
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

if __name__ == "__main__":
    print("doing something")