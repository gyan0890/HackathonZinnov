from otpemail import sendemail
import sys

def createOTP(aadhaarNo):
    otp = aadhaarNo[:4]
    return otp

def emaildetails(email):
    return emaildetails

def main(args):
    otp = createOTP(args[1])
    receiveremail = args[2]
    sendemail(otp, receiveremail)

if __name__ == "__main__":
    main(sys.argv[1:])
