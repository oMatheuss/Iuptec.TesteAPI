import { Router } from "express";
import { VeiculoModel } from "../models";

const router = Router();

router.get('/', async(req, res) => {
    let veiculos = await VeiculoModel.findAll();
    return res.send(veiculos);
});

router.get('/:id', async (req, res) => {
    let veiculo = await VeiculoModel.findByPk(req.params.id);
    return res.send(veiculo);
});

router.post('/', async (req, res) => {
    try {
        await VeiculoModel.create({
            marca: req.body.marca,
            modelo: req.body.modelo,
            ano: req.body.ano
        });
        return res.send({success: true, output: null, message: "Veiculo cadastrado!"});
    } catch(erro) {
        console.log(`Erro ao inserir veiculo: ${erro}`);
        return res.send({success: false, output: null, message: "Erro ao cadastrar veiculo!"});
    }
});

export default router;