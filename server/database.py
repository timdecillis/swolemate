from pymongo import MongoClient

user1 = {
    "name": "user1",
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

def get_all():
    for doc in db["users"].find():
        return doc

seed_database(user1)

if __name__ == "__main__":
    print("doing something")