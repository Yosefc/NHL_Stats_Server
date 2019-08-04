const cron = require("node-cron");
const { graphql } = require("graphql");
const schema = require("../schema");
const { sendGameUpdate, sendImAlive } = require("./MailController");
let sentDate = null;
const http = require("http");

cron.schedule("30 * * * *", async () => {
  await graphql(
    schema,
    `
      {
        TodaysSchedule(id: 6) {
          gameType
          gameDate
          content
          status
          teams {
            away {
              score
              team {
                id
                name
              }
            }
            home {
              score
              team {
                id
                name
              }
            }
          }
        }
      }
    `
  ).then(res => {
    if (res.data.TodaysSchedule.length < 1 || res.data.TodaysSchedule[0].status != "Final") {
      console.log("empty");
      return;
    }

    if (
      sentDate !=
      Date()
        .split(" ")
        .slice(1, 4)
        .join(" ")
    ) {
      sentDate = Date()
        .split(" ")
        .slice(1, 4)
        .join(" ");
      sendGameUpdate(res.data.TodaysSchedule);
    }
  });
});

cron.schedule("30 9 * * 0,3", () => {
  sendImAlive();
});

// setInterval(function() {
//   http.get("http://nhl-stats-server.herokuapp.com/graphql");
//   console.log("Getting");
// }, 300000);

setInterval(() => {
  sendImAlive();
}, 60000);
