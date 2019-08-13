import os
from flask import Flask, request, jsonify
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

# init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# init db
db = SQLAlchemy(app)

# init marshmallow
ma = Marshmallow(app)

# Profile Model/Class
class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    surname = db.Column(db.String(100))
    gender = db.Column(db.String(1))
    birthDate = db.Column(db.String(8))
    nationalities = db.Column(db.String(50))
    phone = db.Column(db.String(15))
    email = db.Column(db.String(30))

    def __init__(self, name, surname, gender, birthDate, nationalities, phone, email):
        self.name = name
        self.surname = surname
        self.gender = gender
        self.birthDate = birthDate
        self.nationalities = nationalities
        self.phone = phone
        self.email = email

# Profile Schema using Marshmallow:
class ProfileSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'surname', 'gender', 'birthDate', 'nationalities', 'phone', 'email')

# init schema
profile_schema = ProfileSchema(strict=True)  # important
profiles_schema = ProfileSchema(many=True, strict=True)

# create profile - controller?
@app.route('/profile', methods=['POST'])
def create_profile():
    name = request.json['name']
    surname = request.json['surname']
    gender = request.json['gender']
    birthDate = request.json['birthDate']
    nationalities = request.json['nationalities']
    phone = request.json['phone']
    email = request.json['email']

    new_profile = Profile(name, surname, gender, birthDate, nationalities, phone, email)
    db.session.add(new_profile)
    db.session.commit()

    return profile_schema.jsonify(new_profile)

# get all profiles:
@app.route('/profile/all', methods=["GET"])
def get_all_profiles():
    all_profiles = Profile.query.all()
    result = profiles_schema.dump(all_profiles)
    return jsonify(result)

@app.route('/profile/<id>', methods=["GET"])
def get_profile(id):
    profile = Profile.query.get(id)
    return profile_schema.jsonify(profile)

@app.route('/profile/<id>', methods=["PUT"])
def update_profile(id):
    profile = Profile.query.get(id)

    name = request.json['name']
    surname = request.json['surname']
    gender = request.json['gender']
    birthDate = request.json['birthDate']
    nationalities = request.json['nationalities']
    phone = request.json['phone']
    email = request.json['email']

    profile.name = name
    profile.surname = surname
    profile.gender = gender
    profile.birthDate = birthDate
    profile.nationalities = nationalities
    profile.phone = phone
    profile.email = email

    db.session.commit()

    return profile_schema.jsonify(profile)

@app.route('/profile/<id>', methods=["DELETE"])
def delete_profile(id):
    profile = Profile.query.get(id)
    db.session.delete(profile)
    db.session.commit()
    return profile_schema.jsonify(profile)

# run server:
if __name__ == "__main__":
    app.run(host='0.0.0.0', port='80', debug=True)
