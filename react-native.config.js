//const ios = require('@react-native-community/cli-platform-ios');
//const android = require('@react-native-community/cli-platform-android');

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  dependencies: {
    'react-native-google-cast': {
      platforms: {
        ios: null, // this will disable autolinking for this package on iOS
      },
    },
  },
};
