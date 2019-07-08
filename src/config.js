module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://michael@localhost/capstone1',
  JWT_SECRET: process.env.JWT_SECRET || 'this-is-my-secret-alt',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
  DARKSKY_KEY: process.env.DARKSKY_API_KEY,
  MAPBOX_KEY: process.env.MAPBOX_API_KEY,

}
