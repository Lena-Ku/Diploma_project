const {
  MONGO_URL = 'mongodb://localhost:27017/diplomadb',
  JWT_SECRET = 'dev-secret',
  NODE_ENV = 'production',
  PORT = 3000,
} = process.env;

module.exports = {
  MONGO_URL,
  JWT_SECRET,
  NODE_ENV,
  PORT,
};
