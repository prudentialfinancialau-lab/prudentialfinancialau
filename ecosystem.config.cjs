module.exports = {
  apps: [
    {
      name: 'loan-site',
      script: 'server/production-server.cjs',
      cwd: '/var/www/development/upwork/loan-web/loan-site',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
