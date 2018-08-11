module.exports = {
  apps: [
    {
      name: 'shanghai-bus-server',
      script: './start.js',
      instances: 2,
      merge_logs: true,
      exec_mode: 'cluster',
      max_memory_restart: '300M',
      watch: false,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'liuweigl',
      host: 'liuweigl.cn',
      ref: 'origin/master',
      repo: 'git@github.com:liuweiGL/shanghai-bus-server.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
