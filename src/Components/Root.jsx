import React from "react";
import { BrowserRouter as Router , Switch , Route } from "react-router-dom";

/*-------------------------------------------------------------------*/

//Components
import HomePage           from "./HomePage";
import LoginPage          from "./LoginPage";

import CreateCategoryPage from "./CategoryPages/CreatePage";
import EditCategoryPage   from "./CategoryPages/EditPage";
import IndexCategoryPage  from "./CategoryPages/IndexPage";

import CreateRolePage     from "./RolePages/CreatePage";
import IndexRolePage      from "./RolePages/IndexPage";

import CreateUserPage     from "./UserPages/CreatePage";
import EditUserPage       from "./UserPages/EditPage";
import IndexUserPage      from "./UserPages/IndexPage";

import CreateTermPage     from "./TermPages/CreatePage";
import EditTermPage       from "./TermPages/EditPage";
import IndexTermPage      from "./TermPages/IndexPage";

import CreateChapterPage  from "./ChapterPages/CreatePage";
import EditChapterPage    from "./ChapterPages/EditPage";
import IndexChapterPage   from "./ChapterPages/IndexPage";

import CreateVideoPage    from "./VideoPages/CreatePage";
import EditVideoPage      from "./VideoPages/EditPage";
import IndexVideoPage     from "./VideoPages/IndexPage";

import IndexQuestionPage  from "./QuestionPages/IndexPage";

import CreateAnswerPage   from "./AnswerPages/CreatePage";
import EditAnswerPage     from "./AnswerPages/EditPage";
import IndexAnswerPage    from "./AnswerPages/IndexPage";

import IndexTranPage      from "./TransactionPages/IndexPage";

/*-------------------------------------------------------------------*/

//Configs
import RouteConfig  from "./../Configs/Route";

/*-------------------------------------------------------------------*/

/**
 * @class Root
 */
class Root extends React.Component
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
            <Router>
                <Switch>

                    {/*==============================================Admin Panel==============================================*/}

                    {/*Home*/}
                    <Route exact path={`${RouteConfig.HomePage}`} component={HomePage}/>
                    {/*Home*/}

                    {/*Term*/}
                    <Route exact path={`${RouteConfig.AllTermPage}`}    component={IndexTermPage}/>
                    <Route exact path={`${RouteConfig.CreateTermPage}`} component={CreateTermPage}/>
                    <Route exact path={`${RouteConfig.EditTermPage}`}   component={EditTermPage}/>
                    {/*Term*/}

                    {/*Chapter*/}
                    <Route exact path={`${RouteConfig.AllChapterPage}`}    component={IndexChapterPage}/>
                    <Route exact path={`${RouteConfig.EditChapterPage}`}   component={EditChapterPage}/>
                    <Route exact path={`${RouteConfig.CreateChapterPage}`} component={CreateChapterPage}/>
                    {/*Chapter*/}

                    {/*Video*/}
                    <Route exact path={`${RouteConfig.AllVideoPage}`}    component={IndexVideoPage}/>
                    <Route exact path={`${RouteConfig.CreateVideoPage}`} component={CreateVideoPage}/>
                    <Route exact path={`${RouteConfig.EditVideoPage}`}   component={EditVideoPage}/>
                    {/*Video*/}

                    {/*Question*/}
                    <Route exact path={`${RouteConfig.AllQuestionPage}`} component={IndexQuestionPage}/>
                    {/*Question*/}

                    {/*Answer*/}
                    <Route exact path={`${RouteConfig.AllAnswerPage}`}    component={IndexAnswerPage}/>
                    <Route exact path={`${RouteConfig.CreateAnswerPage}`} component={CreateAnswerPage}/>
                    <Route exact path={`${RouteConfig.EditAnswerPage}`}   component={EditAnswerPage}/>
                    {/*Answer*/}

                    {/*Transaction*/}
                    <Route exact path={`${RouteConfig.AllTransactionPage}`} component={IndexTranPage}/>
                    {/*Transaction*/}

                    {/*Category*/}
                    <Route exact path={`${RouteConfig.AllCategoryPage}`}    component={IndexCategoryPage}/>
                    <Route exact path={`${RouteConfig.CreateCategoryPage}`} component={CreateCategoryPage}/>
                    <Route exact path={`${RouteConfig.EditCategoryPage}`}   component={EditCategoryPage}/>
                    {/*Category*/}

                    {/*Role*/}
                    <Route exact path={`${RouteConfig.AllRolePage}`}    component={IndexRolePage}/>
                    <Route exact path={`${RouteConfig.CreateRolePage}`} component={CreateRolePage}/>
                    {/*Role*/}

                    {/*User*/}
                    <Route exact path={`${RouteConfig.AllUserPage}`}    component={IndexUserPage}/>
                    <Route exact path={`${RouteConfig.CreateUserPage}`} component={CreateUserPage}/>
                    <Route exact path={`${RouteConfig.EditUserPage}`}   component={EditUserPage}/>
                    {/*User*/}

                    {/*==============================================Admin Panel==============================================*/}

                    <Route path={`${RouteConfig.LoginPage}`} component={LoginPage}/>

                </Switch>
            </Router>
        );
    }
}

export default Root;