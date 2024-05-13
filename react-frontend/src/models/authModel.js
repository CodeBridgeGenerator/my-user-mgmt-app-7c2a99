import client from '../services/restClient';

const initState = {
    user: {},
    isLoggedIn: false
};
export const auth = {
    state: {
        ...initState
    },
    reducers: {
        // handle state changes with pure functions
        update(state, newState) {
            return { ...state, ...newState };
        }
    },
    effects: (dispatch) => ({
        //////////////////
        //// GET USER ////
        //////////////////
        async getUser(_, reduxState) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { user } = reduxState.auth;
                    let _user = await client.service('users').get(user._id);
                    this.update({ user: _user });
                    resolve();
                } catch (error) {
                    console.log('Failed to get user', { error });
                    dispatch.toast.alert({ type: 'error', title: 'Get user', message: error.message || 'Failed to get user' });
                    reject(error);
                }
            });
        },
        ///////////////
        //// LOGIN //// using feathers rest client
        ///////////////
        async login(data, reduxState) {
            return new Promise(async (resolve, reject) => {
                dispatch.loading.show();

                try {
                    let loginResponse = await client.authenticate({ ...data, strategy: 'local' });
                    this.update({ isLoggedIn: true, user: loginResponse.user });
                    resolve();
                } catch (error) {
                    console.log('error', { error });
                    dispatch.toast.alert({ type: 'error', message: error.message || 'Failed to login!' });
                    reject(error);
                }
                dispatch.loading.hide();
            });
        },
        //////////////////////////
        //// LOGIN FOR O AUTH ////
        //////////////////////////
        async loginForOAuth(data, reduxState) {
            return new Promise(async (resolve, reject) => {
                dispatch.loading.show();

                try {
                    let loginResponse = await client.authenticate({ ...data, strategy: 'local' });
                    this.update({ isLoggedIn: true, user: loginResponse.user });
                    resolve();
                } catch (error) {
                    console.log('error', { error });
                    dispatch.toast.alert({ type: 'error', message: 'First, you have to sign up!' });
                    reject(error);
                }
                dispatch.loading.hide();
            });
        },
        /////////////////////////
        //// RE-AUTHENTICATE ////
        /////////////////////////
        async reAuth(data, reduxState) {
            return new Promise(async (resolve, reject) => {
                dispatch.loading.show();
                try {
                    let loginResponse = await client.reAuthenticate();
                    this.update({ isLoggedIn: true, user: loginResponse.user });
                    resolve();
                } catch (error) {
                    console.log('error', { error });
                    //dispatch.toast.alert({ type: 'error', message: error.message || 'Failed to reAuthenticate!' });
                    reject(error);
                }
                dispatch.loading.hide();
            });
        },
        ////////////////
        //// LOGOUT ////
        ////////////////
        async logout(_, reduxState) {
            dispatch.loading.show();
            const { user } = reduxState.auth;
            await client
                .logout()
                .then((res) => {
                    console.log('Logged out successfully!');
                    dispatch.toast.alert({ type: 'success', message: `User ${user?.name} logged out!` });
                    this.update(initState);
                })
                .catch((error) => {
                    console.log('error', { error });
                    dispatch.toast.alert({ type: 'error', message: error.message || 'Failed to logout!' });
                    this.update(initState);
                });
            window.localStorage.clear();
            window.sessionStorage.clear();
            dispatch.loading.hide();
        },

        //////////////////////
        //// CREATE USAER ////
        //////////////////////
        async createUser(data, reduxState) {
            return new Promise(async (resolve, reject) => {
                dispatch.loading.show();
                try {
                    await client.service('users').create(data);
                    dispatch.toast.alert({ type: 'success', title: 'Sign Up', message: 'Successful' });
                    resolve();
                } catch (error) {
                    console.log('error', { error });
                    dispatch.toast.alert({ type: 'error', title: 'Sign Up', message: error.message || 'Failed to sign up' });
                    reject(error);
                }
                dispatch.loading.hide();
            });
        },
         ///////////////////////////////
        //// CREATE USER FOR O AUTH ////
        ////////////////////////////////
        async createUserForOauth(data, reduxState) {
            return new Promise(async (resolve, reject) => {
                dispatch.loading.show();
                try {
                    const results = await client.service('users').create(data);
                    const userProfileData = {
                        userId: results._id,
                        imageUrl: data.imageUrl, 
                        uId: data.uId, 
                        provider: data.provider 
                    };
        
                    await client.service('usersProfile').create(userProfileData);
                    dispatch.toast.alert({ type: 'success', title: 'Sign Up', message: 'Successful' });
                    resolve();
                } catch (error) {
                    console.log('error', { error });
                    dispatch.toast.alert({ type: 'error', title: 'Sign Up', message: 'You are already signed in!' });
                    reject(error);
                }
                dispatch.loading.hide();
            });
        },
        ////////////////////
        //// PATCH USER ////
        ////////////////////
        async patchUser({ _id, data }, reduxState) {
            return new Promise(async (resolve, reject) => {
                if (!_id) {
                    dispatch.toast.alert({ type: 'error', message: 'User id is required' });
                    reject('User id is required');
                    return;
                }
                client
                    .service('users')
                    .patch(_id, data)
                    .then((user) => {
                        this.update({ user });
                        resolve(user);
                    })
                    .catch((e) => {
                        console.log('errrrrrr>>>>>', e);
                        reject(e);
                    });
            });
        },
    })
};
