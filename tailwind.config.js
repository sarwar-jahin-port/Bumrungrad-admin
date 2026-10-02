const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'blue': '#28266F',
      'midnight': '#121063',
      'metal': '#565584',
      'silver': '#ecebff',
      'primary': '#64B76B',
    },
    extend: {},
  },
  plugins: [],
});