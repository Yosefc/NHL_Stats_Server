const mailGremlin = require("nodemailer");
const moment = require("moment");
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
  sendImAlive: function(emailData) {
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

function getTeamLogo(teamID) {
  const teamLogos = {
    24: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Ducks_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    53: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Coyotes_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    6: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Bruins_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    7: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Sabres_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    20: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/calgary.png" height="42" width="42" style="object-fit: contain;">`,
    12: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/carolina.png" height="42" width="42" style="object-fit: contain;">`,
    16: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/chicago.png" height="42" width="42" style="object-fit: contain;">`,
    21: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/colorado.png" height="42" width="42" style="object-fit: contain;">`,
    29: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_BlueJackets_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    25: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Stars_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    17: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/detroit.png" height="42" width="42" style="object-fit: contain;">`,
    22: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Oilers_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    13: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Panthers_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    26: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Kings_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    30: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Wild_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    8: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/montreal.png" height="42" width="42" style="object-fit: contain;">`,
    18: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Predators_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    1: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/newjersey.png" height="42" width="42" style="object-fit: contain;">`,
    2: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NY-Islanders-Primary.png" height="42" width="42" style="object-fit: contain;">`,
    3: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/newyorkr.png" height="42" width="42" style="object-fit: contain;">`,
    9: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Senators_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    4: `<img src="http://www.stickpng.com/assets/images/5a4fbba3da2b4f099b95da1a.png" height="42" width="42" style="object-fit: contain;">`,
    5: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Penguins_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    28: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Sharks_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    19: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/stlouis.png" height="42" width="42" style="object-fit: contain;">`,
    14: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Lightning_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    10: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_MapleLeafs_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    23: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/Vancouver_Canucks.png" height="42" width="42" style="object-fit: contain;">`,
    15: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Capitals_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    52: `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Jets_Primary.png" height="42" width="42" style="object-fit: contain;">`,
    54: `<img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Vegas_Golden_Knights_logo.svg/220px-Vegas_Golden_Knights_logo.svg.png" height="42" width="42" style="object-fit: contain;">`
  };

  return teamLogos[teamID];
}
