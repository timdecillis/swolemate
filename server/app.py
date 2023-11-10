from flask import Flask, request

from database import get_all

app = Flask(__name__)

foods = {
    "breakfast": ["cereal", "eggs", "bacon", "fruit"],
    "lunch": ["sandwich", "soup", "salad"],
    "dinner": ["spaghetti", "chicken", "waffles"]
}

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response

@app.route("/")
def hello():
    return "Hello, Swolemate!"

@app.route("/getUserTemplates", methods=["GET"])
def templates():
    user = request.args.get("user")
    data = get_all(user)
    return data

if __name__ == "__main__":
    app.debug = True
    print("Starting the Flask server")
    app.run()