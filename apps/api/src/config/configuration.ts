export default () => ({
  port: parseInt(process.env.APP_LISTEN_PORT, 10) || 3000,
  database: {
    URL: process.env.DATABASE_URL,
  },
});
