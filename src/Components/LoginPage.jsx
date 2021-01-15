import React    from "react";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Configs
import Route       from "./../Configs/Route.json";
import RouteServer from "./../Configs/RouteServer.json";

/*-------------------------------------------------------------------*/

//Plugins
import Axios from "axios";

import { toast as Toast , ToastContainer } from "react-toastify";

/*-------------------------------------------------------------------*/

class LoginPage extends React.Component
{
    state =
    {
        Username : null,
        Password : null
    };

    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <body>
                <ToastContainer/>
                <div id="app">
                    <section className="section">
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                                    <div className="card card-auth" style={{borderRadius: "0"}}>
                                        <div className="card-header card-header-auth" style={{borderRadius: "0"}}>
                                            <h4 style={{cursor: "default", fontFamily: "IRANSans"}}>ورود</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label>نام کاربری</label>
                                                <input onChange={this.setUsername} placeholder="لطفا نام کاربری خود را وارد نمایید" style={{borderRadius: "0"}} id="email" className="form-control" name="email" tabIndex="1" autoFocus=""/>
                                            </div>
                                            <div className="form-group">
                                                <label>رمز عبور</label>
                                                <input onChange={this.setPassword} placeholder="لطفا رمز عبور خود را وارد نمایید" style={{borderRadius: "0"}} id="password" type="password" className="form-control" name="password" tabIndex="2" required=""/>
                                            </div>
                                            <div className="form-group">
                                                <button onClick={this.login} style={{borderRadius: "0"}} className="btn btn-lg btn-block btn-auth-color" tabIndex="4">
                                                    ورود
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </body>
        );
    }

    /*---------------------------------------------------------------CUSTOM---------------------------------------------------------------*/

    setUsername = (event) =>
    {
        this.setState({
            Username: event.target.value
        });
    };

    setPassword = (event) =>
    {
        this.setState({
            Password: event.target.value
        });
    };

    login = async (event) =>
    {
        let Data = {
            Username : this.state.Username,
            Password : this.state.Password
        };

        let Config = {
            headers: {
                "Content-Type" : "application/json"
            }
        };

        await Axios.patch(`${RouteServer.Root + RouteServer.Login}`, JSON.stringify(Data), Config).then(response => {

            Toast.success(response?.data?.msg);

            localStorage.setItem("Token" , response?.data?.body?.token);

            setTimeout(() => { window.location.href = `${Route.HomePage}` }, 1500);

        }).catch(response => {

            Toast.error(response?.response?.data?.msg);
            if(typeof response?.response?.data?.body?.errors != "undefined")
            {
                response.response.data.body.errors.map(error => {

                    Toast.error(error);

                });
            }

        });
    }
}

export default LoginPage;