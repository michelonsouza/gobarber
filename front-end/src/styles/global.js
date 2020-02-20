import { createGlobalStyle } from 'styled-components';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased !important;
  }

  *:focus {
    outline: 0;
  }

  body, html, #root {
    height: 100%;
  }

  body, input, button {
    -webkit-font-smoothing: antialiased !important;
    font: 14px Roboto, Arial, Helvetica, sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  .switch-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .switch-wrapper > div {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
