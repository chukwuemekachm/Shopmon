require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || 'shopmon-dev',
    port: process.env.DB_PORT || 5432,
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  test: {
    use_env_variable: 'DATABASE_URL',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
