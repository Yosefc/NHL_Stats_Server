module.exports = {
  getTeamLogo: teamID => {
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
};
