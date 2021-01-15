import React    from "react";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Configs
import RouteConfig from "./../../Configs/Route";

/*-------------------------------------------------------------------*/

//Plugins
import jwt_decode from "jwt-decode";

/*-------------------------------------------------------------------*/

/**
 * @class Footer
 */
class SideBar extends React.Component
{
    /**
     * @property state
     */
    state =
    {

    };

    /**
     * @function render
     */
    render()
    {
        return (
            <div className="main-sidebar sidebar-style-2">
                <aside id="sidebar-wrapper">

                    <ul className="sidebar-menu" style={{marginTop: "3em"}}>
                        {/*<li className="dropdown active" style={{display: "block"}}>*/}
                        {/*    <div className="sidebar-profile">*/}
                        {/*        <div className="siderbar-profile-pic">*/}
                        {/*            <img src={localStorage.getItem("UserImage") == "null" ? "/Assets/img/users/user-4.png" : localStorage.getItem("UserImage") } className="profile-img-circle box-center" alt=""/>*/}
                        {/*        </div>*/}
                        {/*        <div className="siderbar-profile-details">*/}
                        {/*            <div className="siderbar-profile-name">{localStorage.getItem("UserName")}</div>*/}
                        {/*            <br/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</li>*/}

                        <li className={`${window.location.pathname === RouteConfig.HomePage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} to={`${RouteConfig.HomePage}`} className="nav-link">
                                <i className="fas fa-desktop"/><span>داشبورد</span>
                            </Link>
                        </li>

                        {
                            localStorage.getItem("Token") !== null && jwt_decode(localStorage.getItem("Token")).role === "Admin"
                            ?
                            (
                                <>
                                    <li className={`${window.location.pathname === RouteConfig.AllUserPage ? "active" : ""}`}>
                                        <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.AllUserPage}`}>
                                            <i className="fas fa-meteor"/><span>کاربران سیستم</span>
                                        </Link>
                                    </li>

                                    <li className={`${window.location.pathname === RouteConfig.AllRolePage ? "active" : ""}`}>
                                        <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.AllRolePage}`}>
                                            <i className="fas fa-meteor"/><span>نقش های سیستمی</span>
                                        </Link>
                                    </li>

                                    <li className={`${window.location.pathname === RouteConfig.AllCategoryPage ? "active" : ""}`}>
                                        <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.AllCategoryPage}`}>
                                            <i className="fas fa-meteor"/><span>دسته بندی ها</span>
                                        </Link>
                                    </li>
                                </>
                            )
                            :
                            null
                        }

                        <li className={`${window.location.pathname === RouteConfig.AllTermPage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.AllTermPage}`}>
                                <i className="fas fa-meteor"/><span>دوره های برنامه نویسی</span>
                            </Link>
                        </li>

                        <li className={`${window.location.pathname === RouteConfig.AllChapterPage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.AllChapterPage}`}>
                                <i className="fas fa-meteor"/><span>فصول برنامه نویسی</span>
                            </Link>
                        </li>


                        <li className={`${window.location.pathname === RouteConfig.AllVideoPage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.AllVideoPage}`}>
                                <i className="fas fa-meteor"/><span>فیلم های برنامه نویسی</span>
                            </Link>
                        </li>

                        <li className={`${window.location.pathname === RouteConfig.AllQuestionPage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.AllQuestionPage}`}>
                                <i className="fas fa-meteor"/><span>پرسش و پاسخ</span>
                            </Link>
                        </li>

                        <li className={`${window.location.pathname === RouteConfig.AllTransactionPage ? "active" : ""}`}>
                            <Link onClick={this.onClickLink} className="nav-link" to={`${RouteConfig.AllTransactionPage}`}>
                                <i className="fas fa-meteor"/><span>تراکنش های مالی</span>
                            </Link>
                        </li>

                        <li>
                            <Link onClick={this.onClickExit} className="nav-link">
                                <i className="fas fa-meteor"/><span>خروج</span>
                            </Link>
                        </li>
                    </ul>
                </aside>
            </div>
        );
    }

    /*---------------------------------------------------------------CUSTOM---------------------------------------------------------------*/

    /**
     * @function onClickLink
     */
    onClickLink = () =>
    {
        this.setState({});
    };

    /**
     * @function onClickExit
     */
    onClickExit = () =>
    {
        localStorage.removeItem("Token");
    }
}

export default SideBar;