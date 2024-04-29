import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import './App.css';
import MainView from './views/MainView';

function App() {
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
}

export default App;
