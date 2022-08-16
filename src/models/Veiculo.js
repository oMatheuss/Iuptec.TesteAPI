import { sequelize } from '../uteis/keys';
import { Model, DataTypes } from 'sequelize';

class Veiculo extends Model {}

const VeiculoModel = Veiculo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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