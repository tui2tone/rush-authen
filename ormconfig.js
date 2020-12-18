require('dotenv').config();
require('module-alias/register');

module.exports = {
    type: 'postgres',
    url: process.env.DB_URL || "postgres://admin:password@localhost:2345/authen-dev",
    synchronize: false,
    logging: false,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/**/*.js'],
    subscribers: ['dist/subscribers/**/*.js'],
    cli: {
        entitiesDir: 'dist',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers',
    },
    seeds: ['dist/seeds/**/*.seed.js'],
};