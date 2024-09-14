const isLandscape = () => {
  if (window.innerHeight > window.innerWidth) {
    return false;
  } else {
    return true;
  }
};

export {isLandscape};
