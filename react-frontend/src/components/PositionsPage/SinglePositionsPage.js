import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import UserLayout from "../Layouts/UserLayout";


const SinglePositionsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [role, setRole] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("positions")
            .get(urlParams.singlePositionsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"role"] }})
            .then((res) => {
                set_entity(res || {});
                const role = Array.isArray(res.role)
            ? res.role.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.role
                ? [{ _id: res.role._id, name: res.role.name }]
                : [];
        setRole(role);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Positions", type: "error", message: error.message || "Failed get positions" });
            });
    }, [props,urlParams.singlePositionsId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <UserLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Positions</h3>
                </div>
                <p>positions/{urlParams.singlePositionsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Name</label><p className="" >{_entity?.name}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">role</label>
            <p>{role.map((elem) => (
                    <Link key={elem._id} to={`/roles/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.name}</p>
                        </div>
                    </Link>
                ))}</p></div>

            <div className="col-12">&nbsp;</div>
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">created</label>
                <p className="">{moment(_entity?.createdAt).fromNow()}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">updated</label>
                <p className="">{moment(_entity?.updatedAt).fromNow()}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">createdBy</label>
                <p className="">{_entity?.createdBy?.name}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">lastUpdatedBy</label>
                <p className="">{_entity?.updatedBy?.name}</p>
            </div>

                </div>
            </div>
        </div>
        
        </UserLayout>
    );
};

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SinglePositionsPage);
