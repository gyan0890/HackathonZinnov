from flask import Flask, render_template, flash, request
from wtforms import Form, TextField, TextAreaField, validators, StringField, SubmitField

# App config.
DEBUG = True
app = Flask(__name__)
app.config.from_object(__name__)
app.config['SECRET_KEY'] = '7d441f27d441f27567d441f2b6176a'

class ReusableForm(Form):
    aadhaarNo = TextField('Aadhaar Number:', validators=[validators.required()])
    emailid = TextField('Email ID:', validators=[validators.required()])

class ReusableForm2(Form):
    otp = TextField('OTP Number:', validators=[validators.required()])

@app.route("/", methods=['GET', 'POST'])
def hello():
    form = ReusableForm(request.form)

    print form.errors
    if request.method == 'POST':
        aadhaarNo=request.form['aadhaarNo']
        emailid=request.form['emailid']

        print aadhaarNo
        print emailid

        if form.validate():
            # Save the comment here.
            flash('Hello ' + aadhaarNo)
        else:
            flash('All the form fields are required. ')

    return render_template('hello.html', form=form)

@app.route("/otp", methods=['GET', 'POST'])
def passotp():
    form2 = ReusableForm2(request.form)

    print form2.errors
    if request.method == 'POST':
        aadhaarNo=request.form['aadhaarNo']
        emailid=request.form['emailid']
        #Call Ranjani's method to process Aadhaar and Email
        if form2.validate():
            flash('Thank you for entering the otp')
        else:
            flash('Please type otp to verify your aadhaar authenticity')

    return render_template('otp.html', form=form2)

@app.route("/authentication", methods=['GET', 'POST'])
def authenticate():
    form2 = ReusableForm2(request.form)

    print form2.errors
    if request.method == 'POST':
        otp=request.form['otp']
        #Call Ranjani's method to authenticate otp(check with generated OTP)
        print otp
        if form2.validate():
            flash('Thank you for entering the otp')
        else:
            flash('Please type otp to verify your aadhaar authenticity')

    return render_template('authentication.html', form=form2)
if __name__ == "__main__":
    app.run()
