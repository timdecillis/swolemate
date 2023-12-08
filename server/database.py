from pymongo import MongoClient, ReturnDocument
from bson import ObjectId

client = MongoClient("mongodb://localhost:27017/")
db = client["mind_palace"]

def create_user(user):
    data = {
        "name": user,
        "templates": []
    }
    db["users"].insert_one(data)

def get_all(user):
    doc = db["users"].find_one({"name": user})
    if not doc:
        create_user(user)
        return []
    data = doc["templates"]
    return data


def add_temp(user, template):
    template_id = str(ObjectId())
    template = { **template, "id": template_id}

    doc = db["users"].find_one_and_update(
        {"name": user},
        {"$push": {"templates": template}},
        return_document=ReturnDocument.AFTER
    )
    return doc["templates"]

def update_temp(user, old_value, new_value):
    for doc in db["users"].find({"name": user}):
        data = doc["templates"]
        for i in range(len(data)):
            if (data[i]) == old_value:
                data[i] = new_value
    db["users"].update_one({"name": user}, {"$set": {"templates": data}})
    return data

def delete_temp(user, template):
    for doc in db["users"].find({"name": user}):
        data = doc["templates"]
        data.remove(template)
    db["users"].update_one({"name": user}, {"$set": {"templates": data}})
    return data

def wipe_db():
    db["users"].delete_many({})
    print('data deleted')
    return