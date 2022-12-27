export default () => ({
  port: parseInt(process.env.APP_LISTEN_PORT || '8080', 10),
  database: {
    URL: process.env.DATABASE_URL as string,
  },
});
