export default {
  className2Classes: (className: string) => {
    return `.${className.split(" ").join(".")}`;
  },
};
