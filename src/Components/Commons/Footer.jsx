import React from "react";

/*-------------------------------------------------------------------*/

/**
 * @class Footer
 */
class Footer extends React.Component
{
    /**
     * @property state
     */
    state = {};

    /**
     * @constructor
     * @param props
     */
    constructor(props)
    {
        super(props);
    }

    /**
     * @function render
     */
    render()
    {
        return (
            <footer className="main-footer">
                <div className="align-center">
                    پنل ادمین پیشرفته حسن کرمی محب
                </div>
            </footer>
        );
    }
}

export default Footer;