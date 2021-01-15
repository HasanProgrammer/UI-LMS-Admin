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
import jwt_decode    from "jwt-decode";
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
        Users              : [],
        TargetUser         : null, /*برای ارسال به سمت سرور*/
        IsOpenModal        : false,

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

        await Axios.get(`${RouteServer.Root + RouteServer.AllUser + "?PageNumber=1&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Users             : response?.data?.body?.users,
                CurrentPageNumber : paginationHeader?.CurrentPage,
                CountSizePerPage  : paginationHeader?.CountSizePerPage,
                TotalPages        : paginationHeader?.TotalPages,
                HasNextPage       : paginationHeader?.HasNext,
                HasPrevPage       : paginationHeader?.HasPrev
            });

            console.log(this.state.Users);

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
                                        <h4 style={{cursor: "default", fontFamily: "IRANSans"}}>همه کاربران سیستم</h4>
                                    </div>
                                    <div className="card-body">

                                        <div className="float-right">
                                            <Link className="btn btn-success action_button" to={`${Route.CreateUserPage}`}>
                                                <span>ساخت کاربر جدید</span>
                                            </Link>
                                        </div>

                                        <div className="clearfix mb-3"/>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                <tr>
                                                    <th className="cell">ردیف</th>
                                                    <th className="cell">نام کاربری</th>
                                                    <th className="cell">پست الکترونیکی</th>
                                                    <th className="cell">نقش های سیستمی</th>
                                                    <th className="cell">تصویر کاربر</th>
                                                    <th className="cell">وضعیت</th>
                                                    <th className="cell">عملیات</th>
                                                </tr>
                                                {
                                                    this.state.Users?.map((user, index) => (
                                                        <tr key={user.id}>
                                                            <td className="cell">
                                                                {index + 1}
                                                            </td>
                                                            <td className="cell">{user.userName}</td>
                                                            <td className="cell">{user.email}</td>
                                                            <td className="cell">
                                                                {
                                                                    user.roles?.map(role => (
                                                                        <>
                                                                            <br/>
                                                                            <span className="btn btn-info" style={{borderRadius: "0", padding: "0.5em"}}>{role?.roleName}</span>
                                                                            <br/>
                                                                            <br/>
                                                                        </>
                                                                    ))
                                                                }
                                                            </td>
                                                            <td className="cell">
                                                                {
                                                                    user.image != null
                                                                        ?
                                                                        <img style={{width: "6.5em", height: "6.5em", borderRadius: "0", margin: "0.8em"}}
                                                                             src={`${RouteServer.Root}/${user.image}`} alt="ندارد"/>
                                                                        :
                                                                        "ندارد"
                                                                }
                                                            </td>
                                                            <td className="cell">
                                                                {user.statusValue}
                                                            </td>
                                                            <td className="cell">
                                                                <br/>
                                                                <Link to={`${Route.EditUserPage.replace(":id", user.id)}`} id={user.id} onClick={this.onClickEditButton} className="btn btn-warning action_button" style={{borderRadius: "0", }}>ویرایش</Link>
                                                                <br/>
                                                                <br/>
                                                                {
                                                                    user.statusKey == 1
                                                                    ?
                                                                    (
                                                                        <button id={user.id} onClick={this.onClickInActiveButton} className="btn btn-warning action_button" style={{borderRadius: "0", }}>غیر فعال</button>
                                                                    )
                                                                    :
                                                                    (
                                                                        <button id={user.id} onClick={this.onClickActiveButton} className="btn btn-success action_button" style={{borderRadius: "0", }}>فعال</button>
                                                                    )
                                                                }
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

        await Axios.get(`${RouteServer.Root + RouteServer.AllUser + "?PageNumber=" +  ( page.selected + 1 ) + "&CountSizePerPage=" + PaginationConfig.CountItemPerPage}`, Configs).then(response => {

            let paginationHeader = JSON.parse(response.headers["x-pagination"]);

            this.setState({
                Users             : response?.data?.body?.users,
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
        localStorage.setItem("user", JSON.stringify(this.state.Users?.find(user => user.id == event.target.id)));
    };

    /**
     * @function onClickInActiveButton
     */
    onClickInActiveButton = async (event) =>
    {
        let users = this.state.Users?.slice();
        let user  = users.find(user => user.id == event.target.id);

        user.statusKey   = 0;
        user.statusValue = "غیر فعال";

        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.patch(`${RouteServer.Root + RouteServer.InActiveUser + event.target.id}`, null, Configs).then(response => {

            this.setState({
                Users : users
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
     * @function onClickActiveButton
     */
    onClickActiveButton = async (event) =>
    {
        let users = this.state.Users?.slice();
        let user  = users.find(user => user.id == event.target.id);

        user.statusKey   = 1;
        user.statusValue = "فعال";

        let Configs = {
            headers : {
                "Authorization" : `${"Bearer " + localStorage.getItem("Token")}`
            }
        };

        await Axios.patch(`${RouteServer.Root + RouteServer.ActiveUser + event.target.id}`, null, Configs).then(response => {

            this.setState({
                Users : users
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