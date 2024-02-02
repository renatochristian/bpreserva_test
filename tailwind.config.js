/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
		extend: {
			colors: {
				azul: "#114881",
				// Using modern `rgb`
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
			  },
		},
	},
    plugins: []
}
