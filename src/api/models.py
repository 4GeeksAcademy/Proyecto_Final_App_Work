from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()

class Postulados(db.Model):
    __tablename__ = "postulados"
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), primary_key=True)
    oferta_id = db.Column(db.Integer, db.ForeignKey("ofertas.id"), primary_key=True)
    estado = db.Column(db.String(20), nullable=False, default='pendiente')

    def __repr__(self):
        return f'<Postulados {self.user_id} - {self.oferta_id}>'

    def serialize(self):
        user = User.query.get(self.user_id)
        return {
            "user_id": self.user_id,
            "oferta_id": self.oferta_id,
            "email": user.email,
            "username": user.username,
            "programador": user.profile_programador.serialize() if user.profile_programador else None,
            "estado": self.estado,
        }


class Ratings(db.Model):
    __tablename__ = "ratings"
    id = db.Column(db.Integer, primary_key=True)
    programador_id = db.Column(db.Integer, db.ForeignKey("programador.id"))
    empleador_id = db.Column(db.Integer, db.ForeignKey("empleador.id"))
    value = db.Column(db.Integer)

    def __repr__(self):
        return f'<Ratings {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "programador_id": self.programador_id,
            "empleador_id": self.empleador_id,
            "value": self.value
        }


class Favoritos(db.Model):
    __tablename__ = "favoritos"
    id = db.Column(db.Integer, primary_key=True)
    programador_id = db.Column(db.Integer, db.ForeignKey("programador.id"), nullable=True)
    empleador_id = db.Column(db.Integer, db.ForeignKey("empleador.id"), nullable=True)
    oferta_id = db.Column(db.Integer, db.ForeignKey("ofertas.id"), nullable=True)

    def __repr__(self):
        return f'<Favoritos {self.programador_id}-{self.empleador_id}-{self.oferta_id}>'

    def serialize(self):
        return {
            "programador_id": self.programador_id,
            "empleador_id": self.empleador_id,
            "oferta_id": self.oferta_id
        }


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    username = db.Column(db.String(50), nullable=False)
    photo = db.Column(db.String(200))
    phone = db.Column(db.String(30))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    country = db.Column (db.String (20), unique=False, nullable=False)
    profile_programador = db.relationship ("Programador", backref="user", uselist=False)
    profile_empleador = db.relationship ("Empleador", backref="user", uselist=False)
    postulados= db.relationship ("Postulados", backref= "user", lazy=True)
    description = db.Column(db.String(500))
    skills = db.relationship('Skills', backref='user', lazy=True)
    price = db.Column(db.Float, nullable=True)  
    currency = db.Column(db.String(3), nullable=True)
   

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "username": self.username,
            "photo": self.photo,
            "country": self.country,
            "phone": self.phone,
            "profile_programador": self.profile_programador.serialize() if self.profile_programador else None,
            "profile_empleador": self.profile_empleador.serialize()  if self.profile_empleador else None,
            "postulados": [postulados.serialize() for postulados in self.postulados] if self.postulados else None,
            "description": self.description,
            "price": self.price,  
            "currency": self.currency,
        }


class Experience(Enum):
    JUNIOR = 'junior'
    MID = 'mid-level'
    SENIOR = 'senior'


class Programador(db.Model):
    __tablename__ = "programador"
    id = db.Column(db.Integer, primary_key=True)
    precio_hora = db.Column(db.Integer)
    tecnologias = db.Column(db.String(200))
    experiencia = db.Column(db.Enum(Experience))
    descripcion = db.Column(db.String(300))
    rating_value = db.Column(db.Float(2))
    proyectos = db.relationship("Proyectos", backref="programador", lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    ratings = db.relationship("Ratings", backref="programador", lazy=True)
    favoritos = db.relationship("Favoritos", backref="programador", lazy=True)

    def __repr__(self):
        return f'<Programador {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "precio_hora": self.precio_hora,
            "tecnologias": self.tecnologias,
            "experiencia": self.experiencia.value if self.experiencia else None,
            "descripcion": self.descripcion,
            "rating_value": self.rating_value,
            "proyectos": [proyecto.serialize() for proyecto in self.proyectos],
            "favoritos": [favorito.serialize() for favorito in self.favoritos] if self.favoritos else None
        }


