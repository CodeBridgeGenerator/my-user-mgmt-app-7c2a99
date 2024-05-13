import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from './NoMatch';

import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/LoginPage/SignUpPage';
import Account from '../components/Account/Account';
import Dashboard from '../components/Dashboard/Dashboard';
import WhatToDoPage from '../components/WhatTodo';

import UsersPage from "../components/UsersPage/UsersPage";
import UserProjectLayoutPage from "../components/UsersPage/UserProjectLayoutPage";
import SingleUsersPage from "../components/UsersPage/SingleUsersPage";
import UserProfilesPage from "../components/UserProfilesPage/UserProfilesPage";
import UserProfileProjectLayoutPage from "../components/UserProfilesPage/UserProfileProjectLayoutPage";
import SingleUserProfilesPage from "../components/UserProfilesPage/SingleUserProfilesPage";
import RolesPage from "../components/RolesPage/RolesPage";
import RoleProjectLayoutPage from "../components/RolesPage/RoleProjectLayoutPage";
import SingleRolesPage from "../components/RolesPage/SingleRolesPage";
import PositionsPage from "../components/PositionsPage/PositionsPage";
import PositionProjectLayoutPage from "../components/PositionsPage/PositionProjectLayoutPage";
import SinglePositionsPage from "../components/PositionsPage/SinglePositionsPage";
// ~cb-add-import~

const MyRouter = () => {
    return (
        <Routes>
            <Route path="" exact element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignUpPage />} />

            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
                <Route path="/account" exact element={<Account />} />
<Route path="/usersLayout/users" exact element={<UserProjectLayoutPage />} />
<Route path="/users/:singleUsersId" exact element={<SingleUsersPage />} />
<Route path="/users" exact element={<UserProjectLayoutPage />} />
<Route path="/users/:singleUsersId/userProfiles" exact element={<UserProfilesPage />} />
<Route path="/users/:singleUsersId/userProfiles/:singleUserProfilesId" exact element={<SingleUserProfilesPage />} />
<Route path="/userProfiles/:singleUserProfilesId" exact element={<SingleUserProfilesPage />} />
<Route path="/userProfiles" exact element={<UserProfileProjectLayoutPage />} />
<Route path="/roles/:singleRolesId" exact element={<SingleRolesPage />} />
<Route path="/roles" exact element={<RoleProjectLayoutPage />} />
<Route path="/positions/:singlePositionsId" exact element={<SinglePositionsPage />} />
<Route path="/positions" exact element={<PositionProjectLayoutPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
            {/* ~cb-add-route~ */}

            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
};

export default MyRouter;
