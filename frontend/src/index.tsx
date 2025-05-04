import React from 'react';
import ReactDOM from 'react-dom/client';
import { ResumeProvider } from './context/ResumeContext';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ResumeProvider>
      <App />
    </ResumeProvider>
  </React.StrictMode>
); 