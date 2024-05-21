from flask import Flask, request

from database import get_all, add_temp, delete_temp, update_temp

app = Flask(__name__)

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE"
    return response

@app.route("/getUserTemplates", methods=["GET"])
def get_templates():
    user = request.args.get("user")
    print('user in flask:', user)
    data = get_all(user)
    return data

@app.route("/addTemplate", methods=["POST"])
def add_template():
    data = request.get_json()
    user = data["user"]
    template = data["template"]
    added = add_temp(user, template)
    print('added', added)
    return added

@app.route("/updateTemplate", methods=["PUT", "OPTIONS"])
def update_template():
    updated = []
    if request.method == "PUT":
        data = request.get_json()
        user = data["user"]
        old_value = data["oldValue"]
        new_value = data["newValue"]
        updated = update_temp(user, old_value, new_value)
    return updated

@app.route("/deleteTemplate", methods=["DELETE", "OPTIONS"])
def delete_template():
    if request.method == "DELETE":
        data = request.get_json()
        user = data["user"]
        unique_id = data["id"]
        deleted = delete_temp(user, unique_id)
        return deleted
    return 'Invalid request method'

if __name__ == "__main__":
    app.debug = True
    print("Starting the Flask server")
    app.run()
