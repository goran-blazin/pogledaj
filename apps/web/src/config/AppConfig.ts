const AppConfig = {
  getCDNUrl() {
    return import.meta.env.VITE_ASSETS_CDN_URL;
  },
};

export default AppConfig;
