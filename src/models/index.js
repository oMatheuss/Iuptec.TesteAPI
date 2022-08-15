import UsuarioModel from "./Usuario";
import VeiculoModel from "./Veiculo";
import UsuarioVeiculoModel from "./UsuarioVeiculo";

UsuarioVeiculoModel.belongsTo(UsuarioModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        name: 'id_usuario',
        primaryKey: true
    }
});

UsuarioVeiculoModel.belongsTo(VeiculoModel, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'id_veiculo',
        primaryKey: true
    }
});

export {
    UsuarioModel,
    VeiculoModel,
    UsuarioVeiculoModel
};