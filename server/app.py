from flask import Flask, request, make_response

from database import get_all, add_temp, delete_temp, update_temp

app = Flask(__name__)

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE"
    return response

@app.route("/")
def hello():
    return "Hello, Swolemate!"

@app.route("/getUserTemplates", methods=["GET"])
def get_templates():
    user = request.args.get("user")
    data = get_all(user)
    return data

@app.route("/addTemplate", methods=["POST"])
def add_template():
    data = request.get_json()
    user = data["user"]
    template_name = data["name"]
    template = data["template"]
    variables = data["variables"]
    added = add_temp(user, template_name, variables, template)
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
    deleted = []
    if request.method == "DELETE":
        data = request.get_json()
        user = data["user"]
        template = data["template"]
        deleted = delete_temp(user, template)
    return deleted

if __name__ == "__main__":
    app.debug = True
    print("Starting the Flask server")
    app.run()