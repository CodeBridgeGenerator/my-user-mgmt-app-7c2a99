import React from "react";
import UserLayout from "../Layouts/UserLayout";
import { connect } from "react-redux";
import RolesPage from "./RolesPage";

const RoleProjectLayoutPage = (props) => {
  return (
    <UserLayout>
      <div className="pt-2">
        <div className="card p-0 overflow-hidden ">
          <div
            className="flex justify-content-between p-1 mb-2 shadow-2"
            style={{
              backgroundImage:
                "linear-gradient(to right top, #d30078, #d1008f, #c600ab, #af00ca, #8312eb)",
            }}
          >
            <div className="flex align-items-center text-white">
              <p className="text-2xl text-white">
              Roles  
              </p>
            </div>
          </div>
          <RolesPage />
        </div>
      </div>
    </UserLayout>
  );
};

const mapState = (state) => {
  const { selectedUser } = state.user;
  return { selectedUser };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(RoleProjectLayoutPage);