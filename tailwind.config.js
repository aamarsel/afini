/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    content: ["./src/**/*"],
    theme: {
      extend: {},
    },
    safelist: [
      'bg-green-500', 'bg-red-500', 'rounded-lg'
    ],
    plugins: [],
};