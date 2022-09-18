module.exports = {
    darkMode: 'class',
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                fluid: 'repeat(auto-fit, minmax(26rem, 1fr))',
            },
            keyframes: {
                slideInFromBottom: {
                    '0%': {
                        transform: 'translateY(2rem)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'translateY(0rem)',
                        opacity: '1',
                    },
                },
                textFocus: {
                    '0%': {
                        filter: 'blur(12px)',
                        opacity: '0',
                    },
                    '100%': {
                        filter: 'blur(0px)',
                        opacity: '1',
                    },
                },
                fadeIn: {
                    '0%': {
                        opacity: '0',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
                jumpingDots: {
                    '10%': {
                        transform: 'translateY(0px)',
                    },
                    '50%': {
                        transform: 'translateY(-20px)',
                    },
                },
            },
            animation: {
                slideInFromBottom: 'slideInFromBottom 0.15s ease-in-out',
                textFocus: 'textFocus 0.8s ease-in-out',
                fadeIn: 'fadeIn 0.5s ease-in-out',
            },
        },
    },
    plugins: [],
}
