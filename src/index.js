import React from 'react';
import ReactDom from 'react-dom';
import { SpeechProvider} from '@speechly/react-client';
import {Provider} from './context/context'
import App from './App';
import './index.css';

ReactDom.render(
  <SpeechProvider appId="87396b7e-8e21-4057-a040-d0684ee8f7ed" language="en-US">
  <Provider>
       <App/>
  </Provider>
  </SpeechProvider>,

document.getElementById('root'));