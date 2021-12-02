import React from 'react';
import {Provider, useSelector} from 'react-redux';
import {createStore} from 'redux';
import {
  ApolloCache,
  ApolloClient,
  ApolloProvider,
  gql, InMemoryCache, useLazyQuery,
  useQuery
} from '@apollo/client';

const HeaderApp1 = React.lazy(() => import('app1/App'));

const initialState = {
  name: "ilya",
  value: 0
};

const rootReducer = (state = initialState, action) => {
  if (action.type==="DECREMENT") {
    return {
      ...state,
      value: state.value - 1
    };
  }

  if (action.type==="INCREMENT") {
    return {
      ...state,
      value: state.value + 1,
    };
  }

  return state;
};

const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const App = () => {
  const value = useSelector((state) => state.value);

  const WEATHER = gql`
    {
  getCityByName(name: "Hamburg") {
    name,
    country
  }
}
  `;

  const [loadWeather, {data}] = useLazyQuery(WEATHER);

  console.log('DATA FROM GRAPH - PARENT', data);

  return (
    <div style={{margin: '20px'}}>
      <p>This is a HOST application</p>
      <p>Counter is {value}</p>

      Load weather: <button onClick={() => loadWeather()}>Load weather</button>

      <p>And below will be the microfrontend app</p>

      <React.Suspense fallback="Loading header...">
        <HeaderApp1 store={store} title="Title App 2" color="#bf41b7"/>
      </React.Suspense>

    </div>
  );
};

const client = new ApolloClient({
  uri: 'https://graphql-weather-api.herokuapp.com/',
  cache: new InMemoryCache()
});


export default () => (
  <ApolloProvider
    client={client}
  >
    <Provider store={store}>
      <App/>
    </Provider>
  </ApolloProvider>
)

