import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from "react-router-dom";
import { AuthProvider } from './context/user_context';
import { PathProvider } from './context/path_context';
import { SelecionadosProvider } from './context/arquivos_selecionados_context';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <PathProvider>
        <SelecionadosProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </SelecionadosProvider>
      </PathProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
  );
