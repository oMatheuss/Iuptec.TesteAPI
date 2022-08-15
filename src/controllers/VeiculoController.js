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
    let response;
    try {
        await VeiculoModel.create({
            placa: req.body.placa,
            marca: req.body.marca,
            modelo: req.body.modelo,
            ano: req.body.ano
        });
        response = "sucesso";
    } catch(erro) {
        console.log(`Erro ao inserir veiculo: ${erro}`);
        response = "erro";
    }
    return res.send(response);
});

export default router;