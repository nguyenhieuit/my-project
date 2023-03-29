import {Link} from "react-router-dom";

function MenuAcc() {
    return (
        <>
            <div className="left-sidebar">
                <h2>Account</h2>
                <div className="panel-group category-products" id="accordian">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                    ACCOUNT
                                </a>
                            </h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <Link to="/MyProduct" data-toggle="collapse" data-parent="#accordian">
                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                    MY PRODUCT
                                </Link>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuAcc;