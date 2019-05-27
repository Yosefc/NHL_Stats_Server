const { getTeamLogo } = require("../teamLogos");

describe("Team Logos", () => {
  test("Should return a strimg", () => {
    expect(getTeamLogo(9)).toBe(
      `<img src="http://www.capsinfo.com/images/NHL_Team_Logos/NHL_Senators_Primary.png" height="42" width="42" style="object-fit: contain;">`
    );
  });

  test("Image src should match NHL_Senators_Primary", () => {
    expect(getTeamLogo(9)).toMatch(/NHL_Senators_Primary/);
  });

  test("Should return an img tag", () => {
    expect(getTeamLogo(54)).toMatch(/(<img)|(>$)/g);
  });
});
