from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS
import random

app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app) #Cross Origin Resource Sharing

@app.route("/", methods=['GET'])
def index():
    return "hello world" + "_" + str(random.randint(0, 100))

@app.route("/test", methods=['GET'])
def test():
    return "test" + "_" + str(random.randint(0, 100))

if __name__ == "__main__":
    print("aaaaaaaaa")
    app.run()
