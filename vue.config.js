module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.example.app',
        productName: 'work-assistant',
        directories: {
          output: './dist',
        },
      },
      externals: ['lowdb', 'lodash-id', 'fs-extra', 'axios'],
      win: {
        target: [
          {
            target: 'nsis',
            arch: [
              'x64',
            ],
          },
        ],
      },
      nsis: {
        oneClick: false,
        allowElevation: true,
        allowToChangeInstallationDirectory: true,
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: "http://116.62.47.177:3000",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
