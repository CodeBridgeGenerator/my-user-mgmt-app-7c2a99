const { UserProfiles } = require('./userProfiles.class');
const createModel = require('../../models/userProfiles.model');
const hooks = require('./userProfiles.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/userProfiles', new UserProfiles(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('userProfiles');

  service.hooks(hooks);
};