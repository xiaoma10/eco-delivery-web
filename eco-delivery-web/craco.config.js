const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              'primary-color': '#007844', 
              'font-family': 'Roboto', 
              'text-color': '#4f4f4f', 
              'heading-color': '#4f4f4f',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}