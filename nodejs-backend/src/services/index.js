const users = require("./users/users.service.js");
const userProfiles = require("./userProfiles/userProfiles.service.js");
const roles = require("./roles/roles.service.js");
const positions = require("./positions/positions.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
  app.configure(userProfiles);
  app.configure(roles);
  app.configure(positions);
    // ~cb-add-configure-service-name~
};
