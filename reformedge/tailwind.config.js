export default {
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7a5af5", // Premium blue-purple
      },
      backgroundImage: {
        "gradient-bg": "linear-gradient(to bottom, #000000, #1A1F2C, #2C1A2C)", // Black to Dark Blue
      },
    },
  },
  plugins: [],
};
