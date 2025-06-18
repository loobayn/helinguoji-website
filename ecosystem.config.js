module.exports = {
  apps: [
    {
      name: 'helinguoji-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'helinguoji-backend',
      cwd: './backend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        MONGO_URI: 'mongodb://localhost:27017/helinguoji',
        JWT_SECRET: 'your-jwt-secret-key',
        JWT_EXPIRES_IN: '7d'
      }
    }
  ]
}; 