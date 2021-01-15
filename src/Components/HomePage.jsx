import React from "react";

/*-------------------------------------------------------------------*/

//Components
import MasterPage from "./MasterPage";

/*-------------------------------------------------------------------*/

/**
 * @class HomePage
 */
class HomePage extends React.Component
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
            <MasterPage>
                <div className="main-content">
                    <section className="section" style={{marginTop: "-6em"}}>

                        <div className="section-header">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <div className="section-header-breadcrumb-content">
                                        <h1 style={{fontFamily: "IRANSans", cursor: "default"}}>داشبورد</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="card card-sales-widget card-bg-blue-gradient" style={{borderRadius: "0", padding: "1em"}}>
                                    <div className="card-icon shadow-primary bg-blue" style={{borderRadius: "0"}}>
                                        <i className="fas fa-user-plus"/>
                                    </div>
                                    <div className="card-wrap pull-right">
                                        <div className="card-header pl-4">
                                            <h3 style={{fontFamily: "IRANSans", cursor: "default"}}>1437</h3>
                                            <h4 style={{fontFamily: "IRANSans", cursor: "default"}}>مشتریان جدید</h4>
                                        </div>
                                    </div>
                                    <div className="card-chart">
                                        <div id="chart-1"/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="card card-sales-widget card-bg-yellow-gradient" style={{borderRadius: "0", padding: "1em"}}>
                                    <div className="card-icon shadow-primary bg-warning" style={{borderRadius: "0"}}>
                                        <i className="fas fa-drafting-compass"/>
                                    </div>
                                    <div className="card-wrap pull-right">
                                        <div className="card-header pl-4">
                                            <h3 style={{fontFamily: "IRANSans", cursor: "default"}}>2،021</h3>
                                            <h4 style={{fontFamily: "IRANSans", cursor: "default"}}>سفارشات تحویل داده شده</h4>
                                        </div>
                                    </div>
                                    <div className="card-chart">
                                        <div id="chart-2"/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="card card-sales-widget card-bg-orange-gradient" style={{borderRadius: "0", padding: "1em"}}>
                                    <div className="card-icon shadow-primary bg-hibiscus" style={{borderRadius: "0"}}>
                                        <i className="fas fa-shopping-cart"/>
                                    </div>
                                    <div className="card-wrap pull-right">
                                        <div className="card-header pl-4" style={{paddingLeft: "0.5em"}}>
                                            <h3 style={{fontFamily: "IRANSans", cursor: "default"}}>5،124</h3>
                                            <h4 style={{fontFamily: "IRANSans", cursor: "default"}}>کل امانات</h4>
                                        </div>
                                    </div>
                                    <div className="card-chart">
                                        <div id="chart-3"/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="card card-sales-widget card-bg-green-gradient" style={{borderRadius: "0", padding: "1em"}}>
                                    <div className="card-icon shadow-primary bg-green" style={{borderRadius: "0"}}>
                                        <i className="fas fa-dollar-sign"/>
                                    </div>
                                    <div className="card-wrap pull-right">
                                        <div className="card-header pl-4" style={{paddingLeft: "0.5em"}}>
                                            <h3 style={{fontFamily: "IRANSans", cursor: "default"}}>50،789 ریال</h3>
                                            <h4 style={{fontFamily: "IRANSans", cursor: "default"}}>کل درآمد</h4>
                                        </div>
                                    </div>
                                    <div className="card-chart">
                                        <div id="chart-4"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            </MasterPage>
        )
    }
}

export default HomePage;