import { Router } from "express";
import { UsuarioModel } from "../models";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookiecfg } from '../uteis/keys';

const router = Router();

// autentica o usuario, adicionando um cookie 'refreshtoken' e adiciona no corpo da resposta um access token
// o usuario deve usar o access token no header de authorization para ter acesso a api
// o access token expira apos 5 min, então o usario deve ter uma rotina que chama o endpoint /refreshtoken
// enquanto, se o refresh token expirar deve acontecer um novo login
router.post('/login', async(req, res) => {
    let {email, senha} = req.body;

    if (!(email && senha)) {
        return res.send({success: false, output: null, message: "É obrigatório informar email e senha!"});
    }

    let user = await UsuarioModel.findOne({
        where: { email: email }
    });

    if (!user) {
        return res.send({success: false, output: null, message: "Não existe usuario para o email informado!"});
    }

    if (!(await bcrypt.compare(senha, user.senha))) {
        return res.send({success: false, output: null, message: "Senha incorreta!"});
    }

    let refreshtoken = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: "1d",
    });

    res.cookie('refreshtoken', refreshtoken, {...cookiecfg});

    let accesstoken = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: 300,
    });

    return res.send({success: true, output: { token: accesstoken }, message: "Ok"});
});

// cadastra um novo usuario
router.post('/signup', async (req, res) => {
    let {nome, email, senha, telefone} = req.body;

    if (!(email && senha && nome && telefone)) {
        return res.send({success: false, output: null, message: "É obrigatório informar todos os campos!"});
    }

    let senha_hash = await bcrypt.hash(senha, 10);

    try {
        await UsuarioModel.create({
            nome: nome,
            email: email,
            senha: senha_hash,
            telefone: telefone
        });
        return res.send({success: true, output: null, message: "Cadastro realizado com sucesso!"});
    } catch(erro) {
        return res.send({success: false, output: null, message: "Falha ao realizar cadastro!"});
    }
});

// retorna um novo access token para o usuario se o refresh token for valido
router.get('/refreshtoken', (req, res) => {
    //extrai a string do refresh token armazenado nos cookies
    let sToken = req.headers.cookie?.split(';').filter((value) => value?.split("=")[0] === "refreshtoken")[0]?.split("=")[1];

    if (!sToken) {
        return res.send({success: false, output: 401, message: "Não autenticado!"});
    }

    let token;
    try {
        token = jwt.verify(sToken, process.env.JWT_SECRET, {
            algorithm: 'HS256'
        });
    } catch (erro) {
        return res.send({success: false, output: 401, message: "Refresh token invalido!"});
    }

    let accesstoken = jwt.sign({
        id: token.id
    }, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: 30000, // reduzir o tempo em produção
    });

    return res.send({success: true, output: { token: accesstoken }, message: "Ok"});
});

// verifica se o usuario enviou um access token valido
router.use(async (req, res, next) => {
    let sToken = req.headers.authorization;
    if (!sToken) {
        return res.send({success: false, output: 401, message: "Não autenticado!"});
    }

    sToken = sToken.substring(7); // remove 'Bearer '
    let token;

    try {
        token = jwt.verify(sToken, process.env.JWT_SECRET, {
            algorithm: 'HS256'
        });
    } catch (erro) {
        return res.send({success: false, output: 401, message: "Token invalido!"});
    }

    let user = await UsuarioModel.findByPk(token.id);
    req.context = { me: user };
    next();
});


router.get('/logout', async (req, res) => {
    res.clearCookie("refreshtoken", cookiecfg);
    return res.send({success: true, output: "", message: "Logout efetuado com sucesso!"});
});

export default router;