import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="bottom-left" autoClose={2000} />
  </Provider>,
);
