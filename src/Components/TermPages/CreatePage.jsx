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

//Styles

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
        Name         : null,
        Description  : null,
        Image        : null,
        ImagePreview : null,
        Categories   : [],
        Category     : null,
        Price        : null,
        DateStart    : null,
        DateEnd      : null,
        Suitable     : null,
        Result       : null,
        HasChapter   : 0
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllCategoryNoPaginate}`, Configs).then(response => {

            this.setState({
                Categories : response?.data?.body?.categories
            });

        }).catch(response => {

            if(response?.response?.data?.code == 403)
            {
                window.location.href = `${Route.LoginPage}`;
                localStorage.removeItem("Token")
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
                                            <h4 style={{fontFamily: "IRANSans", cursor: "default"}}>دوره جدید خود را ایجاد نمایید</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> نام دوره {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input placeholder="نام دوره مورد نظر خود را وارد نمایید"
                                                           type="text"
                                                           className="form-control"
                                                           style={{borderRadius: "0"}}
                                                           onChange={this.setName}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> توضیحات دوره {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>


                                                <textarea placeholder="توضیحاتی درباره دوره مورد نظر خود وارد نمایید"
                                                          className="form-control" style={{borderRadius: "0", minHeight: "10em"}}
                                                          onChange={this.setDescription}
                                                />
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> تاریخ شروع دوره {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input placeholder="تاریخ شروع دوره خود را وارد نمایید ، تاریخ را به شکل ( yyyy/mm/dd ) بیان نمایید"
                                                           type="text"
                                                           className="form-control"
                                                           style={{borderRadius: "0"}}
                                                           onChange={this.setDateStart}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> تاریخ پایان دوره {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input placeholder="تاریخ پایان دوره خود را وارد نمایید ، تاریخ را به شکل ( yyyy/mm/dd ) بیان نمایید"
                                                           type="text"
                                                           className="form-control"
                                                           style={{borderRadius: "0"}}
                                                           onChange={this.setDateEnd}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> مناسب برای {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <textarea placeholder="در این قسمت ، درباره مناسب بودن دوره برای افراد مختلف ، توضیحاتی را ذکر نمایید ( این دوره برای چه افرادی مناسب است )"
                                                          className="form-control" style={{borderRadius: "0", minHeight: "10em"}}
                                                          onChange={this.setSuitable}
                                                />
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> نتایج گذراندن دوره {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                <textarea placeholder="در این قسمت ، درباره خروجی تماشای فیلم های دوره ، توضیحاتی را ذکر نمایید ( این دوره چه نتیجه ای برای دانشجویان دارد )"
                                                          className="form-control" style={{borderRadius: "0", minHeight: "10em"}}
                                                          onChange={this.setResult}
                                                />
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> قیمت دوره {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input placeholder="قیمت دوره خود را وارد نمایید . در نظر داشته باشید قیمت وارده به تومان می باشد" type="text" className="form-control" style={{borderRadius: "0"}} onChange={this.setPrice}/>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> تصویر شاخص{" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <input type="file" className="hasan-file-input" onChange={this.setImage}/>
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
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> دسته بندی{" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0"}}>
                                                    <select className="form-control" style={{borderRadius: "0", padding: "0.5em"}} onChange={this.setCategory}>
                                                        <option hidden selected value="">لطفا یک دسته بندی را برای دوره خود انتخاب نمایید</option>
                                                        { this.state.Categories?.map(category => ( <option value={category.id}>{category.name}</option> )) }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"> فصل بندی دوره {" "} <span className="text-danger">*</span></label>
                                                <div className="col-sm-12 col-md-7" style={{borderRadius: "0", cursor: "default"}}>
                                                    <input checked={this.state.HasChapter == 1} value={1} type="radio" onChange={this.setHasChapter}/>{" "} فصل بندی دارد
                                                    <br/>
                                                    <input checked={this.state.HasChapter == 0} value={0} type="radio" onChange={this.setHasChapter}/>{" "} فصل بندی ندارد
                                                </div>
                                            </div>

                                            <div className="form-group row mb-4">
                                                <label className="col-form-label text-md-right col-12 col-md-3 col-lg-3"/>
                                                <div className="col-sm-12 col-md-7">
                                                    <button type="button" onClick={this.CreateTerm} className="btn btn-success action_button">ایجاد دوره</button>
                                                    <span>{" "}</span>
                                                    <Link to={`${Route.AllTermPage}`} className="btn btn-primary action_button">برگشت</Link>
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
     * @function setName
     */
    setName = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Name : event.target.value
        });
    };

    /**
     * @function setDescription
     */
    setDescription = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Description : event.target.value
        });
    };

    /**
     * @function setPrice
     */
    setPrice = (event) =>
    {
        //console.log(event.target.value);

        this.setState({
            Price : event.target.value
        });
    };

    /**
     * @function setImage
     */
    setImage = (event) =>
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
     * @function setCategory
     */
    setCategory = (event) =>
    {
        this.setState({
            Category : parseInt(event.target.value)
        });
    };

    /**
     * @function setDateStart
     */
    setDateStart = (event) =>
    {
        this.setState({
            DateStart : event.target.value
        });
    };

    /**
     * @function setDateEnd
     */
    setDateEnd = (event) =>
    {
        this.setState({
            DateEnd : event.target.value
        });
    };

    /**
     * @function setSuitable
     */
    setSuitable = (event) =>
    {
        this.setState({
            Suitable : event.target.value
        });
    };

    /**
     * @function setResult
     */
    setResult = (event) =>
    {
        this.setState({
            Result : event.target.value
        });
    };

    /**
     * @function setHasChapter
     */
    setHasChapter = (event) =>
    {
        this.setState({
            HasChapter : event.target.value
        });
    };

    /**
     * @function CreateTerm
     */
    CreateTerm = async () =>
    {
        let Configs = {
            headers : {
                "Content-Type"  : "multipart/form-data",
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        let formData = new FormData();

        if(this.state.Name        != null) formData.append("Name"        , this.state.Name);
        if(this.state.Description != null) formData.append("Description" , this.state.Description);
        if(this.state.Suitable    != null) formData.append("Suitable"    , this.state.Suitable);
        if(this.state.Result      != null) formData.append("Result"      , this.state.Result);
        if(this.state.Price       != null) formData.append("Price"       , this.state.Price);
        if(this.state.Category    != null) formData.append("Category"    , this.state.Category);
        if(this.state.DateStart   != null) formData.append("DateStart"   , this.state.DateStart);
        if(this.state.DateEnd     != null) formData.append("DateEnd"     , this.state.DateEnd);
        if(this.state.HasChapter  != null) formData.append("HasChapter"  , this.state.HasChapter);

        formData.append("image" , this.state.Image);

        await Axios.put(`${RouteServer.Root + RouteServer.CreateTerm}`, formData, Configs).then(response => {

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