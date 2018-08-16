module.exports = {
  apps: [
    {
      name: 'shanghai-bus-server',
      script: './bin/www',
      instances: 1,
      exec_mode: 'cluster',
      max_memory_restart: '300M',
      output: './logs/out.log',
      error: './logs/error.log',
      log: false,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
      watch: false,
      kill_timeout: 1500,
      autorestart: true,
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
