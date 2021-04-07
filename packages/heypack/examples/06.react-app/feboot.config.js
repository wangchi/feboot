module.exports = {
  css: {
    autoprefixer: {
      overrideBrowserslist: [
        '> 1%',
        'last 3 versions',
        'iOS >= 8',
        'Android >= 4',
        'Chrome >= 40',
      ],
    },
  },
  presets: ['@feboot/preset-react'],
  // presets: ['../../../feboot-preset-react'],
  // presets: [['@feboot/preset-react', {}]],
};
