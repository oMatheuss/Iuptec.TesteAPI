import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import controllers from './controllers';
import { sequelize } from './uteis/keys';

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
})); // cross origin request
app.use(express.json()); // usa json como resposta default
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // extrai os cookies do header e popula req.cookies

app.use('/', controllers.AuthController);
app.use('/user', controllers.UsuarioController);
app.use('/veic', controllers.VeiculoController);
app.use('/user_veic', controllers.UsuarioVeiculoController);

sequelize.sync().then(() => {
    console.log("Conexão com o banco de dados foi estabelecida com sucesso!");
    
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}!`);
    });

}).catch((erro) => {
    console.error('Impossivel se conectar com o banco de dados:', erro);
});