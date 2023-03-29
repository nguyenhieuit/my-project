import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Product() {
    let params = useParams();
    const urlImg = 'http://localhost/laravel/public/upload/user/product/'
    const urlApi = 'http://localhost/laravel/public/api/product/detail/' + params.id
    const [getProduct, setProduct] = useState();
    const [imgPrd, setImgPrd] = useState();

    useEffect(() => {
        axios.get(urlApi)
            .then((res) => {
                // console.log(res.data.data)
                setProduct(res.data.data)
                setImgPrd(JSON.parse(res.data.data["image"])[0])
            })
    }, [])

    function renderProduct(e) {
        if (getProduct) {
            return (
                <>
                    <h2>{getProduct["name"]}</h2>
                    <p>Web ID: {getProduct["web_id"]}</p>
                    <span>
                        <span>US ${getProduct["price"]}</span>
                        <label>Quantity: </label>
                        <input type="text" value="3" /><br></br>
                        <button type="button" className="btn btn-fefault cart">
                            <i className="fa fa-shopping-cart"></i> Add to cart
                        </button>
                    </span>
                    <p><b>Category:</b> In Stock</p>
                    <p><b>Brand:</b> {getProduct["id_brand"]}</p>
                    <p><b>Status:</b> E-SHOPPER</p>
                </>
            )
        }
    }
    function renderImg(e) {
        if (getProduct) {
            if (imgPrd) {
                return (
                    <>
                        <div className="view-product">
                            <img src={urlImg + getProduct["id_user"] + "/" + imgPrd} alt="" />
                            <a href="goocle.com" rel="prettyPhoto"><h3>ZOOM</h3></a>
                        </div>
                    </>
                )
            }
        }
    }
    function renderListImg(e) {
        if (getProduct) {
            let img=JSON.parse(getProduct["image"])
            if (img) {
                return img.map((value, key) => {
                    return (
                        <a >
                            <img src={urlImg + getProduct["id_user"] + "/" + value} alt="" id={value} onClick={clickImg} style={{ maxWidth: "50px", maxHeight: "50px" }}/>
                        </a>
                    )
                })
            }
        }
    }
    function clickImg(e) {
        let value = e.target.id
        // console.log(value)
        setImgPrd(value)
    }

    return (
        <>
            <div className="col-sm-12 padding-right">
                <div className="product-details">
                    <div className="col-sm-5">
                        {renderImg()}
                        <div id="similar-product" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="item active">
                                    {renderListImg()}
                                    {/* <a href="goocle.com"><img src="images/product-details/similar1.jpg" alt="" /></a>
                                    <a href="goocle.com"><img src="images/product-details/similar2.jpg" alt="" /></a>
                                    <a href="goocle.com"><img src="images/product-details/similar3.jpg" alt="" /></a> */}
                                </div>
                                {/* <div className="item">
                                    {renderListImg()}
                                </div>
                                <div className="item">
                                    {renderListImg()}
                                </div> */}
                            </div>
                            <a className="left item-control" href="" data-slide="prev">
                                <i className="fa fa-angle-left"></i>
                            </a>
                            <a className="right item-control" href="" data-slide="next">
                                <i className="fa fa-angle-right"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="product-information">
                            {renderProduct()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;