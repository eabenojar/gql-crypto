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
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    rocket: { type: RocketType }
  })
});

const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString }
  })
});

const MissionId = new GraphQLObjectType({
  name: "MissionId",
  fields: () => ({})
});
const MissionType = new GraphQLObjectType({
  name: "Mission",
  fields: () => ({
    mission_name: { type: GraphQLString },
    mission_id: { type: GraphQLString },
    payload_ids: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    launches: {
      type: CoinType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => {
            return res.data;
          })
          .catch(err => console.log("ERROR", err));
      }
    },
    mission: {
      type: MissionType,
      args: {
        mission_id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/missions/${args.mission_id}`)
          .then(res => {
            console.log("MISSIONS", res.data);
            return res.data;
          })
          .catch(err => console.log("Error"));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
