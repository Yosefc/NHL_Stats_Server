const express = require("express");
const expressGraphQL = require("express-graphql");
const PORT = process.env.PORT || 4000;
const schema = require("./schema");
require("./MailController");
const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
