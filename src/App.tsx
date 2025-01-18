import { ToastContainer } from 'react-toastify';
import AppRouter from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { AppContext } from './context/app.context';
import { localStorageEventTarget } from './util/auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NextUIProvider } from '@nextui-org/react';

const CLIENT_ID = import.meta.env.VITE_GG_CLIENT_ID;

function App() {
  const { reset } = useContext(AppContext);

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset);
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset);
    };
  }, [reset]);

  return (
    <NextUIProvider>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <AppRouter />
        <ToastContainer />
      </GoogleOAuthProvider>
    </NextUIProvider>
  );
}

export default App;
