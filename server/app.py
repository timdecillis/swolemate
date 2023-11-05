from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    print('Visited localhost:5000')
    return 'Hello, Swolemate!'

@app.route('/test')
def test():
    print('Visited 5000')
    return 'Hello, Sir!'

if __name__ == '__main__':
    app.debug = True
    print('Starting the Flask server')
    app.run()