from flask import Flask

app = Flask(__name__)

foods = {
    'breakfast': ['cereal', 'eggs', 'bacon', 'fruit'],
    'lunch': ['sandwich', 'soup', 'salad'],
    'dinner': ['spaghetti', 'chicken', 'waffles']
}


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    return response

@app.route('/')
def hello():
    print('Visited localhost:5000')
    return 'Hello, Swolemate!'

@app.route('/test')
def test():
    print('Visited 5000')
    return foods

if __name__ == '__main__':
    app.debug = True
    print('Starting the Flask server')
    app.run()