import React    from "react";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components
import MasterPage from "../MasterPage";

/*-------------------------------------------------------------------*/

//Configs
import Route       from "./../../Configs/Route";
import RouteServer from "./../../Configs/RouteServer";

/*-------------------------------------------------------------------*/

//Plugins
import Axios      from "axios";
import jwt_decode from "jwt-decode";

import { toast as Toast } from "react-toastify";

/*-------------------------------------------------------------------*/

/**
 * @class CreatePage
 */
class CreatePage extends React.Component
{
    /**
     * @property state
     */
    state =
    {
        Name : null
    };

    /**
     * @function constructor
     * @param    props
     */
    constructor(props)
    {
        super(props);

        if(localStorage.getItem("Token") !== null && jwt_decode(localStorage.getItem("Token")).role !== "Admin")
            window.location.href = `${Route.HomePage}`;
    }

    /**
     * @function componentDidMount
     */
    componentDidMount()
    {

    }

    /**
     * @function render
     */
    render()
    {
        return (
            <MasterPage>
                <div className="main-content">
                    <section className="section" style={{marginTop: "-3em"}}>
                        <div className="section-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card" style={{borderRadius: "0"}}>
                                        <div className="card-header">
                                            <h4 style={{fontFamily: "IRANSans", cursor: "default"}}>نقش سیستمی جدید خود را ایجاد نمایید</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> نام نقش {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input placeholder="نام نقش مورد نظر خود را وارد نمایید" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputName}/>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"/>
                                                <div className="col-sm-12 col-md-7">
                                                    <button type="button" onClick={this.CreateRole} className="btn btn-success action_button">ایجاد نقش سیستمی</button>
                                                    <span>{" "}</span>
                                                    <Link to={`${Route.AllRolePage}`} className="btn btn-primary action_button">برگشت</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </MasterPage>
        )
    }

    /*---------------------------------------------------------------CUSTOM---------------------------------------------------------------*/

    /**
     * @function onSelectedOptionInSelectBox
     */
    onChangeTextInInputName = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Name : event.target.value
        });
    };

    /**
     * @function CreateCategory
     */
    CreateRole = async () =>
    {
        let Data = {
            Name : this.state.Name
        };

        let Configs = {
            headers : {
                "Content-Type"  : "application/json",
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.put(`${RouteServer.Root + RouteServer.CreateRole}`, JSON.stringify(Data), Configs).then(response => {

            Toast.success(response?.data?.msg);

        }).catch(response => {

            if(response?.response?.data?.code == 403)
            {
                window.location.href = `${Route.LoginPage}`;
                localStorage.setItem("Expired", "403");
            }
            else
            {
                Toast.error(response.response?.data?.msg);
                if(typeof response?.response?.data?.body?.errors != "undefined")
                {
                    response.response.data.body.errors.map(error => {

                        Toast.error(error);

                    });
                }
            }

        });
    }
}

export default CreatePage;