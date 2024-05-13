import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const AccountChangePassword = (props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [_entity, set_entity] = useState({});

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

  const onSave = async () => {
    let _data = {
      password: _entity.password,
    };

    setLoading(true);

    setLoading(false);
  };

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError("");
  };

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  return (
    <Dialog
      header="Change Password"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max"
      footer={renderFooter()}
      resizable={false}
    >
      <div>
        <div>
          <p className="m-0">Old Password:</p>
          <InputText
            className="w-full mb-3"
            value={_entity?.old_password}
            onChange={(e) => setValByKey("old_password", e.target.value)}
          />
        </div>
        <div>
          <p className="m-0">New Password:</p>
          <InputText
            className="w-full mb-3"
            value={_entity?.password}
            onChange={(e) => setValByKey("password", e.target.value)}
          />
        </div>
        <div>
          <p className="m-0">Confirm Password:</p>
          <InputText
            className="w-full mb-3"
            value={_entity?.confirm_password}
            onChange={(e) => setValByKey("confirm_password", e.target.value)}
          />
        </div>
        <small className="p-error">
          {Array.isArray(error)
            ? error.map((e, i) => (
                <p className="m-0" key={i}>
                  {e}
                </p>
              ))
            : error}
        </small>
      </div>
    </Dialog>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
  patchUser: (data) => dispatch.auth.patchUser(data),
});

export default connect(mapState, mapDispatch)(AccountChangePassword);
