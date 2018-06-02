from flask import Flask
from flask import request, jsonify
from flask import json
from kmeansvcalarms import main
import os
import SimpleHTTPServer
app = Flask(__name__)
contents = []
'''
class MyHTTPRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_my_headers()
        SimpleHTTPServer.SimpleHTTPRequestHandler.end_headers(self)

    def send_my_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")

#if __name__ == '__main__':
'''
@app.route("/api/ekyc", methods=['GET', 'POST'])
def post_logfile():

    if request.method == 'GET':
        contents = "GET running on http://localhost:9000";
        return jsonify(contents)
    elif request.method == 'POST':
        aadhaarNo = request.json
        arguments = []
        #arguments.append("alarmclassification")
        #arguments.append(alarm_file["alarmName"])
        #main(arguments)
        return "\nREST Call Successful\n"

@app.route("/api/alarms/results", methods=['GET', 'POST'])
def post_results():
    if request.method == 'GET':
        #SimpleHTTPServer.test(HandlerClass=MyHTTPRequestHandler)
        f=open("kb_recommendations.txt", "r")
        if f.mode == 'r':
            content = f.read()
        contents = content.split("\n")
        contents = contents[:len(contents)-1]
        #print "Content array is:", contents
        #print "Has come to GET NUmber 2 "
        f.close()
        #print json.dumps(contents)
        response = app.response_class(response=json.dumps(contents),
                                  headers = {'Access-Control-Allow-Origin': '*',
                                            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                                             'Access-Control-Allow-Headers': 'Content-Type'},
                                  status=200,
                                  mimetype='application/json')
        return response
    elif request.method == 'POST':
        print "Reached post with data", request.json
        details_file = request.json
        print details_file
        f=open("new.txt", "w")
        f.write(details_file)
        f.close()
        return "POST Successful"


if __name__ == "__main__":
    app.run(port=9000)
