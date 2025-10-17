module.exports = {
  apps: [
    {
      name: 'tinacms-app',
      script: 'npm',
      args: 'run dev',
      cwd: '/var/www/development/upwork/loan-web/tinacms-app',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
