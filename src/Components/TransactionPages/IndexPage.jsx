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
import jwt_decode from "jwt-decode";

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
        Transactions      : [],
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllTransaction + "?PageNumber=1&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Transactions      : response?.data?.body?.transactions,
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
                                        <h4 style={{cursor: "default", fontFamily: "IRANSans"}}>همه تراکنش های مالی ثبت شده</h4>
                                    </div>
                                    <div className="card-body">

                                        <div className="clearfix mb-3"/>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                <tr>
                                                    <th className="cell">ردیف</th>
                                                    <th className="cell">نام خریدار</th>
                                                    <th className="cell">تصویر خریدار</th>
                                                    <th className="cell">دوره برنامه نویسی</th>
                                                    <th className="cell">شماره تراکنش</th>
                                                    <th className="cell">پست الکترونیکی کاربر</th>
                                                    <th className="cell">شماره تماس کاربر</th>
                                                    <th className="cell">تاریخ خرید</th>
                                                    <th className="cell">قیمت دوره</th>
                                                    <th className="cell">وضعیت</th>
                                                </tr>
                                                {
                                                    this.state.Transactions?.map((tran, index) => (
                                                        <tr>
                                                            <td className="cell">
                                                                {index + 1}
                                                            </td>
                                                            <td className="cell">{tran.userName}</td>
                                                            <td className="cell">
                                                            {
                                                                tran.userImage == null
                                                                ?
                                                                "ندارد"
                                                                :
                                                                (
                                                                    <img style={{paddingTop: "0.5em"}} className="image-thumb" src={`${RouteServer.Root + "/" + tran.userImage}`} alt=""/>
                                                                )
                                                            }
                                                            </td>
                                                            <td className="cell">{tran.termName}</td>
                                                            <td className="cell">{tran.refId}</td>
                                                            <td className="cell">{tran.userEmail}</td>
                                                            <td className="cell">{tran.userPhone}</td>
                                                            <td className="cell">{tran.dateCreate}</td>
                                                            <td className="cell">{tran.price}</td>
                                                            <td className="cell">{tran.status}</td>
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllTransaction + "?PageNumber=" +  ( page.selected + 1 ) + "&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Transactions      : response?.data?.body?.transactions,
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
}

export default IndexPage;