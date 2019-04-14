const mailGremlin = require("nodemailer");
const moment = require("moment");
const { getTeamLogo } = require("../teamLogos");
const fs = require("fs");
const TOKEN_PATH = "token.json";
const CREDENTIALS = "credentials.json";

const rawTokenData = fs.readFileSync(TOKEN_PATH);
const parsedTokenData = JSON.parse(rawTokenData);

const rawCredentials = fs.readFileSync(CREDENTIALS);
const parsedCredentials = JSON.parse(rawCredentials);

module.exports = {
  sendGameUpdate: function(emailData) {
    const data = emailData[0];
    let transporter = mailGremlin.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "nhlgamestats@gmail.com",
        clientId: parsedCredentials.installed.client_id,
        clientSecret: parsedCredentials.installed.client_secret,
        refreshToken: parsedTokenData.refresh_token,
        accessToken: parsedTokenData.access_token
      }
    });
    let mailOptions = {
      from: "nhlgamestats@gmail.com",
      to: "",
      bcc: "yosef.conn@gmail.com",
      subject: `Your update from the game on ${moment(data.gameDate).format("MMM Do YYYY")}. ${
        data.teams.home.team.name
      } vs. ${data.teams.away.team.name}`,
      generateTextFromHTML: true,
      html: `
      <div style="text-align: center;">
        <h1>${gameType(data.gameType)}</h1>
        <div>
          ${getTeamLogo(data.teams.home.team.id)}
        </div>
        <span style="font-size: 18px; font-weight: 800;">vs</span>
        <div>
          ${getTeamLogo(data.teams.away.team.id)}
        </div>
        <article>
          <p>Home: ${data.teams.home.team.name} - ${data.teams.home.score}</p>
          <p>Away: ${data.teams.away.team.name} - ${data.teams.away.score}</p>
          <a href="${data.content}">Game Recap</a>
        </article>
      </div>`
    };
    const mail = transporter.sendMail(mailOptions, function(error, response) {
      if (error) {
        console.log({ error });
      } else {
        sentDate = Date();
        console.log({ msg: "Game update email has been sent" });
      }
      transporter.close();
    });
  },
  sendImAlive: function() {
    let transporter = mailGremlin.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "nhlgamestats@gmail.com",
        clientId: parsedCredentials.installed.client_id,
        clientSecret: parsedCredentials.installed.client_secret,
        refreshToken: parsedTokenData.refresh_token,
        accessToken: parsedTokenData.access_token
      }
    });
    let mailOptions = {
      from: "nhlgamestats@gmail.com",
      to: "",
      bcc: "yosef.conn@gmail.com",
      subject: `Still Going Strong - ${moment(Date.now()).format("MMM Do YYYY")}`,
      generateTextFromHTML: true,
      html: `Still Going Strong - ${moment(Date.now()).format("MMM Do YYYY")}`
    };
    const mail = transporter.sendMail(mailOptions, function(error, response) {
      if (error) {
        console.log({ error });
      } else {
        sentDate = Date();
        console.log({ msg: "I'm alive email has been sent" });
      }
      transporter.close();
    });
  }
};

function gameType(type) {
  return type == "R"
    ? "Regular season"
    : type == "PR"
    ? "Preseason"
    : type == "P"
    ? "Playoffs"
    : "";
}
