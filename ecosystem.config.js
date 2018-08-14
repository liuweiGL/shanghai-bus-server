module.exports = {
  apps: [
    {
      name: 'shanghai-bus-server',
      script: './start.js',
      instances: 2,
      merge_logs: true,
      exec_mode: 'cluster',
      max_memory_restart: '300M',
      log: true,
      watch: false,
      env: {
        NODE_ENV: 'production' // development
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    // 自动发布
    production: {
      user: '',
      host: 'liuweigl.cn',
      ref: 'origin/master',
      repo: 'git@github.com:liuweiGL/shanghai-bus-server.git',
      path: '/opt/shanghai-bus/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
