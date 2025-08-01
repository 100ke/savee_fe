/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // CRA 프로젝트 내에서 Tailwind 적용할 파일 경로
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // DaisyUI 플러그인 등록
};
