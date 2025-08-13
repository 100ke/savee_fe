/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // CRA 프로젝트 내에서 Tailwind 적용할 파일 경로
    "./public/index.html", // HTML 포함
  ],
  theme: {
    extend: {
      colors: {
        main: "#5cb0ff",
        "main-lightest": "#c1e8ff",
        "main-dark": "#5c92ef",
        accent: "#422ef4",
      },
    },
  },
  plugins: [require("daisyui")], // DaisyUI 플러그인 등록
};
