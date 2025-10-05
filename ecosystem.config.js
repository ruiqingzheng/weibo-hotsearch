module.exports = {
  apps: [{
    name: 'weibo-hotsearch-api',
    script: 'dist/index.js', // 运行编译后的JS文件
    cwd: './', // 替换为你的项目实际路径
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'development',
      PORT: 13000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 13000
    },
    error_file: './pm2/weibo-hotsearch-api-error.log',
    out_file: './pm2/weibo-hotsearch-api-out.log',
    log_file: './pm2/weibo-hotsearch-api-combined.log',
    time: true,
    // 重启策略
    min_uptime: '30s',
    max_restarts: 10,
    restart_delay: 5000,
    // 优雅重启设置
    kill_timeout: 5000,
    listen_timeout: 3000
  }]
};