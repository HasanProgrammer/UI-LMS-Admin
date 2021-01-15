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
import jwt_decode    from "jwt-decode";
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
        Roles             : [],
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

        if(localStorage.getItem("Token") !== null && jwt_decode(localStorage.getItem("Token")).role !== "Admin")
            window.location.href = `${Route.HomePage}`;
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllRole + "?PageNumber=1&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Roles             : response?.data?.body?.roles,
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
                                        <h4 style={{cursor: "default", fontFamily: "IRANSans"}}>همه نقش های سیستمی</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="float-right">
                                            <Link className="btn btn-success action_button" to={`${Route.CreateRolePage}`}>
                                                <span>ساخت نقش جدید</span>
                                            </Link>
                                        </div>

                                        <div className="clearfix mb-3"/>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                <tr>
                                                    <th className="cell">ردیف</th>
                                                    <th className="cell">نام نقش سیستمی</th>
                                                    <th className="cell">تعداد کاربران</th>
                                                </tr>
                                                {
                                                    this.state.Roles.map((role, index) => (
                                                        <tr>
                                                            <td className="cell">
                                                                {index + 1}
                                                            </td>
                                                            <td className="cell">{role.roleName}</td>
                                                            <td className="cell">{role.countUser}</td>
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllRole + "?PageNumber=" +  ( page.selected + 1 ) + "&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Roles             : response?.data?.body?.roles,
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
    }
}

export default IndexPage;