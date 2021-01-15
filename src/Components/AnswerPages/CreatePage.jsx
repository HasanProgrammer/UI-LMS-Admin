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
import Axios from "axios";

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
        Question : this.props.match.params.id, /*این id ؛ id پرسش ایجاد شده می باشد*/
        Content  : null
    };

    /**
     * @function constructor
     * @param    props
     */
    constructor(props)
    {
        super(props);
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
                                            <h4 style={{fontFamily: "IRANSans", cursor: "default"}}>پاسخ خود را وارد نمایید</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> متن پاسخ {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <textarea placeholder="در این قسمت ، پاسخ خود را بیان کنید"
                                                          className="form-control" style={{borderRadius: "0", minHeight: "10em"}}
                                                          onChange={this.setAnswer}
                                                />
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"/>
                                                <div className="col-sm-12 col-md-7">
                                                    <button type="button" onClick={this.CreateAnswer} className="btn btn-success action_button">ثبت پاسخ</button>
                                                    <span>{" "}</span>
                                                    <Link to={`${Route.AllAnswerPage.replace(":id", this.state.Question)}`} className="btn btn-primary action_button">برگشت</Link>
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
     * @function setAnswer
     */
    setAnswer = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Content : event.target.value
        });
    };

    /**
     * @function CreateCategory
     */
    CreateAnswer = async () =>
    {
        let Data = {
            Content : this.state.Content
        };

        let Configs = {
            headers : {
                "Content-Type"  : "application/json",
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.put(`${RouteServer.Root + RouteServer.CreateAnswer + this.state.Question}`, JSON.stringify(Data), Configs).then(response => {

            Toast.success(response?.data?.msg);

        }).catch(response => {

            if(response?.response?.data?.code == 403)
            {
                window.location.href = `${Route.LoginPage}`;
                localStorage.removeItem("Token");
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