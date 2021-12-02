import {microFrontendClient} from '../App';

export const usemicrofrontendquery = async (query, client = microFrontendClient) => {
  const {data} = await client.query({query});

  return {data}
}
