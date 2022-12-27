const Utils = {
  delay(time: number, value = null, rejectDelay = false): Promise<unknown> {
    return new Promise(function (resolve, reject) {
      const callback = rejectDelay ? reject : resolve;
      setTimeout(callback.bind(null, value), time);
    });
  },
  browserInfo: (function (): {name: string; version: string} {
    const ua = navigator.userAgent;
    let tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return {name: 'IE', version: tem[1] || ''};
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem !== null) return {name: tem[1].replace('OPR', 'Opera'), version: tem[2]};
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]);
    return {name: M[0], version: M[1]};
  })(),
  isBetaMode() {
    return parseInt(window.localStorage.getItem('betaMode') || '') === 1;
  },
};

export default Utils;
