import { sequelize } from '../uteis/keys';
import { Model, DataTypes } from 'sequelize';

class Veiculo extends Model {}

const VeiculoModel = Veiculo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    placa: {
        type: DataTypes.STRING(7),
        unique: true,
        allowNull: false,
        validate: {
            is: /^[0-9A-Z]{7}$/i,
        },
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ano: {
        type: DataTypes.STRING(4),
        allowNull: false,
        validate: {
            is: /^[0-9]{4}$/i,
        },
    },
}, { sequelize, modelName: 'veiculo' });

export default VeiculoModel;