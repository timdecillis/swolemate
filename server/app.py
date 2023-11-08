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

@app.route("/default")
def test():
    response = get_all()
    return response

@app.route("/addFood", methods=["POST"])
def add_food():
    data = request.get_json()
    foods[data["lowerLabel"]].append(data["input"])
    return foods

if __name__ == "__main__":
    app.debug = True
    print("Starting the Flask server")
    app.run()