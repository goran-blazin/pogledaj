const AppConfig = {
  getCDNUrl() {
    // eslint-disable-next-line no-console
    console.log(process.env);
    return process.env.REACT_APP_ASSETS_CDN_URL;
  },
};

export default AppConfig;
