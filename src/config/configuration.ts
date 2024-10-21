export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  mongo_db: {
    username: process.env.MONGO_DB_USERNAME,
    password: process.env.MONGO_DB_PASSWORD,
    app_name: process.env.MONGO_DB_APP_NAME,
  },
})
