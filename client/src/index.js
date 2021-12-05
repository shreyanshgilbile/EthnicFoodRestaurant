import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import allReducers from "./reducers";
import 'bootstrap-icons/font/bootstrap-icons.css';


const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const persistor = persistStore(store)


ReactDOM.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <React.Fragment>
    <App />
  </React.Fragment>
  </PersistGate>  
  </Provider>,
  document.getElementById('root')
);


