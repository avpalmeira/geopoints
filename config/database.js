module.exports = {
  development: {
    username: "geopoints",
    password: "987654",
    database: "geopoints",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres"
  }
}
