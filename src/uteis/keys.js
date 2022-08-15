import { Sequelize } from 'sequelize';

module.exports.sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
    });