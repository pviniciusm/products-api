require('dotenv/config');

module.exports = {
    type: "postgres",
    host: "ec2-52-20-143-167.compute-1.amazonaws.com",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "d2of6ib79e96id",
    entities: [
        'src/database/entities/**/*.ts'
    ],
    cli: {
        entitiesDir: 'src/database/entities'
    },
    synchronize: false,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
};
