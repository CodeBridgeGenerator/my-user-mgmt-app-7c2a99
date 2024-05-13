const path = require('path');
const cwd = path.basename(path.resolve(process.cwd()));

module.exports = {
    apps: [
        {
            name: 'my-user-mgmt-app',
            script: 'src/',
            instance_var: 'INSTANCE_ID',
            appendEnvToName: true,
            env_production: {
                NODE_ENV: 'production'
            },
            env_stg: {
                NODE_ENV: 'stg'
            }
        }
    ]
};
