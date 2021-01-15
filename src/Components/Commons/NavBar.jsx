import React from "react";

/*-------------------------------------------------------------------*/

//Components

/*-------------------------------------------------------------------*/

/**
 * @class HomePage
 */
class NavBar extends React.Component
{
    /**
     * @property state
     */
    state = {};

    /**
     * @function render
     */
    render()
    {
        return (
            <div>
                <div className="navbar-bg"/>
                <nav className="navbar navbar-expand-lg main-navbar">

                    <div className="form-inline mr-auto">
                        <ul className="navbar-nav mr-3">
                            {/*<li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg collapse-btn"><i className="fas fa-bars"/></a></li>*/}
                            <li>
                                <a href="#" className="nav-link nav-link-lg fullscreen-btn"><i className="fas fa-expand"/></a>
                            </li>
                        </ul>
                    </div>

                    <ul className="navbar-nav navbar-right">

                        {/*<li className="dropdown dropdown-list-toggle">*/}
                        {/*    <a href="#" data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg">*/}
                        {/*        <i className="far fa-bell"/>*/}
                        {/*        <span className="notification-count bg-green">4</span>*/}
                        {/*    </a>*/}
                        {/*    */}
                        {/*    <div className="dropdown-menu dropdown-list dropdown-menu-right">*/}
                        {/*        <div className="dropdown-header">7 اعلان جدید*/}
                        {/*            <div className="float-right">*/}
                        {/*                <a href="#">2 گفت‌گو خوانده نشده</a>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    */}
                        {/*        <div className="dropdown-list-content dropdown-list-icons">*/}
                        {/*            <a href="#" className="dropdown-item dropdown-item-unread">*/}
                        {/*              <span className="dropdown-item-icon l-bg-green text-white">*/}
                        {/*                <i className="fas fa-shopping-cart"/>*/}
                        {/*              </span>*/}
                        {/*                <span className="dropdown-item-desc">*/}
                        {/*                    5 فروش محصول<span className="time">8 ساعت قبل</span>*/}
                        {/*                </span>*/}
                        {/*            </a>*/}
                        {/*        </div>*/}
                        {/*    */}
                        {/*        <div className="dropdown-footer text-center">*/}
                        {/*            <a href="#">مشاهده همه<i className="fas fa-chevron-left"/></a>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</li>*/}

                        {/*<li className="dropdown dropdown-list-toggle">*/}
                        {/*    <a href="#" data-toggle="dropdown" className="nav-link nav-link-lg beep">*/}
                        {/*        <i className="far fa-envelope"/>*/}
                        {/*    </a>*/}
                        {/*    */}
                        {/*    <div className="dropdown-menu dropdown-list dropdown-menu-right">*/}
                        {/*        <div className="dropdown-header">پیام ها*/}
                        {/*            <div className="float-right">*/}
                        {/*                <a href="#">علامت به عنوان خوانده شده</a>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}

                        {/*        <div className="dropdown-list-content dropdown-list-message">*/}
                        {/*            <a href="#" className="dropdown-item">*/}
                        {/*                <span className="dropdown-item-avatar text-white">*/}
                        {/*                    <img alt="image" src="/Assets/img/users/user-5.png" className="image-square"/>*/}
                        {/*                </span>*/}
                        {/*                <span className="dropdown-item-desc">*/}
                        {/*                    <span className="message-user">نیلوفر</span>*/}
                        {/*                    <span className="time messege-text">برنامه ریز پروژه</span>*/}
                        {/*                    <span className="time">ده دقیقه قبل</span>*/}
                        {/*                </span>*/}
                        {/*            </a>*/}
                        {/*        </div>*/}

                        {/*        <div className="dropdown-footer text-center">*/}
                        {/*            <a href="#">مشاهده همه <i className="fas fa-chevron-left"/></a>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</li>*/}

                        <li className="dropdown">
                            <a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                                <img alt="تصویر" src="/Assets/img/user.png" className="user-img-radious-style"/>
                                <span className="d-sm-none d-lg-inline-block"/>
                            </a>
                            {/*<div className="dropdown-menu dropdown-menu-right">*/}
                            {/*    <div className="dropdown-title">سلام مدیر</div>*/}
                            {/*    <a href="" className="dropdown-item has-icon">*/}
                            {/*        <i className="far fa-user"/> پروفایل*/}
                            {/*    </a>*/}
                            {/*    <a href="" className="dropdown-item has-icon">*/}
                            {/*        <i className="fas fa-bolt"/> فعالیت ها*/}
                            {/*    </a>*/}
                            {/*    <a href="#" className="dropdown-item has-icon">*/}
                            {/*        <i className="fas fa-cog"/> تنظیمات*/}
                            {/*    </a>*/}
                            {/*    <div className="dropdown-divider"/>*/}
                            {/*    <a href="" className="dropdown-item has-icon text-danger">*/}
                            {/*        <i className="fas fa-sign-out-alt"/> خروج*/}
                            {/*    </a>*/}
                            {/*</div>*/}
                        </li>
                    </ul>
                </nav>

            </div>
        );
    }
}

export default NavBar;