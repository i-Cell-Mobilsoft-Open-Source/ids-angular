/** @type {import('tailwindcss').Config} */
const tailwindTokens = require('./tailwind-tokens');


module.exports = {
  content: ["./projects/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        ...tailwindTokens.colors,
      },
      spacing: {
        ...tailwindTokens.spacing,
      },
      borderRadius: {
        ...tailwindTokens.borderRadius,
      },
      fontSize: {
        '3xl': ['1.75rem', {
          lineHeight: '1.218',
          letterSpacing: '0rem',
          fontWeight: '400',
        }],
        '5xl': ['12rem', {
          lineHeight: '1.15',
          letterSpacing: '0rem',
          fontWeight: '700',
        }],
        'display-xlarge': [ 'var(--ids-smc-reference-typography-font-size-72);', {
          lineHeight: 'normal',
          letterSpacing: '0rem;',
          fontWeight: '500',
        }],    
        'display-large': ['var(--ids-smc-reference-typography-font-size-48);', {
          lineHeight: '4rem;',
          letterSpacing: '-0.01563rem;',
          fontWeight: '400',
        }],    
        'display-medium': ['2.8125rem', {
          lineHeight: '3.25rem;',
          letterSpacing: '0rem;',
          fontWeight: '400',
        }],  
        'display-medium-prominent': ['var(--ids-smc-layout-typography-display-font-size-medium);', {
          lineHeight: '3.25rem;',
          letterSpacing: '0rem;',
          fontWeight: '700',
          textTransform: 'uppercase'
        }],             
        'display-small': ['2.25rem', {
          lineHeight: '2.75rem;',
          letterSpacing: '0rem;',
          fontWeight: '400',
        }],          
        'headline-large': ['2rem', {
          lineHeight: '2.5rem;',
          letterSpacing: '0rem;',
          fontWeight: '400',
        }],  
        'headline-large-prominent': ['2rem', {
          lineHeight: '2.5rem;',
          letterSpacing: '0rem;',
          fontWeight: '700',
          texTransform: 'uppercase'
        }],   
        'headline-medium-prominent': ['1.75rem', {
          lineHeight: '2.25rem;',
          letterSpacing: '0rem;',
          fontWeight: '700',
        }],           
        'headline-medium': ['1.75rem', {
          lineHeight: '2.25rem;',
          letterSpacing: '0rem;',
          fontWeight: '400',
        }],     
        'headline-small': ['1.5rem', {
          lineHeight: '2rem;',
          letterSpacing: '0rem;',
          fontWeight: '400',
        }],   
        'headline-small-prominent': ['1.5rem', {
          lineHeight: '2rem;',
          letterSpacing: '0rem;', 
          fontWeight: '600',
        }],          
        'title-large': ['1.375rem', {
          lineHeight: '1.75rem;',
          letterSpacing: '0rem;',
          fontWeight: '400',
        }],   
        'title-sm-large': ['1.25rem', {
          lineHeight: '1.625rem',
          letterSpacing: '0rem;',
          fontWeight: '700',
        }],   
        'title-medium-prominent': ['1rem', {
          lineHeight: '1.5rem;',
          letterSpacing: '0.00938rem;',
          fontWeight: '600',
        }],  
        'title-medium': ['1rem', {
          lineHeight: '1.5rem;',
          letterSpacing: '0.00938rem;',
          fontWeight: '500',
        }],           
        'title-small': ['0.875rem', {
          lineHeight: '1.25rem;',
          letterSpacing: '0.00625rem;',
          fontWeight: '500',
        }],           
        'body-large': ['1rem', {
          lineHeight: '1.5rem',
          letterSpacing: '0.03125rem;',
          fontWeight: '400',
        }],   
        'body-large-extra-prominent': ['1rem', {
          lineHeight: '1.5rem',
          letterSpacing: '0.03125rem;',
          fontWeight: '700',
        }],           
        'body-medium': ['0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '0.015625rem',
          fontWeight: '400',
        }],     
        'body-small': ['0.75rem', {
          lineHeight: '1rem',
          letterSpacing: '0rem',
          fontWeight: '400',
        }],
        'label-large-extra-prominent': [' 0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '0.00625rem',
          fontWeight: '700',
        }],  
        'label-xlarge-prominent': [' 1.125rem;', {
          lineHeight: '1.5rem',
          letterSpacing: '0',
          fontWeight: '700',
        }],  
        'label-large': [' 0.875rem', {
          lineHeight: '1.25rem',
          letterSpacing: '0.00625rem',
          fontWeight: '500',
        }],  
        'label-medium-prominent': [' 0.75rem', {
          lineHeight: '1rem',
          letterSpacing: '0.03125rem',
          fontWeight: '600',
        }],    
        'label-medium': [' 0.75rem', {
          lineHeight: '1rem',
          letterSpacing: '0.03125rem',
          fontWeight: '400',
        }],          
        'label-small': ['0.6875rem;', {
          lineHeight: '1rem',
          letterSpacing: '0.03125rem',
          fontWeight: '500',
        }],            
      }, 
    },
  },
  plugins: [],
};
