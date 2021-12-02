import React, {useEffect} from 'react';
import Button from './components/Button';
import {Provider} from 'react-redux';
import {
  ApolloClient,
  ApolloProvider, gql,
  InMemoryCache, useLazyQuery,
  useQuery
} from '@apollo/client';
import {usemicrofrontendquery} from './hooks/usemicrofrontendquery';

export const microFrontendClient = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache: new InMemoryCache({
    typePolicies: { // Type policy map
      User: {
        fields: {
          name: {
            read(){
              console.log('HEEEEEEE')
              return 'ilya'
            }
          },
          id: {
            read() {
              return '3333333'
            }
          }
        }

        // fields: { // Field policy map for the Product type
        //   isInCart: { // Field policy for the isInCart field
        //     read(_, { variables }) { // The read function for the isInCart field
        //       return localStorage.getItem('CART').includes(
        //         variables.productId
        //       );
        //     }
        //   }
        // }
      }
    }
  })
});

const App = ({title, color, store}) => {


  const ALBUM = gql`
    {
  user(id: "1") {
    id @client
    name @client
  }
}
  `;

  const loadAlbums = async () => {
    const {data} = await usemicrofrontendquery(ALBUM)

    console.log('DATA FROM GRAPH - MICRO-FRONTEND', data);
  }



  return (

      <Provider store={store}>
        <div style={{margin: '20px'}}>
          <button onClick={loadAlbums}>Load albums (micro-frontend)</button>
          <Button/>
        </div>
      </Provider>
  );
};

export default App;
