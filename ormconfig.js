require('dotenv').config();
require('module-alias/register');

module.exports = {
    type: 'postgres',
    url: process.env.DB_URL,
    synchronize: true,
    logging: false,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migration/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
    cli: {
        entitiesDir: 'dist',
        migrationsDir: 'dist/migration',
        subscribersDir: 'dist/subscriber',
    },
    seeds: ['dist/seeds/**/*.seed.js'],
};