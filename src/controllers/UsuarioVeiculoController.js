import { Router } from "express";
import { UsuarioVeiculoModel, VeiculoModel } from "../models";

const router = Router();

// Retorna todos os veiculos do usuario atual
router.get('/', async (req, res) => {
    let meusveiculos;
    try {
        meusveiculos = await UsuarioVeiculoModel.findAll({
            where: {
                id_usuario: req.context.me.id
            },
            include: [
                {
                    model: VeiculoModel,
                    required: true, // inner join
                },
            ]
        });
    } catch (ex) {
        console.log(`Erro ao consultar veiculos: ${ex}`);
        return res.send({success: false, output: null, message: "Erro ao consultar veiculos!"});
    }
    return res.send({success: true, output: meusveiculos, message: "Ok!"});
});

// Insere o veiculo da tabela de veiculos para esse usuario
router.post('/:id', async (req, res) => {
    let veiculo = await VeiculoModel.findByPk(req.params.id);

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
            id_usuario: req.context.me.id,
            id_veiculo: veiculo.id
        });
    } catch (ex) {
        console.log(`Erro ao inserir veiculo: ${ex}`);
        return res.send({success: false, output: null, message: "Erro ao adicionar veiculo!"});
    }
    return res.send({success: true, output: null, message: "Veiculo adicionado com sucesso!"});
});

// Deleta um veiculo do usuario
router.delete('/:id', async (req, res) => {
    let veiculo = await UsuarioVeiculoModel.findOne({
        where: {
            id: req.params.id,
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
        console.log(`Erro ao remover veiculo: ${ex}`);
        return res.send({success: false, output: null, message: "Erro ao remover veiculo!"});
    }
    return res.send({success: true, output: null, message: "Veiculo removido com sucesso!"});
});

export default router;