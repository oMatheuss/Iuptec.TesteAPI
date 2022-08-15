import { sequelize } from '../uteis/keys';
import { Model, DataTypes } from 'sequelize';

class UsuarioVeiculo extends Model {}

const UsuarioVeiculoModel = UsuarioVeiculo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        //autoIncrement: true, // como a chave primaria eh composta, esse id aumenta individualmente por usuario
    }
}, { sequelize, modelName: 'usuario_veiculo' });

export default UsuarioVeiculoModel;