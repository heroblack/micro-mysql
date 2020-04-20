module.exports = {
  apps: [
    //MICRO AUTENTICACION
    {
      name: "auth",
      script: "./bin/index.js",
      //instances: 2,
      //autorestart: true,
      //max_memory_restart: '2G',
      watch: true,
      env: {
        NODE_ENV: "development",
      },
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    //MICRO DE BASE DATOS
  ],
};
