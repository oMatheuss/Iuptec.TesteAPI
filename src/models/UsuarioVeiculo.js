import { sequelize } from '../uteis/keys';
import { Model, DataTypes } from 'sequelize';

class UsuarioVeiculo extends Model {}

const UsuarioVeiculoModel = UsuarioVeiculo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        //autoIncrement: true, // como a chave primaria eh composta, esse id aumenta individualmente por usuario
    },
    placa: {
        type: DataTypes.STRING(7),
        unique: true,
        allowNull: false,
        validate: {
            is: /^[0-9A-Z]{7}$/i,
        },
    }
}, { sequelize, modelName: 'usuario_veiculo' });

export default UsuarioVeiculoModel;