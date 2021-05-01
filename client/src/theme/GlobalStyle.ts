import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    outline-color: hsl(231, 61%, 45%);
  }
  
  html {
    font-size: 62.5%; 
  }
  
  body {
    font-size: 1.6rem;
    font-family: 'Source Sans Pro', sans-serif;
    color: hsl(0, 0%, 82%);
    background-color: hsl(220, 9%, 13%);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
  }
`;

export default GlobalStyle;
