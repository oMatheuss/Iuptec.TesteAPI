import { Sequelize } from 'sequelize';

module.exports.sequelize = new Sequelize(
	process.env.DATABASE,
	process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
	{
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'postgres',
		logging: false,
    }
);

module.exports.cookiecfg = {
	httpOnly: process.env.COOKIE_HTTP_ONLY === 'true',
	sameSite: process.env.COOKIE_SAME_SITE,
	secure: process.env.COOKIE_SECURE === 'true'
}