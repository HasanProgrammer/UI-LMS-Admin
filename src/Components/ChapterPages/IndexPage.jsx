import React    from "react";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components
import MasterPage from "../MasterPage";

/*-------------------------------------------------------------------*/

//Configs
import Route            from "./../../Configs/Route";
import RouteServer      from "./../../Configs/RouteServer";
import PaginationConfig from "./../../Configs/Pagination.json";

/*-------------------------------------------------------------------*/

//Plugins
import swal          from "sweetalert";
import Axios         from "axios";
import ReactPaginate from "react-paginate";

import { toast as Toast } from "react-toastify";

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
        Chapters          : [],
        CurrentPageNumber : null,
        CountSizePerPage  : null,
        TotalPages        : null,
        HasNextPage       : false,
        HasPrevPage       : false
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllChapter + "?PageNumber=1&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Chapters          : response?.data?.body?.chapters,
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

        console.log(this.state.Chapters);
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
                                        <h4 style={{cursor: "default", fontFamily: "IRANSans"}}>همه فصول منتشر شده</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="float-right">
                                            <Link className="btn btn-success action_button" to={`${Route.CreateChapterPage}`}>
                                                <span>ساخت فصل جدید</span>
                                            </Link>
                                        </div>

                                        <div className="clearfix mb-3"/>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                <tr>
                                                    <th className="cell">ردیف</th>
                                                    <th className="cell">عنوان</th>
                                                    <th className="cell">دوره برنامه نویسی</th>
                                                    <th className="cell">عملیات</th>
                                                </tr>
                                                {
                                                    this.state.Chapters?.map((chapter, index) => (
                                                        <tr>
                                                            <td className="cell">
                                                                {index + 1}
                                                            </td>
                                                            <td className="cell">{chapter.title}</td>
                                                            <td className="cell">{chapter.termName}</td>
                                                            <td className="cell">
                                                                <br/>
                                                                <Link to={`${Route.EditChapterPage.replace(":id", chapter.id)}`} id={chapter.id} onClick={this.onClickEditButton} className="btn btn-warning action_button" style={{borderRadius: "0"}}>ویرایش</Link>
                                                                <br/>
                                                                <br/>
                                                                <button id={chapter.id} onClick={this.onClickDeleteButton} className="btn btn-danger action_button" style={{borderRadius: "0", }}>حذف</button>
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllChapter + "?PageNumber=" +  ( page.selected + 1 ) + "&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Chapters          : response?.data?.body?.chapters,
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
    onClickEditButton = (event) =>
    {
        localStorage.setItem("chapter", JSON.stringify(this.state.Chapters?.find(chapter => chapter.id == event.target.id)));
    };

    /**
     * @function onClickDeleteButton
     */
    onClickDeleteButton = async (event) =>
    {
        const result = await swal
        (
            {
                text    : "آیا شما از حذف این فصل اطمینان دارید ؟",
                icon    : "info",
                buttons : ["نه، مایل به حذف نمی باشم" , "بله ، کاملا اطمینان دارم"]
            }
        );

        if(result === true)
        {
            let chapters = this.state.Chapters?.filter(chapter => chapter.id != event.target.id);

            let Configs = {
                headers : {
                    "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
                }
            };

            await Axios.post(`${RouteServer.Root + RouteServer.DeleteChapter + event.target.id}`, null, Configs).then(response => {

                this.setState({
                    Chapters : chapters
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
        }
    };
}

export default IndexPage;