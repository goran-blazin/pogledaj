export default () => ({
    port: parseInt(process.env.APP_LISTEN_PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    }
});