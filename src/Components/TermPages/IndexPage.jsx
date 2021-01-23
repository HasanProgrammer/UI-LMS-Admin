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
import EllipsisText  from "react-ellipsis-text";

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
        Terms             : [],
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllTerm + "?PageNumber=1&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Terms             : response?.data?.body?.terms,
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
                                        <h4 style={{cursor: "default" , fontFamily: "IRANSans"}}>همه دوره های برنامه نویسی</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="float-right">
                                            <Link className="btn btn-success action_button" to={`${Route.CreateTermPage}`}>
                                                <span>ساخت دوره جدید</span>
                                            </Link>
                                        </div>

                                        <div className="clearfix mb-3"/>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                <tr>
                                                    <th className="cell">ردیف</th>
                                                    <th className="cell">نام</th>
                                                    <th className="cell">توضیحات</th>
                                                    <th className="cell">مناسبت</th>
                                                    <th className="cell">نتایج گذراندن</th>
                                                    <th className="cell">قیمت</th>
                                                    <th className="cell">دسته بندی</th>
                                                    <th className="cell">فصل بندی</th>
                                                    <th className="cell">شروع دوره</th>
                                                    <th className="cell">پایان دوره</th>
                                                    <th className="cell">وضعیت</th>
                                                    {/*<th className="cell">تصویر</th>*/}
                                                    <th className="cell">عملیات</th>
                                                </tr>
                                                {
                                                    this.state.Terms?.map((term, index) => (
                                                        <tr>
                                                            <td className="cell">{( index + 1)}</td>
                                                            <td className="cell">{term.name}</td>
                                                            <td className="cell"><EllipsisText text={term.description} length={50}/></td>
                                                            <td className="cell"><EllipsisText text={term.suitable} length={50}/></td>
                                                            <td className="cell"><EllipsisText text={term.result} length={50}/></td>
                                                            <td className="cell">{term.price}</td>
                                                            <td className="cell">{term.categoryName}</td>
                                                            <td className="cell">{term.hasChapterValue}</td>
                                                            <td className="cell">{term.dateStart}</td>
                                                            <td className="cell">{term.dateEnd}</td>
                                                            <td className="cell">{term.statusValue}</td>
                                                            {/*<td className="cell">*/}
                                                            {/*    <img className="img-thumbnail image-thumb" src={`${RouteServer.Root + "/" + term.image}`} alt=""/>*/}
                                                            {/*</td>*/}
                                                            <td className="cell">
                                                                <br/>
                                                                <Link to={`${Route.EditTermPage.replace(":id", term.id)}`} id={term.id} onClick={this.onClickEditButton} className="btn btn-warning action_button" style={{borderRadius: "0"}}>ویرایش</Link>
                                                                <br/>
                                                                <br/>
                                                                {
                                                                    term.statusKey == 1
                                                                    ?
                                                                    (
                                                                        <button id={term.id} onClick={this.onClickInActiveButton} className="btn btn-warning action_button" style={{borderRadius: "0", }}>غیر فعال</button>
                                                                    )
                                                                    :
                                                                    (
                                                                        <button id={term.id} onClick={this.onClickActiveButton} className="btn btn-success action_button" style={{borderRadius: "0", }}>فعال</button>
                                                                    )
                                                                }
                                                                <br/>
                                                                <br/>
                                                                <button id={term.id} onClick={this.onClickDeleteButton} className="btn btn-danger action_button" style={{borderRadius: "0", }}>حذف</button>
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllTerm + "?PageNumber=" +  ( page.selected + 1 ) + "&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Terms             : response?.data?.body?.terms,
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
        localStorage.setItem("term", JSON.stringify(this.state.Terms?.find(term => term.id == event.target.id)));
    };

    /**
     * @function onClickActiveButton
     */
    onClickActiveButton = async (event) =>
    {
        let terms = this.state.Terms?.slice();
        let term  = terms.find(term => term.id == event.target.id);

        term.statusKey   = 1;
        term.statusValue = "فعال";

        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.patch(`${RouteServer.Root + RouteServer.ActiveTerm + event.target.id}`, null, Configs).then(response => {

            this.setState({
                Terms : terms
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
        let terms = this.state.Terms?.slice();
        let term  = terms.find(term => term.id == event.target.id);

        term.statusKey   = 0;
        term.statusValue = "غیر فعال";

        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.patch(`${RouteServer.Root + RouteServer.InActiveTerm + event.target.id}`, null, Configs).then(response => {

            this.setState({
                Terms : terms
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
        const result = await swal
        (
            {
                text    : "آیا شما از حذف این دوره اطمینان دارید ؟",
                icon    : "info",
                buttons : ["نه، مایل به حذف نمی باشم" , "بله ، کاملا اطمینان دارم"]
            }
        );

        if(result === true)
        {
            let terms = this.state.Terms?.filter(term => term.id != event.target.id);

            let Configs = {
                headers : {
                    "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
                }
            };

            await Axios.post(`${RouteServer.Root + RouteServer.DeleteTerm + event.target.id}`, null, Configs).then(response => {

                this.setState({
                    Terms : terms
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