import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

import './i18n';
import 'virtual:svg-icons-register'; // Build SVG Sprite Sheet in the HTML

import './styles/globals.scss';
import './styles/tabler-icons.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
