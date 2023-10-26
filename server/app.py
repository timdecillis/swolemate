from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    print('Visited localhost:3000')
    return 'Hello, Swolemate!'

if __name__ == '__main__':
    app.debug = True
    print('Starting the Flask server')
    app.run(port=3000)