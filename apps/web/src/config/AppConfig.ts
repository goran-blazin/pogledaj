const config = {
  CDNUrl: 'http://pogledaj.rs:3008',
};

const AppConfig = {
  getCDNUrl() {
    return config.CDNUrl + '/';
  },
};

export default AppConfig;
