module.exports = {
  app: [{
    name: 'accountApi',
    script: './index.js',
    instances: 1,
    exec_mode: 'cluster',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    error_file: '/nodeApps/logs/accountApi/err.log',
    out_file: '/nodeApps/logs/accountApi/out.log',
    watch: false,
    env: {
      "PORT": 9051,
      ORACLE_USER: 'system',
      ORACLE_PASS: 'manager',
      ORACLE_CONN_STR: '10.20.21.15:1625/CWG11',
      FI_URL: 'http://localhost:3100/token/verify'
    }
  }]
}