class Empleador(db.Model):
    __tablename__ = "empleador"
    id = db.Column(db.Integer, primary_key=True)
    cif = db.Column(db.String(15), unique=True)
    metodo_pago = db.Column(db.String(100))
    descripcion = db.Column(db.String(300))
    premium = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    ratings = db.relationship("Ratings", backref="empleador", lazy=True)
    favoritos = db.relationship("Favoritos", backref="empleador", lazy=True)
    ofertas = db.relationship("Ofertas", backref="empleador", lazy=True)

    def __repr__(self):
        return f'<Empleador {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "cif": self.cif,
            "metodo_pago": self.metodo_pago,
            "descripcion": self.descripcion,
            "premium": self.premium,
            "favoritos": [favorito.serialize() for favorito in self.favoritos] if self.favoritos else None
        }


class Modalidad(Enum):
    TELETRABAJO = 'teletrabajo'
    PRESENCIAL = 'presencial'
    HYBRIDO = 'hybrido'


class Ofertas(db.Model):
    __tablename__ = "ofertas"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    nombre_empresa = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(), nullable=False)
    salario = db.Column(db.String(20))
    localidad = db.Column(db.String(30), nullable=False)
    requisitos_minimos = db.Column(db.String(400), nullable=False)
    horario = db.Column(db.String(100))
    tipo_contrato = db.Column(db.String(100))
    estudios_minimos = db.Column(db.String(100))
    idiomas = db.Column(db.String(30))
    plazo = db.Column(db.String(100), nullable=False)
    modalidad = db.Column(db.Enum(Modalidad), nullable=False)
    experiencia_minima = db.Column(db.Enum(Experience), nullable=False)
    fecha_publicacion = db.Column(db.Date, nullable=False)
    postulados = db.relationship("Postulados", backref="ofertas", lazy=True)
    favoritos = db.relationship("Favoritos", backref="ofertas", lazy=True)
    empleador_id = db.Column(db.Integer, db.ForeignKey("empleador.id"))

    def __repr__(self):
        return f'<Ofertas {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "nombre_empresa": self.nombre_empresa,
            "descripcion": self.descripcion,
            "salario": self.salario,
            "localidad": self.localidad,
            "requisitos_minimos": self.requisitos_minimos,
            "horario": self.horario,
            "tipo_contrato": self.tipo_contrato,
            "estudios_minimos": self.estudios_minimos,
            "idiomas": self.idiomas,
            "plazo": self.plazo,
            "modalidad": self.modalidad.value,
            "experiencia_minima": self.experiencia_minima.value,
            "fecha_publicacion": self.fecha_publicacion.isoformat(),
            "empleador_id": self.empleador_id,
            "postulados": [postulado.serialize() for postulado in self.postulados] if self.postulados else None,
            "favoritos": [favorito.serialize() for favorito in self.favoritos] if self.favoritos else None,
            "premium":  self.empleador.premium if self.empleador else None
        }


class Proyectos(db.Model):
    __tablename__ = "proyectos"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    descripcion_corta = db.Column(db.String(150), nullable=False)
    git = db.Column(db.String(300))
    link = db.Column(db.String(500))
    tecnologias = db.Column(db.String(200), nullable=False)
    programador_id = db.Column(db.Integer, db.ForeignKey("programador.id"))

    def __repr__(self):
        return f'<Proyectos {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "descripcion_corta": self.descripcion_corta,
            "git": self.git,
            "link": self.link,
            "tecnologias": self.tecnologias,
            "programador_id": self.programador_id
        }


class Contact(db.Model):
    __tablename__ = "contact"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.String(1000), nullable=False)
    privacy_policy_accepted = db.Column(db.Boolean, nullable=False, default=False)

    def __repr__(self):
        return f'<Contact {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastName": self.lastName,
            "email": self.email,
            "message": self.message,
            "privacy_policy_accepted": self.privacy_policy_accepted
        }
    
class Skills(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    language = db.Column(db.String(120), nullable=False)
    experience = db.Column(db.String(120), nullable=False)
    projects = db.Column(db.Integer, nullable=False)
    certificate_name = db.Column(db.String(255), nullable=True)
    certificate_link = db.Column(db.String(255), nullable=True)
    icon = db.Column(db.String(255), nullable=False)


    def serialize(self):
        return {
            'language': self.language,
            'experience': self.experience,
            'projects': self.projects,
            'certificateName': self.certificate_name,
            'certificateLink': self.certificate_link,
            'icon': self.icon
        }

