const assert = require('assert');
const app = require('../../src/app');

describe('\'userProfiles\' service', () => {
  it('registered the service', () => {
    const service = app.service('userProfiles');

    assert.ok(service, 'Registered the service (userProfiles)');
  });
});
