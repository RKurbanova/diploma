import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'

import { store } from './store'
import { IonReactRouter } from '@ionic/react-router';

ReactDOM.render(
  <React.StrictMode>
    <IonReactRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </IonReactRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
