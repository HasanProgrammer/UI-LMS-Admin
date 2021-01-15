import React    from "react";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components
import MasterPage from "../MasterPage";

/*-------------------------------------------------------------------*/

//Configs
import Route            from "./../../Configs/Route";
import RouteServer      from "./../../Configs/RouteServer";
import PaginationConfig from "./../../Configs/Pagination";

/*-------------------------------------------------------------------*/

//Plugins
import swal          from "sweetalert";
import Axios         from "axios";
import ReactPaginate from "react-paginate";

import { Modal }          from "react-responsive-modal";
import { toast as Toast } from "react-toastify";

/*-------------------------------------------------------------------*/

//Styles
import "react-responsive-modal/styles.css";

/*-------------------------------------------------------------------*/

/**
 * @class HomePage
 */
class IndexPage extends React.Component
{
    /**
     * @property state
     */
    state =
    {
        Questions          : [],
        CurrentPageNumber  : null,
        CountSizePerPage   : null,
        TotalPages         : null,
        HasNextPage        : false,
        HasPrevPage        : false
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllQuestion + "?PageNumber=1&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Questions         : response?.data?.body?.questions,
                CurrentPageNumber : paginationHeader?.CurrentPage,
                CountSizePerPage  : paginationHeader?.CountSizePerPage,
                TotalPages        : paginationHeader?.TotalPages,
                HasNextPage       : paginationHeader?.HasNext,
                HasPrevPage       : paginationHeader?.HasPrev
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
        const SelectBoxStyle =
        {
            borderRadius: "0"
        };

        const BadgeStyle =
        {
            borderRadius: "0"
        };

        const ModalStyle =
        {
            width : "50em"
        };

        let Pagination = null;
        if(this.state.TotalPages > 0)
        {
            Pagination = <ReactPaginate
                            className="pagination"
                            previousLabel={'قبلی'}
                            nextLabel={'بعدی'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.state.TotalPages}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={5}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}

                            onPageChange={this.onClickPaginateLink}
                        />
        }

        return (
            <MasterPage>
                <div className="main-content">
                    <section className="section" style={{marginTop: "-3em"}}>
                        <div className="row">
                            <div className="col-12">
                                <div className="card" style={{borderRadius: "0"}}>
                                    <div className="card-header">
                                        <h4 style={{cursor: "default", fontFamily: "IRANSans"}}>همه پرسش های منتشر شده</h4>
                                    </div>
                                    <div className="card-body">

                                        <div className="clearfix mb-3"/>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                <tr>
                                                    <th className="cell">ردیف</th>
                                                    <th className="cell">نام کاربر</th>
                                                    <th className="cell">تصویر کاربر</th>
                                                    <th className="cell">نام دوره</th>
                                                    <th className="cell">عنوان</th>
                                                    <th className="cell">متن پرسش</th>
                                                    <th className="cell">تعداد پاسخ ها</th>
                                                    <th className="cell">تاریخ ثبت</th>
                                                    <th className="cell">وضعیت</th>
                                                    <th className="cell">عملیات</th>
                                                </tr>
                                                {
                                                    this.state.Questions?.map((question, index) => (
                                                        <tr>
                                                            <td className="cell">{( index + 1 )}</td>
                                                            <td className="cell">{question.userName}</td>
                                                            <td className="cell">
                                                                {
                                                                    question.userImage == null
                                                                    ?
                                                                    "ندارد"
                                                                    :
                                                                    (
                                                                        <img className="img-thumbnail image-thumb" src={`${RouteServer.Root + "/" + question.userImage}`} alt=""/>
                                                                    )
                                                                }
                                                            </td>
                                                            <td className="cell">{question.termName}</td>
                                                            <td className="cell">{question.title}</td>
                                                            <td className="cell">{question.content}</td>
                                                            <td className="cell">{question.countAnswer}</td>
                                                            <td className="cell">{question.dateCreate}</td>
                                                            <td className="cell">{question.status ? "فعال" : "غیر فعال"}</td>
                                                            <td className="cell">
                                                                <br/>
                                                                <Link to={`${Route.AllAnswerPage.replace(":id", question.id)}`} id={question.id} onClick={this.onClickShowAnswerButton} className="btn btn-outline-info action_button" style={{borderRadius: "0"}}>پاسخ ها</Link>
                                                                <br/>
                                                                <br/>
                                                                {
                                                                    question.status
                                                                    ?
                                                                    (
                                                                        <button id={question.id} onClick={this.onClickInActiveButton} className="btn btn-warning action_button" style={{borderRadius: "0", }}>غیر فعال</button>
                                                                    )
                                                                    :
                                                                    (
                                                                        <button id={question.id} onClick={this.onClickActiveButton} className="btn btn-success action_button" style={{borderRadius: "0", }}>فعال</button>
                                                                    )
                                                                }
                                                                <br/>
                                                                <br/>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {Pagination}

                    <Modal open={this.state.IsOpenModal} onClose={this.onCloseModal} center>
                        <div style={ModalStyle}>

                        </div>
                    </Modal>
                </div>
            </MasterPage>
        );
    }

    /*---------------------------------------------------------------CUSTOM---------------------------------------------------------------*/

    onClickPaginateLink = async (page) =>
    {
        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.get(`${RouteServer.Root + RouteServer.AllQuestion + "?PageNumber=" +  ( page.selected + 1 ) + "&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Questions         : response?.data?.body?.questions,
                CurrentPageNumber : paginationHeader?.CurrentPage,
                CountSizePerPage  : paginationHeader?.CountSizePerPage,
                TotalPages        : paginationHeader?.TotalPages,
                HasNextPage       : paginationHeader?.HasNext,
                HasPrevPage       : paginationHeader?.HasPrev
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
     * @function onClickEditButton
     */
    onClickShowAnswerButton = (event) =>
    {

    };

    /**
     * @function onClickActiveButton
     */
    onClickActiveButton = async (event) =>
    {
        let questions = this.state.Questions?.slice();
        let question  = questions.find(question => question.id == event.target.id);

        question.status = true;

        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.patch(`${RouteServer.Root + RouteServer.ActiveQuestion + event.target.id}`, null, Configs).then(response => {

            this.setState({
                Questions : questions
            });

            Toast.success(response?.data?.msg);

        }).catch(response => {

            if(response?.response?.data?.code == 403)
            {
                window.location.href = `${Route.LoginPage}`;
                localStorage.removeItem("Token");
            }
            else Toast.error(response?.response?.data?.msg);

        });
    };

    /**
     * @function onClickInActiveButton
     */
    onClickInActiveButton = async (event) =>
    {
        let questions = this.state.Questions?.slice();
        let question  = questions.find(question => question.id == event.target.id);

        question.status = false;

        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.patch(`${RouteServer.Root + RouteServer.InActiveQuestion + event.target.id}`, null, Configs).then(response => {

            this.setState({
                Questions : questions
            });

            Toast.success(response?.data?.msg);

        }).catch(response => {

            if(response?.response?.data?.code == 403)
            {
                window.location.href = `${Route.LoginPage}`;
                localStorage.removeItem("Token");
            }
            else Toast.error(response?.response?.data?.msg);

        });
    };

    onCloseModal = () =>
    {
        this.setState({ IsOpenModal : false });
    }
}

export default IndexPage;