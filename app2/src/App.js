import React from 'react';
import {Provider, useSelector} from 'react-redux';
import {createStore} from 'redux';

const HeaderApp1 = React.lazy(() => import('app1/App'));

const initialState = {
  name: "ilya",
  value: 0
}

const rootReducer = (state = initialState, action) => {
  if (action.type === "DECREMENT") {
    return {
      ...state,
      value: state.value - 1
    }
  }

  if (action.type === "INCREMENT") {
    return {
      ...state,
      value: state.value + 1,
    }
  }

  return state
}

const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const App = () => {
  const value = useSelector((state) => state.value)

  return (
      <div style={{margin: '20px'}}>
        <React.Suspense fallback="Loading header...">
          <p>This is a HOST application</p>
          <p>Counter is {value}</p>

          <p>And below will be the microfrontend app</p>
          <HeaderApp1 store={store} title="Title App 2" color="#bf41b7"/>
        </React.Suspense>
      </div>
  )
}



export default () => <Provider store={store}>
<App /> </Provider>

