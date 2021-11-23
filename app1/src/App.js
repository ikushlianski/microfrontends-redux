import React from 'react';
import Header from './components/Header';
import Button from './components/Button';
import {Provider} from 'react-redux';

const App = ({title, color, store}) => (
  <Provider store={store}>
    <div style={{margin: '20px'}}>
      {/*<Header title={title} color={color}/>*/}
      <Button/>
    </div>
  </Provider>

);

export default App;
