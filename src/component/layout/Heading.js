import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

function Heading() {
    const [context, setContext]=useContext(UserContext)

    function renderLogin() {
        const checkLog = localStorage.getItem("checkLogin")
        if (!checkLog) {
            return (
                <>
                    <li><Link to="/Login"><i className="fa fa-star"></i> Login</Link></li>
                </>
            )
        } else {
            return (
                <>
                    <li onClick={logout}><Link to="/Login"><i className="fa fa-sign-out"></i> Logout</Link></li>
                </>
            )
        }
    }
    function renderAccount() {
        const checkLog = localStorage.getItem("checkLogin")
        if (checkLog) {
            return (
                <>
                    <li><Link to="/Account"><i className="fa fa-user"></i> Account</Link></li>
                </>
            )
        }
    }

    function logout() {
        localStorage.removeItem("checkLogin")
    }
    return (
        <>
            <header id="header">
                <div className="header_top">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="contactinfo">
                                    <ul className="nav nav-pills">
                                        <li><a href="google.com"><i className="fa fa-phone"></i> +2 95 01 88 821</a></li>
                                        <li><a href="google.com"><i className="fa fa-envelope"></i> info@domain.com</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="social-icons pull-right">
                                    <ul className="nav navbar-nav">
                                        <li><a href="google.com"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="google.com"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="google.com"><i className="fa fa-linkedin"></i></a></li>
                                        <li><a href="google.com"><i className="fa fa-dribbble"></i></a></li>
                                        <li><a href="google.com"><i className="fa fa-google-plus"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 clearfix">
                                <div className="logo pull-left">
                                    <a href="index.html"><img src="images/home/logo.png" alt="" /></a>
                                </div>
                                <div className="btn-group pull-right clearfix">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                            USA
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="google.com">Canada</a></li>
                                            <li><a href="google.com">UK</a></li>
                                        </ul>
                                    </div>

                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                            DOLLAR
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="google.com">Canadian Dollar</a></li>
                                            <li><a href="google.com">Pound</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 clearfix">
                                <div className="shop-menu clearfix pull-right">
                                    <ul className="nav navbar-nav">
                                        {renderAccount()}
                                        <li><a><i className="fa fa-list-alt"></i> Wishlist</a></li>
                                        <li><a><i className="fa fa-star"></i> Checkout</a></li>
                                        <li><Link to="/cart"><i className="fa fa-shopping-cart"></i>{context} Cart</Link></li>
                                        {renderLogin()}
                                        <li><Link to="/Register"><i className="fa fa-star"></i> Register</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>
                                <div className="mainmenu pull-left">
                                    <ul className="nav navbar-nav collapse navbar-collapse">
                                        <li><Link to="/Home" className="active">Home</Link></li>
                                        {/* <li><a href="index.html" className="active">Home</a></li> */}
                                        <li className="dropdown"><Link to="shop"><i className="fa fa-angle-down"></i> Shop</Link>
                                            <ul role="menu" className="sub-menu">
                                                <li><a href="shop.html">Products</a></li>
                                                <li><a href="product-details.html">Product Details</a></li>
                                                <li><a href="checkout.html">Checkout</a></li>
                                                <li><a href="cart.html">Cart</a></li>
                                            </ul>
                                        </li>
                                        <li><Link to="/cart"><i className="fa fa-shopping-cart"></i> {context} Cart</Link></li>
                                        <li className="dropdown">
                                            <Link to="/blog"><i className="fa fa-angle-down"></i> Blog</Link>
                                            <ul role="menu" className="sub-menu">
                                                <li><Link to="/Blogdetail">Blog Detail</Link></li>
                                                {/* <li><a href="blog.html">Blog Detail</a></li> */}
                                                <li><a href="blog-single.html">Blog Single</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="google.com">404</a></li>
                                        <li><a href="google.com">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="search_box pull-right">
                                    <input type="text" placeholder="Search" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Heading;