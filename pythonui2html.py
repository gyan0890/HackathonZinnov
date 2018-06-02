from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def form():
    return render_template('aadhaar.html')

@app.route('/otp', methods=['GET', 'POST'])
def hello():
    return render_template('otp.html', aadhaarNo=request.form['aadhaarNo'], emailid=request.form['emailid'])

if __name__ == "__main__":
    app.run()
