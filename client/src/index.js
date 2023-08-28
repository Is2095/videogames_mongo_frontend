
import { StrictMode } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';

import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_LOCAL
//axios.defaults.baseURL = 'http://pivideogames-production-7b6b.up.railway.app' 


const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>
)


