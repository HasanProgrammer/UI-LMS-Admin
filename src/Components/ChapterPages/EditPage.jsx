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
class EditPage extends React.Component
{
    /**
     * @property state
     */
    state =
    {
        Terms : [],
        Term  : null,
        Id    : null,
        Title : null
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
    async componentDidMount()
    {
        let chapter = JSON.parse(localStorage.getItem("chapter"));

        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.get(`${RouteServer.Root + RouteServer.AllTermNoPaginate}`, Configs).then(response => {

            this.setState({
                Terms : response?.data?.body?.terms,
                Term  : chapter?.termId,
                Id    : chapter?.id,
                Title : chapter?.title
            });

        }).catch(response => {

            if(response?.response?.data?.code == 403)
            {
                window.location.href = `${Route.LoginPage}`;
                localStorage.removeItem("Token");
            }

        });
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
                                            <h4 style={{fontFamily: "IRANSans", cursor: "default"}}>فصل خود را ویرایش نمایید</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> عنوان فصل {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input value={this.state.Title} placeholder="عنوان فصل مورد نظر خود را وارد نمایید" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.setTitle}/>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> دوره برنامه نویسی{" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <select className="form-control" style={{borderRadius: "0", padding: "0.5em"}} onChange={this.setTerm}>
                                                        { this.state.Terms?.map(term => ( <option selected={this.state.Term == term.id} value={term.id}>{term.name}</option> )) }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"/>
                                                <div className="col-sm-12 col-md-7">
                                                    <button type="button" onClick={this.EditChapter} className="btn btn-success action_button">ویرایش فصل</button>
                                                    <span>{" "}</span>
                                                    <Link to={`${Route.AllChapterPage}`} className="btn btn-primary action_button">برگشت</Link>
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
     * @function setTitle
     */
    setTitle = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Title : event.target.value
        });
    };

    /**
     * @function setTitle
     */
    setTerm = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Term : parseInt(event.target.value)
        });
    };

    /**
     * @function EditChapter
     */
    EditChapter = async () =>
    {
        let Data = {
            Term  : this.state.Term,
            Title : this.state.Title
        };

        let Configs = {
            headers : {
                "Content-Type"  : "application/json",
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.patch(`${RouteServer.Root + RouteServer.EditChapter + this.state.Id}`, JSON.stringify(Data), Configs).then(response => {

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

export default EditPage;