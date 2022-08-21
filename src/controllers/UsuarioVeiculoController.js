import { Router } from "express";
import { UsuarioVeiculoModel, VeiculoModel } from "../models";

const router = Router();

// Retorna todos os veiculos do usuario atual
router.get('/', async (req, res) => {
    let meusveiculos;
    try {
        meusveiculos = await UsuarioVeiculoModel.findAll({
            attributes: ['id', 'placa'],
            where: {
                id_usuario: req.context.me.id
            },
            include: [
                {
                    model: VeiculoModel,
                    attributes: ['marca', 'modelo', 'ano'],
                    required: true, // inner join
                },
            ],
            raw: true
        });
    } catch (ex) {
        return res.send({success: false, output: null, message: "Erro ao consultar veiculos!"});
    }
    return res.send({success: true, output: meusveiculos, message: "Ok!"});
});

// Insere o veiculo da tabela de veiculos para esse usuario
router.post('/', async (req, res) => {
    let veiculo = await VeiculoModel.findByPk(req.body.id_veiculo);

    if (!veiculo) {
        return res.send({success: false, output: null, message: "Veiculo inexistente!"});
    }

    let prxId = await UsuarioVeiculoModel.max('id', {
        where: {
            id_usuario: req.context.me.id
        }
    });

    try {
        await UsuarioVeiculoModel.create({
            id: prxId + 1,
            placa: req.body.placa,
            id_usuario: req.context.me.id,
            id_veiculo: veiculo.id
        });
    } catch (ex) {
		if (ex.name === "SequelizeUniqueConstraintError" && ex.errors[0]?.path === "placa") {
        	return res.send({success: false, output: null, message: "Erro ao adicionar veiculo! A placa informada já existe."});
		} else {
			return res.send({success: false, output: null, message: "Erro ao adicionar veiculo!"});
		}
    }
    return res.send({success: true, output: null, message: "Veiculo adicionado com sucesso!"});
});

// Deleta um veiculo do usuario
router.delete('/', async (req, res) => {
    let veiculo = await UsuarioVeiculoModel.findOne({
        where: {
            id: req.query.id,
            id_usuario: req.context.me.id
        }
    });

    if (!veiculo) {
        return res.send({success: false, output: null, message: "Veiculo inexistente!"});
    }

    try {
        await UsuarioVeiculoModel.destroy({
            where: {
                id: veiculo.id,
                id_veiculo: veiculo.id_veiculo,
                id_usuario: veiculo.id_usuario
            }
        });
    } catch (ex) {
        return res.send({success: false, output: null, message: "Erro ao remover veiculo!"});
    }
    return res.send({success: true, output: null, message: "Veiculo removido com sucesso!"});
});

export default router;