from flask import Flask, render_template, request, make_response
import json
import base64
from urllib.parse import unquote
import os

PORT_NUMBER = int(os.environ.get("PORT", 5000))    

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route("/")
def index():
    if request.authorization and request.authorization.username == "instalador" and request.authorization.password == "jl@1234":
        return render_template("index.html")
    else:
        return make_response(render_template("error.html"), 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=PORT_NUMBER, debug = True)