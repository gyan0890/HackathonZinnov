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

if __name__ == "__main__":
    app.run()
