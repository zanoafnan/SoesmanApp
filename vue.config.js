module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost/soesmanproject/pages-login-api.php', 
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
      },
    },
  };
  