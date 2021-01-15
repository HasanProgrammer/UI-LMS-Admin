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
        Videos             : [],
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllVideo + "?PageNumber=1&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Videos            : response?.data?.body?.videos,
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
                                        <h4 style={{cursor: "default", fontFamily: "IRANSans"}}>همه فیلم های منتشر شده</h4>
                                    </div>
                                    <div className="card-body">

                                        <div className="float-right">
                                            <Link className="btn btn-success action_button" to={`${Route.CreateVideoPage}`}>
                                                <span>انتشار فیلم جدید</span>
                                            </Link>
                                        </div>

                                        <div className="clearfix mb-3"/>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                <tr>
                                                    <th className="cell">ردیف</th>
                                                    <th className="cell">دوره</th>
                                                    <th className="cell">فصل</th>
                                                    <th className="cell">نوع انتشار</th>
                                                    <th className="cell">عنوان</th>
                                                    <th className="cell">مدت زمان نمایش</th>
                                                    <th className="cell">وضعیت</th>
                                                    <th className="cell">عملیات</th>
                                                </tr>
                                                {
                                                    this.state.Videos?.map((video, index) => (
                                                        <tr>
                                                            <td className="cell">{( index + 1 )}</td>
                                                            <td className="cell">{video.termName}</td>
                                                            <td className="cell">{video.chapterTitle}</td>
                                                            <td className="cell">{video.isFreeValue}</td>
                                                            <td className="cell">{video.title}</td>
                                                            <td className="cell">{video.duration}</td>
                                                            <td className="cell">{video.statusValue}</td>
                                                            <td className="cell">
                                                                <br/>
                                                                <Link to={`${Route.EditVideoPage.replace(":id", video.id)}`} id={video.id} onClick={this.onClickEditButton} className="btn btn-warning action_button" style={{borderRadius: "0", }}>ویرایش</Link>
                                                                <br/>
                                                                <br/>

                                                                {
                                                                    video.statusKey == 1
                                                                    ?
                                                                    (
                                                                        <button id={video.id} onClick={this.onClickInActiveButton} className="btn btn-warning action_button" style={{borderRadius: "0", }}>غیر فعال</button>
                                                                    )
                                                                    :
                                                                    (
                                                                        <button id={video.id} onClick={this.onClickActiveButton} className="btn btn-success action_button" style={{borderRadius: "0", }}>فعال</button>
                                                                    )
                                                                }
                                                                <br/>
                                                                <br/>
                                                                <button id={video.id} onClick={this.onClickDeleteButton} className="btn btn-danger action_button" style={{borderRadius: "0", }}>حذف</button>
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllBook + "?PageNumber=" +  ( page.selected + 1 ) + "&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Books             : response?.data?.body?.books,
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
                localStorage.setItem("Expired", "403");
            }

        });
    };

    /**
     * @function onClickEditButton
     */
    onClickEditButton = (event) =>
    {
        localStorage.setItem("video", JSON.stringify(this.state.Videos?.find(video => video.id == event.target.id)));
    };

    /**
     * @function onClickActiveButton
     */
    onClickActiveButton = async (event) =>
    {
        let videos = this.state.Videos?.slice();
        let video  = videos.find(video => video.id == event.target.id);

        video.statusKey   = 1;
        video.statusValue = "فعال";

        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.patch(`${RouteServer.Root + RouteServer.ActiveVideo + event.target.id}`, null, Configs).then(response => {

            this.setState({
                Videos : videos
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
        let videos = this.state.Videos?.slice();
        let video  = videos.find(video => video.id == event.target.id);

        video.statusKey   = 0;
        video.statusValue = "غیر فعال";

        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.patch(`${RouteServer.Root + RouteServer.InActiveVideo + event.target.id}`, null, Configs).then(response => {

            this.setState({
                Videos : videos
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
     * @function onClickDeleteButton
     */
    onClickDeleteButton = async (event) =>
    {
        console.log(event.target.id);

        const result = await swal
        (
            {
                text    : "آیا شما از حذف این فیلم برنامه نویسی اطمینان دارید ؟",
                icon    : "info",
                buttons : ["نه، مایل به حذف نمی باشم" , "بله ، کاملا اطمینان دارم"]
            }
        );

        if(result === true)
        {
            let books = this.state.Books.filter(book => book.bookId != event.target.id);

            let Configs = {
                headers : {
                    "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
                }
            };

            await Axios.post(`${RouteServer.Root + RouteServer.DeleteBook + event.target.id}`, null, Configs).then(response => {

                this.setState({
                    Books : books
                });

                Toast.success(response?.data?.msg);

            }).catch(response => {

                if(response?.response?.data?.code == 403)
                {
                    window.location.href = `${Route.LoginPage}`;
                    localStorage.setItem("Expired", "403");
                }
                else Toast.error(response?.response?.data?.msg);

            });
        }
    };

    onCloseModal = () =>
    {
        this.setState({ IsOpenModal : false });
    }
}

export default IndexPage;