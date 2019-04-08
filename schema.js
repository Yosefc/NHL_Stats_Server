const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require("graphql");

const TeamsType = new GraphQLObjectType({
  name: "Teams",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});

const GameTeamsType = new GraphQLObjectType({
  name: "GameTeams",
  fields: () => ({
    away: { type: GamesAwayType },
    home: { type: GamesHomeType }
  })
});

const GamesAwayType = new GraphQLObjectType({
  name: "GamesAway",
  fields: () => ({
    leagueRecord: { type: LeagueRecordType },
    score: { type: GraphQLString },
    team: { type: TeamsType }
  })
});

const GamesHomeType = new GraphQLObjectType({
  name: "GamesHome",
  fields: () => ({
    leagueRecord: { type: LeagueRecordType },
    score: { type: GraphQLString },
    team: { type: TeamsType }
  })
});

const LeagueRecordType = new GraphQLObjectType({
  name: "LeagueRecord",
  fields: () => ({
    wins: { type: GraphQLString },
    loses: { type: GraphQLString }
  })
});

const GameContentType = new GraphQLObjectType({
  name: "GameContent",
  fields: () => ({
    link: { type: GraphQLString }
  })
});

const GameRecap = new GraphQLObjectType({
  name: "GameRecap",
  fields: () => ({
    href: { type: GraphQLString },
    type: {
      type: GraphQLString
    }
  })
});

const VenueType = new GraphQLObjectType({
  name: "Venue",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});

const GamesType = new GraphQLObjectType({
  name: "Games",
  fields: () => ({
    gamePk: { type: GraphQLInt },
    gameType: { type: GraphQLString },
    gameDate: { type: GraphQLString },
    status: {
      type: GraphQLString,
      resolve: ({ status: { detailedState } }) => detailedState
    },
    teams: { type: GameTeamsType },
    venue: { type: VenueType },
    content: {
      type: GraphQLString,
      resolve: ({ content: { link } }) => {
        return new Promise(async (resolve, reject) => {
          try {
            const hrefs = [];
            await axios.get(`https://statsapi.web.nhl.com${link}`).then(response => {
              //TODO: Need to add a check if "tokenData" exist. Otherwise, I get an error(TypeError: Cannot read property 'tokenData' of undefined) ob line below.
              for (let el in response.data.editorial.recap.items[0].tokenData) {
                if (response.data.editorial.recap.items[0].tokenData[el].hasOwnProperty("href")) {
                  hrefs.push({
                    href: response.data.editorial.recap.items[0].tokenData[el]["href"],
                    type: response.data.editorial.recap.items[0].tokenData[el]["type"]
                  });
                }
              }
            });
            // if (hrefs.length < 1) {
            //   reject(console.log("Did get results.."));
            // } else {
            resolve(hrefs.find(h => h.type === "hyperLink").href);
            // }
          } catch (error) {
            console.log({ error });
          }
        });
      }
    }
  })
});

const FullScheduleByTeamType = new GraphQLObjectType({
  name: "FullScheduleByTeam",
  fields: () => ({
    gameType: { type: GraphQLString },
    gameDate: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    teams: {
      type: new GraphQLList(TeamsType),
      resolve(parent, args) {
        return axios.get(`https://statsapi.web.nhl.com/api/v1/teams`).then(res => res.data.teams);
      }
    },
    team: {
      type: new GraphQLList(TeamsType),
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`https://statsapi.web.nhl.com/api/v1/teams`)
          .then(res => res.data.teams.filter(team => team.id == args.id));
      }
    },
    games: {
      type: new GraphQLList(GamesType),
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        const href = [];
        return axios
          .get(
            `https://statsapi.web.nhl.com/api/v1/schedule?teamId=${
              args.id
            }&startDate=2018-10-03&endDate=2019-04-03`
          )
          .then(res =>
            res.data.dates.map(game => {
              return game.games[0];
            })
          );
      }
    },
    scheduledGames: {
      type: new GraphQLList(GamesType),
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://statsapi.web.nhl.com/api/v1/schedule?teamId=${
              args.id
            }&startDate=2018-10-01&endDate=2019-05-30`
          )
          .then(res => {
            const futureGames = res.data.dates.filter(
              game => game.games[0].status.detailedState == "Scheduled"
            );
            return futureGames.map(game => game.games[0]);
          });
      }
    },
    TodaysSchedule: {
      type: new GraphQLList(GamesType),
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://statsapi.web.nhl.com/api/v1/schedule?teamId=${args.id}`)
          .then(res => res.data.dates.map(game => game.games[0]));
      }
    },
    FullScheduleByTeam: {
      type: new GraphQLList(FullScheduleByTeamType),
      args: {
        id: { type: GraphQLInt },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://statsapi.web.nhl.com/api/v1/schedule?teamId=${args.id}&startDate=${
              args.startDate
            }&endDate=${args.endDate}`
          )
          .then(res => res.data.dates.map(game => game.games[0]));
      }
    },
    GetVideo: {
      type: GameRecap,
      aGameRecap: {
        gameId: { type: GraphQLInt }
      },
      async resolve(parent, { gameId }) {
        const hrefs = [];
        await axios.get(`https://statsapi.web.nhl.com/api/v1/game/${gameId}/content`).then(res => {
          for (let a in res.data.editorial.recap.items[0].tokenData) {
            if (res.data.editorial.recap.items[0].tokenData[a].hasOwnProperty("href")) {
              hrefs.push({
                href: res.data.editorial.recap.items[0].tokenData[a]["href"],
                type: res.data.editorial.recap.items[0].tokenData[a]["type"]
              });
            }
          }
        });
        return hrefs.find(h => h.type === "hyperLink");
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
