import smtplib

def sendemail(otp, receiveremail):
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()

    message = "Your OTP number is "+str(otp)
    s.login("dummyforpytesting@gmail.com", "Hello@123")

    s.sendmail("dummyforpytesting@gmail.com", receiveremail, message)
    s.quit()


if __name__ == "__main__":
    print "Main Function"
