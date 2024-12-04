export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  mongo_db: {
    username: process.env.MONGO_DB_USERNAME,
    password: process.env.MONGO_DB_PASSWORD,
    app_name: process.env.MONGO_DB_APP_NAME,
    database_name: process.env.MONGO_DB_DATABASE_NAME,
  },
  jwt: {
    access_token_secret: process.env.ACCESS_TOKEN_SECRECT,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRECT,
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
})
