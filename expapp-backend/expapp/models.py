import datetime
from expapp import db


class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    surname = db.Column(db.String(100))
    gender = db.Column(db.String)
    birthDate = db.Column(db.String(8))
    nationalities = db.Column(db.String(50))
    phone = db.Column(db.String(15))
    email = db.Column(db.String(30))
    creationTime = db.Column(db.DateTime)
    updateTime = db.Column(db.DateTime)
    activateStatus = db.Column(db.Boolean)

    def __init__(self, name, surname, gender, birthDate, nationalities, phone, email):
        self.name = name
        self.surname = surname
        self.gender = gender
        self.birthDate = birthDate
        self.nationalities = nationalities
        self.phone = phone
        self.email = email
        self.creationTime = datetime.datetime.now()
        self.updateTime = datetime.datetime.now()
        self.activateStatus = True
