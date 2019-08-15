from expapp import ma

# Profile Schema using Marshmallow:
class ProfileSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'surname', 'gender', 'birthDate', 'nationalities', 'phone', 'email')
