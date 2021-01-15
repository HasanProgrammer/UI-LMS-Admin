import React        from "react";
import { Redirect } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components
import SideBar from "./Commons/SideBar";

/*-------------------------------------------------------------------*/

//Configs
import Route from "./../Configs/Route.json";

/*-------------------------------------------------------------------*/

//Plugins
import { ToastContainer } from "react-toastify";

/*-------------------------------------------------------------------*/

/**
 * @class HomePage
 */
class MasterPage extends React.Component
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
        return localStorage.getItem("Token") === null ? ( <Redirect to={`${Route.LoginPage}`}/> ) : (
            <div>
                <SideBar/>
                {this.props.children}
                <ToastContainer/>
            </div>
        )
    }
}

export default MasterPage;