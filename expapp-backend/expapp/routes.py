from datetime import datetime
from flask import request, jsonify
from expapp import app
from expapp.models import Profile
from expapp.schemas import ProfileSchema
from expapp import db


# init schema
profile_schema = ProfileSchema(strict=True)  # important
profiles_schema = ProfileSchema(many=True, strict=True)

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
    return jsonify(profiles_schema.dump(all_profiles))

@app.route('/profile/<id>', methods=["GET"])
def get_profile(id):
    return profile_schema.jsonify(Profile.query.get(id))

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
    profile.updateTime = datetime.now()

    db.session.commit()

    return profile_schema.jsonify(profile)

@app.route('/profile/<id>', methods=["DELETE"])
def delete_profile(id):
    profile = Profile.query.get(id)
    db.session.delete(profile)
    db.session.commit()
    return profile_schema.jsonify(profile)
