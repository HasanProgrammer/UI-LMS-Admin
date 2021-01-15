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
        Terms    : [],
        Title    : null,
        Duration : null,
        Video    : null, /*سورس فیلم برنامه نویسی مورد نظر*/
        Term     : null, /*برای ارسال به سمت سرور*/
        Chapters : [],
        Chapter  : null, /*برای ارسال به سمت سرور*/
        IsFree   : 0
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
        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.get(`${RouteServer.Root + RouteServer.AllTermNoPaginate}`, Configs).then(response => {

            this.setState({
                Terms : response?.data?.body?.terms
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
                                            <h4 style={{fontFamily: "IRANSans", cursor: "default"}}>فیلم جدید خود را منتشر نمایید</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> عنوان فیلم {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input placeholder="عنوان دوره خود را وارد نمایید" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.setTitle}/>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> مدت زمان نمایش {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input placeholder="مدت زمان نمایش فیلم خود را وارد نمایید" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.setDuration}/>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> نوع انتشار {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <div className="col-sm-12 col-md-7" style={{borderRadius: "0", cursor: "default"}}>
                                                        <input checked={this.state.IsFree == 1} value={1} type="radio" onChange={this.setFree}/>{" "}انتشار رایگان
                                                        <br/>
                                                        <input checked={this.state.IsFree == 0} value={0} type="radio" onChange={this.setFree}/>{" "}انتشار غیر رایگان
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> فیلم{" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input type="file" className="hasan-video-input" onChange={this.setFilm}/>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> دوره برنامه نویسی{" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <select className="form-control" style={{borderRadius: "0", padding: "0.5em"}} onChange={this.setTerm}>
                                                        <option hidden selected value="">لطفا یک دوره برنامه نویسی را برای فیلم خود انتخاب نمایید</option>
                                                        { this.state.Terms?.map(term => ( <option value={term.id}>{term.name}</option> )) }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3">فصل تدریس</label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <select className="form-control" style={{borderRadius: "0", padding: "0.5em"}} onChange={this.setChapter}>
                                                        <option hidden selected value="">در صورتی که دوره مورد نظر شما دارای فصل بندی است ، یک فصل را برای فیلم خود انتخاب نمایید</option>
                                                        { this.state.Chapters?.map(chapter => ( <option value={chapter.id}>{chapter.title}</option> )) }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"/>
                                                <div className="col-sm-12 col-md-7">
                                                    <button type="button" onClick={this.CreateVideo} className="btn btn-success action_button">ایجاد فیلم</button>
                                                    <span>{" "}</span>
                                                    <Link to={`${Route.AllVideoPage}`} className="btn btn-primary action_button">برگشت</Link>
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
        this.setState({
            Title : event.target.value
        });
    };

    /**
     * @function setDuration
     */
    setDuration = (event) =>
    {
        this.setState({
            Duration : event.target.value
        });
    };

    /**
     * @function setFree
     */
    setFree = (event) =>
    {
        this.setState({
           IsFree : event.target.value
        });
    };

    /**
     * @function setFilm
     */
    setFilm = (event) =>
    {
        if (event.target.files && event.target.files[0])
        {
            // let reader = new FileReader();
            // reader.readAsDataURL(event.target.files[0]);
            //
            // reader.onload = (e) =>
            // {
            //     this.setState({
            //         Video : event.target.files[0],
            //     });
            // };

            this.setState({
                Video : event.target.files[0],
            });
        }
    };

    /**
     * @function setTerm
     */
    setTerm = async (event) =>
    {
        let termId = event.target.value;

        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.get(`${RouteServer.Root + RouteServer.AllChapterNoPaginate + termId}`, Configs).then(response => {

            this.setState({
                Term     : termId,
                Chapters : response?.data?.body?.chapters
            });

        }).catch(response => {

            if(response?.response?.data?.code == 403)
            {
                window.location.href = `${Route.LoginPage}`;
                localStorage.removeItem("Token");
            }

        });
    };

    /**
     * @function setTerm
     */
    setChapter = (event) =>
    {
        this.setState({
            Chapter : event.target.value
        });
    };

    /**
     * @function CreateVideo
     */
    CreateVideo = async () =>
    {
        let Configs = {
            headers : {
                "Content-Type"  : "multipart/form-data",
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        let formData = new FormData();

        if(this.state.Title       != null) formData.append("Title"    , this.state.Title);
        if(this.state.Duration    != null) formData.append("Duration" , this.state.Duration);
        if(this.state.IsFree      != null) formData.append("IsFree"   , this.state.IsFree);
        if(this.state.Chapter     != null) formData.append("Chapter"  , this.state.Chapter);
        if(this.state.Term        != null) formData.append("Term"     , this.state.Term);

        formData.append("video" , this.state.Video);

        await Axios.put(`${RouteServer.Root + RouteServer.CreateVideo}`, formData, Configs).then(response => {

            if(response?.data?.code == 201 || response?.data?.code == 200)
                Toast.success(response?.data?.msg);
            else
                Toast.error(response?.data?.msg);

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