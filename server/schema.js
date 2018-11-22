const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

// Cryptocurrencies

const CoinType = new GraphQLObjectType({
  name: "Coin",
  fields: () => ({
    name: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    coins: {
      type: new GraphQLList(CoinType),
      resolve(parent, args) {
        return axios
          .get("https://api.coinmarketcap.com/v2/ticker/?limit=10")
          .then(res => {
            console.log("DATAAA", res.data);
            return res.data;
          })
          .catch(err => console.log("ERROR", err));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
