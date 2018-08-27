module.exports = {
  apps : [{
    name      : 'FundacionParadeportes',
    script    : './server.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '66.97.34.214',
      key  : '~/.ssh/id_rsa.pub',
      ref  : 'origin/master',
      repo : 'git@github.com:migueljrojas/fundacion-paradeportes-front.git',
      path : '/home/admin/web/fundacionparadeportes.org/public_html',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
