import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const PositionsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    useEffect(() => {
                    //on mount roles 
                    client
                        .service("roles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setRole(res.data.map((e) => ({ name: e['name'], value: e._id })));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Roles", type: "error", message: error.message || "Failed get roles" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            name: _entity?.name,
            role: _entity?.role?._id,
        };

        setLoading(true);
        try {
            
        await client.service("positions").patch(_entity._id, _data);
        const eagerResult = await client
            .service("positions")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                
                {
                    path : "role",
                    service : "roles",
                    select:["name"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info positions updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    // children dropdown options

    const roleOptions = role.map((elem) => ({ name: elem.name, value: elem.value })).sort((a, b) => a.name?.localeCompare(b.name, undefined, { numeric : true, sensitivity: "base"}));

    return (
        <Dialog header="Edit Positions" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="positions-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" type="text" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
            </span>
            </div>
            <div>
                <p className="m-0">role:</p>
                <Dropdown id="role" value={_entity?.role?._id} options={roleOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("role", {_id : e.value})}  />
            </div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">createdAt:{" " + moment(_entity?.createdAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">lastUpdatedAt:{" " + moment(_entity?.updatedAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">createdBy:{" " +_entity?.createdBy?.name}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">lastUpdatedBy:{" " +_entity?.updatedBy?.name}</p></div>
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
});

export default connect(mapState, mapDispatch)(PositionsCreateDialogComponent);
