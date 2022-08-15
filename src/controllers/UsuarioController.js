import { Router } from "express";
import { UsuarioModel } from "../models";

const router = Router();

router.get('/me', async(req, res) => {
    let me = {
        nome: req.context.me.nome,
        email: req.context.me.email,
        telefone: req.context.me?.telefone
    };
    return res.send({success: true, output: me, message: "Ok!"});
});

router.get('/:userId', async (req, res) => {
    let user = await UsuarioModel.findByPk(req.params.userId);
    return res.send({success: true, output: user, message: "Ok!"});
});

export default router;