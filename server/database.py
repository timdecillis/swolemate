from pymongo import MongoClient

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
        return "Success"
    data = doc["templates"]
    return data


def add_temp(user, template_name, variables, template):
    for doc in db["users"].find({"name": user}):
        data = doc["templates"]
        new_template = {
            "name": template_name,
            "variables": variables,
            "string": template
        }
        data.append(new_template)
    db["users"].update_one({"name": user}, {"$set": {"templates": data}})
    return data

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