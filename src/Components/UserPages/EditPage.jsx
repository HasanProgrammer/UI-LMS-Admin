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
class EditPage extends React.Component
{
    /**
     * @property state
     */
    state =
    {
        UserId       : null,
        Username     : null,
        Password     : null,
        Phone        : null,
        Email        : null,
        Description  : null,
        Expert       : null,
        Image        : null,
        Roles        : [],   /*برای نمایش*/
        RolesId      : [],   /*برای ارسال به سمت سرور*/
        ImagePreview : null
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
    async componentDidMount()
    {
        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        if(localStorage.getItem("user") != null)
        {
            let user   = JSON.parse(localStorage.getItem("user"));
            let roleId = [];

            user.roles?.map(role => roleId.push(role.roleId));

            await Axios.get(`${RouteServer.Root + RouteServer.AllRole}`, Configs).then(response => {

                this.setState({
                    UserId       : user?.id,
                    Username     : user?.userName,
                    Email        : user?.email,
                    Phone        : user?.phone,
                    Description  : user?.description,
                    Expert       : user?.expert,
                    RolesId      : roleId,
                    Roles        : response?.data?.body?.roles,
                    ImagePreview : `${RouteServer.Root + "/" + user.image}`
                });

            }).catch(response => {

                if(response?.response?.data?.code == 403)
                {
                    window.location.href = `${Route.LoginPage}`;
                    localStorage.removeItem("Token");
                }

            });
        }
    }

    /**
     * @function render
     */
    render()
    {
        console.log(this.state.RolesId);

        return (
            <MasterPage>
                <div className="main-content">
                    <section className="section" style={{marginTop: "-3em"}}>
                        <div className="section-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card" style={{borderRadius: "0"}}>
                                        <div className="card-header">
                                            <h4 style={{fontFamily: "IRANSans", cursor: "default"}}>کاربر خود را ویرایش نمایید</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> نام کاربری {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input value={this.state.Username} placeholder="نام کاربری خود را وارد نمایید" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputUsername}/>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> رمز عبوری </label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input placeholder="رمز عبور خود را وارد نمایید" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputPassword}/>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> پست الکترونیکی{" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input value={this.state.Email} placeholder="پست الکترونیکی خود را وارد نمایید" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputEmail}/>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> تلفن تماس{" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input value={this.state.Phone} placeholder="شماره تلفن تماس ( تلفن همراه ) خود را وارد نمایید" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputPhone}/>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> معرفی{" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <textarea value={this.state.Description} placeholder="چند جمله ای درباره کاربر فعلی بنویسید" className="form-control" style={{borderRadius: "0", minHeight: "10em"}} onChange={this.onChangeTextInInputDescription}/>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> تخصص{" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input value={this.state.Expert} placeholder="تخصص کاربر فعلی را وارد نمایید" className="form-control" style={{borderRadius: "0"}} onChange={this.onChangeTextInInputExpert}/>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> تصویر شاخص{" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input type="file" className="hasan-file-input" onChange={this.onChangeTextInInputImage}/>
                                                    <br/>
                                                    {
                                                        this.state.ImagePreview != null
                                                        ?
                                                        (
                                                            <>
                                                                <br/>
                                                                <img src={this.state.ImagePreview} className='img-thumbnail' style={{borderRadius: '0', width: '10em', height: '10em'}}/>
                                                            </>
                                                        )
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> نقش های سیستمی{" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <select multiple className="form-control" style={{borderRadius: "0", minHeight: "10em"}} onChange={this.onSelectedOptionInSelectBox}>
                                                        { this.state.Roles?.map(role => ( <option selected={ this.state.RolesId.some(item => item === role.roleId) } value={role.roleId}>{role.roleName}</option> )) }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"/>
                                                <div className="col-sm-12 col-md-7">
                                                    <button type="button" id={this.state.UserId} onClick={this.EditUser} className="btn btn-success action_button">ویرایش کاربر</button>
                                                    <span>{" "}</span>
                                                    <Link to={`${Route.AllUserPage}`} className="btn btn-primary action_button">برگشت</Link>
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
    onSelectedOptionInSelectBox = (event) =>
    {
        let roles   = [];
        let options = event.target.options;

        for (let i = 0; i < options.length; i++)
            if(options[i].selected) roles.push(options[i].value);

        this.setState({
            RolesId : roles
        });
    };

    /**
     * @function onChangeTextInInputUsername
     */
    onChangeTextInInputUsername = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Username : event.target.value
        });
    };

    /**
     * @function onChangeTextInInputPassword
     */
    onChangeTextInInputPassword = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Password : event.target.value
        });
    };

    /**
     * @function onChangeTextInInputEmail
     */
    onChangeTextInInputEmail = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Email : event.target.value
        });
    };

    /**
     * @function onChangeTextInInputPhone
     */
    onChangeTextInInputPhone = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Phone : event.target.value
        });
    };

    /**
     * @function onChangeTextInInputDescription
     */
    onChangeTextInInputDescription = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Description : event.target.value
        });
    };

    /**
     * @function onChangeTextInInputExpert
     */
    onChangeTextInInputExpert = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Expert : event.target.value
        });
    };

    /**
     * @function onChangeTextInInputImage
     */
    onChangeTextInInputImage = (event) =>
    {
        if (event.target.files && event.target.files[0])
        {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);

            reader.onload = (e) =>
            {
                this.setState({
                    Image        : event.target.files[0],
                    ImagePreview : reader.result
                });
            };
        }
    };

    /**
     * @function CreateCategory
     */
    EditUser = async (event) =>
    {
        if(this.state.UserId != null)
        {
            let Configs = {
                headers : {
                    "Content-Type"  : "multipart/form-data",
                    "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
                }
            };

            let formData = new FormData();

            if(this.state.Username    != null) formData.append("Username"    , this.state.Username);
            if(this.state.Password    != null) formData.append("Password"    , this.state.Password);
            if(this.state.Email       != null) formData.append("Email"       , this.state.Email);
            if(this.state.Phone       != null) formData.append("Phone"       , this.state.Phone);
            if(this.state.Description != null) formData.append("Description" , this.state.Description);
            if(this.state.Expert      != null) formData.append("Expert"      , this.state.Expert);

            if(this.state.RolesId.length > 0)
                this.state.RolesId.map(role => formData.append("Roles[]" , role));

            formData.append("image" , this.state.Image);

            await Axios.patch(`${RouteServer.Root + RouteServer.EditUser + event.target.id}`, formData, Configs).then(response => {

                if(response?.data?.code == 201 || response?.data?.code == 200)
                    Toast.success(response?.data?.msg);
                else
                    Toast.error(response?.data?.msg);

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
}

export default EditPage;