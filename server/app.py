from flask import Flask, request, make_response

from database import get_all, add_temp, delete_temp

app = Flask(__name__)

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, DELETE"
    return response

@app.route("/")
def hello():
    return "Hello, Swolemate!"

@app.route("/getUserTemplates", methods=["GET"])
def get_templates():
    user = request.args.get("user")
    data = get_all(user)
    print("data:", data)
    return data

@app.route("/addTemplate", methods=["POST"])
def add_template():
    data = request.get_json()
    user = data["user"]
    template = data["template"]
    added = add_temp(user, template)
    return added

@app.route("/deleteTemplate", methods=["DELETE", "OPTIONS"])
def delete_template():
    deleted = []
    if request.method == "DELETE":
        data = request.get_json()
        user = data["user"]
        template = data["template"]
        deleted = delete_temp(user, template)
        print("delete:", deleted)
    return deleted

if __name__ == "__main__":
    app.debug = True
    print("Starting the Flask server")
    app.run()