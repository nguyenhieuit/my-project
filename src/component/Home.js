import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Home() {
    const [getProduct, setProduct] = useState();
    const navigate = useNavigate()
    const [context, setContext]=useContext(UserContext);
    const urlImg = 'http://localhost/laravel/public/upload/user/product/'
    useEffect(() => {
        axios.get("http://localhost/laravel/public/api/product")
        .then((res) => {
            // console.log(res.data.data)
            setProduct(res.data.data)
        })
        .catch(error => console.log(error))
    }, [])
    
    function renderProduct(e) {
        if (getProduct) {
            return Object.keys(getProduct).map((value, key) => {
                let img = JSON.parse(getProduct[value]["image"])
                return (
                    <>
                        <div className="col-sm-4">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center product-infor" id="productID1" >
                                        <img src={urlImg + getProduct[value]["id_user"] + "/" + img[0]} alt="img" />
                                        <h2>$ {getProduct[value]["price"]}</h2>
                                        <p>{getProduct[value]["name"]}</p>
                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                    </div>
                                    <div className="product-overlay">
                                        <div className="overlay-content">
                                            <h2>$ {getProduct[value]["price"]}</h2>
                                            <p>{getProduct[value]["name"]}</p>
                                            <button onClick={addCardClick} id={getProduct[value]["id"]} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                            <br></br>
                                            <Link to={"Product/" + getProduct[value]["id"]} className="btn btn-default" style={{ color: "#000" }}>Read more</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="choose">
                                    <ul className="nav nav-pills nav-justified">
                                        <li><a><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
                                        <li><a><i className="fa fa-plus-square"></i>Add to compare</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })
        }
    }
    function renderOther(e) {
        if (getProduct) {
            return Object.keys(getProduct).map((value, key) => {
                let img = JSON.parse(getProduct[value]["image"])
                return (
                    <>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-product">
                                    <div className="productinfo text-center">
                                        <img src={urlImg + getProduct[value]["id_user"] + "/" + img[0]} alt="" />
                                        <h2>$ {getProduct[value]["price"]}</h2>
                                        <p>{getProduct[value]["name"]}</p>
                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a></div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })
        }
    }
    
    
    function addCardClick(e) {
        let dataCart = {}
        const idPrd = e.target.id
        let tam = localStorage.getItem("dataCart")
        let x = 2;
        if (tam) {
            dataCart = JSON.parse(tam)
            Object.keys(dataCart).map((key, index) => {
                if (idPrd == key) {
                    dataCart[key] = dataCart[key] + 1
                    x = 1
                }
            })
        }
        if (x == 2) {
            dataCart[idPrd] = 1
        }
        localStorage.setItem("dataCart", JSON.stringify(dataCart))
        let total=0
        Object.keys(dataCart).map((key, value)=>{
            total=total+dataCart[key]
        })
        setContext(total)
    }

    return (
        <>
            <section id="slider">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div id="slider-carousel" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#slider-carousel" data-slide-to="0" className="active"></li>
                                    <li data-target="#slider-carousel" data-slide-to="1"></li>
                                    <li data-target="#slider-carousel" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <div className="col-sm-6">
                                            <h1><span>E</span>-SHOPPER</h1>
                                            <h2>Free E-Commerce Template</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                            <button type="button" className="btn btn-default get">Get it now</button>
                                        </div>
                                        <div className="col-sm-6">
                                            <img src="images/home/girl1.jpg" className="girl img-responsive" alt="" />
                                            <img src="images/home/pricing.png" className="pricing" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="col-sm-6">
                                            <h1><span>E</span>-SHOPPER</h1>
                                            <h2>100% Responsive Design</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                            <button type="button" className="btn btn-default get">Get it now</button>
                                        </div>
                                        <div className="col-sm-6">
                                            <img src="images/home/girl2.jpg" className="girl img-responsive" alt="" />
                                            <img src="images/home/pricing.png" className="pricing" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="col-sm-6">
                                            <h1><span>E</span>-SHOPPER</h1>
                                            <h2>Free Ecommerce Template</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                            <button type="button" className="btn btn-default get">Get it now</button>
                                        </div>
                                        <div className="col-sm-6">
                                            <img src="images/home/girl3.jpg" className="girl img-responsive" alt="" />
                                            <img src="images/home/pricing.png" className="pricing" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
                                    <i className="fa fa-angle-left"></i>
                                </a>
                                <a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
                                    <i className="fa fa-angle-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 padding-right">
                            <div className="features_items">
                                <h2 className="title text-center">Features Items</h2>
                                {renderProduct()}
                            </div>
                            <div className="category-tab">
                                <div className="col-sm-12">
                                    <ul className="nav nav-tabs">
                                        <li className="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
                                        <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
                                        <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
                                        <li><a href="#kids" data-toggle="tab">Kids</a></li>
                                        <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade active in" id="tshirt" >
                                        {renderOther()}
                                    </div>
                                    <div className="tab-pane fade" id="blazers" >
                                    </div>
                                    <div className="tab-pane fade" id="sunglass" >
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="kids" >
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="poloshirt" >
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="product-image-wrapper">
                                                <div className="single-products">
                                                    <div className="productinfo text-center">
                                                        <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                        <h2>$56</h2>
                                                        <p>Easy Polo Black Edition</p>
                                                        <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="recommended_items">
                                <h2 className="title text-center">recommended items</h2>

                                <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="item active">
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="product-image-wrapper">
                                                    <div className="single-products">
                                                        <div className="productinfo text-center">
                                                            <img src="https://kenh14cdn.com/2020/7/28/912091346584599615870746140411367523352576o-15959203704761716831055.jpg" alt="" />
                                                            <h2>$56</h2>
                                                            <p>Easy Polo Black Edition</p>
                                                            <a className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                                        <i className="fa fa-angle-left"></i>
                                    </a>
                                    <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                                        <i className="fa fa-angle-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;