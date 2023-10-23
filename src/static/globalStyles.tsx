import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body {
    font-family: 'Sora', sans-serif;
    background:${(props) => props.theme.background[400]};
    margin: 0;
  }

  button, input {
    font-family: inherit;
  }

@media only screen and (min-width: 450px) {
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #1F1F21;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    border: 1px solid #5F5B6C;
    background: #1F1F21;
    
    border-radius: 5px;
    
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #5F5B6C;
  }

      /* Hide scroll for orderbook - bit too obtrusive */
  * {
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
      display: none;
    }
  }
}

  /* 
   * CSS for react-toastify
   */
  .Toastify__toast-container {
    z-index: 2147483648; /* make it higher than discord widget bot */
  }

  .Toastify__toast-icon {
    width: 24px;
  }

  .Toastify__toast-body {
    margin: 0;
    padding: 0;
    height: auto;
  }

  .Toastify__toast-body > div {
    height: 100%;
  }

  .Toastify__toast {
    margin: 0;
    padding: 0;
    margin-top: 0.5rem;
    min-height: 41px;
  }

  .Toastify__progress-bar--info {
    background: #17D3FF;
  }
  .Toastify__progress-bar--success {
    background: #66D370;
  }
  .Toastify__progress-bar--warning {
    background: #F4F674;
  }
  .Toastify__progress-bar--error {
    background: #FF6161;
  }

  /* walletconnect modal z-index */
  wcm-modal {
    z-index: 101;
    position: relative;
  }
`;
