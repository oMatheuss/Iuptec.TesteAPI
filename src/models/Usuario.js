import { sequelize } from '../uteis/keys';
import { Model, DataTypes } from 'sequelize';

class Usuario extends Model {}

const UsuarioModel = Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    senha: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    },
}, { sequelize, modelName: 'usuario' });

Usuario.findByEmail = async (email) => {
    let usuario = await Usuario.findOne({
        where: { email: email },
    });
    return usuario;
};

export default UsuarioModel;