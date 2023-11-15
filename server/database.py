from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["mind_palace"]

def create_user(user):
    print("creating user")
    data = {
        "name": user,
        "templates": []
    }
    db["users"].insert_one(data)
    print("your users:", db["users"])

def get_all(user):
    doc = db["users"].find_one({"name": user})
    if not doc:
        print("creating new")
        create_user(user)
        return []
    data = doc["templates"]
    return data


def add_temp(user, template):
    for doc in db["users"].find({"name": user}):
        data = doc["templates"]
        data.append(template)
    db["users"].update_one({"name": user}, {"$set": {"templates": data}})
    return data

def delete_temp(user, template):
    for doc in db["users"].find({"name": user}):
        data = doc["templates"]
        data.remove(template)
    db["users"].update_one({"name": user}, {"$set": {"templates": data}})
    return data