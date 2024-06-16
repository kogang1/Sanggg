const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');
const fetch = require('cross-fetch');

// 환경 변수에서 GraphQL 엔드포인트 가져오기
const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;

const client = new ApolloClient({
  uri: graphqlEndpoint,
  cache: new InMemoryCache(),
  fetch
});

const MY_QUERY = gql`
query MyQuery {
  Socials(
    input: {
      filter: {
        dappName: {_eq: farcaster}
      },
      blockchain: ethereum,
      order: {socialCapitalScore: DESC},
      limit: 200
    }
  ) {
    Social {
      profileName
      fid: userId
      custodyAddress: userAddress
      connectedAddresses {
        address
        blockchain
      }
      socialCapital {
        socialCapitalScore
      }
    }
  }
}
`;

client.query({
  query: MY_QUERY
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});
