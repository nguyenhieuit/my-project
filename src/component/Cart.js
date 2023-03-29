import axios from "axios";
import { useEffect, useState } from "react";

function Cart() {

    const [getProduct, setProduct] = useState();
    const [dataCart, setDataCart] = useState();
    let urlApi = "http://localhost/laravel/public/api/product/cart"
    let urlImg = "http://localhost/laravel/public/upload/user/product/"

    useEffect(() => {
        const tam = localStorage.getItem("dataCart")
        if (tam) {
            setDataCart(JSON.parse(tam))
        }
        axios.post(urlApi, dataCart)
            .then((res) => {
                // console.log(res.data.data)
                setProduct(res.data.data)
            })
    }, [])
    // console.log(getProduct)
    function renderProductCart(e) {
        if (getProduct) {
            return getProduct.map((value, key) => {
                let img = JSON.parse(value['image'])
                const total = Number(value['qty']) * Number(value['price'])
                return (
                    <>
                        <tr style={{ borderBottom: "2px solid #FE980F" }}>
                            <td className="cart_product">
                                <a><img style={{ width: "100px", height: "120px" }} src={urlImg + value['id_user'] + "/" + img[0]} alt="img" /></a>
                            </td>
                            <td className="cart_description">
                                <h4><a>{value["name"]}</a></h4>
                                <p>Web ID: 1089772</p>
                            </td>
                            <td className="cart_price">
                                <p>$ {value["price"]}</p>
                            </td>
                            <td className="cart_quantity">
                                <div className="cart_quantity_button">
                                    <a id={value["id"]} onClick={clickQtyUp} className="cart_quantity_up"> + </a>
                                    <input className="cart_quantity_input" type="text" name="quantity" value={value["qty"]} autocomplete="off" size="2" />
                                    <a id={value["id"]} onClick={clickQtyDown} className="cart_quantity_down"> - </a>
                                </div>
                            </td>
                            <td className="cart_total">
                                <p className="cart_total_price">$ {total}</p>
                            </td>
                            <td className="cart_delete" id={value["id"]}>
                                <a id={value["id"]} className="cart_quantity_delete"><i id={value["id"]} onClick={clickDeleteProduct} className="fa fa-times"></i></a>
                            </td>
                        </tr>
                    </>
                )
            })
        }
    }

    function clickQtyUp(e) {
        let id = e.target.id
        Object.keys(dataCart).map((key, value) => {
            if (id == key) {
                dataCart[key]++
            }
        })
        localStorage.setItem("dataCart", JSON.stringify(dataCart))

        let getProduct2 = [...getProduct];
        Object.keys(getProduct2).map((key, value) => {
            if (getProduct2[key]["id"] == id) {
                getProduct2[key]["qty"]++
            }
        })
        setProduct(getProduct2)
    }

    function clickQtyDown(e) {
        let id = e.target.id
        Object.keys(dataCart).map((key, value) => {
            if (id == key) {
                dataCart[key] = dataCart[key] - 1
            }
            if(dataCart[key]==0){
                delete dataCart[key]
            }
        })
        localStorage.setItem("dataCart", JSON.stringify(dataCart))
        
        let getProduct2 = [...getProduct];
        getProduct2.map((key, value)=>{
            if(key["id"]==id){
                key["qty"]=key["qty"]-1
            }
            if(key["qty"]==0){
                const filterArr = getProduct2.filter(function (e) { return e != key })
                setProduct(filterArr)
            }
        })
        setProduct(getProduct2)
    }

    function clickDeleteProduct(e) {
        let id = e.target.id
        Object.keys(dataCart).map((key, value) => {
            if (id == key) {
                delete dataCart[key]
            }
        })
        localStorage.setItem("dataCart", JSON.stringify(dataCart))

        let getProduct2 = [...getProduct];
        getProduct2.map((key, value)=>{
            if (key["id"] == id) {
                const filterArr = getProduct2.filter(function (e) { return e != key })
                setProduct(filterArr)
            }
        })
    }

    function renderSubTotal(e){
        let subTotal=0
        if(getProduct){
            getProduct.map((key, value)=>{
                subTotal=subTotal+key["qty"]
            })
            return(
                <>
                    <li>Cart Sub Total <span>{subTotal}</span></li>
                </>
            )
        }
    }
    function renderTotal(e){
        let total=0
        if(getProduct){
            getProduct.map((key, value)=>{
                total=total+(Number(key["qty"])*Number(key["price"]))
            })
            return(
                <>
                    <li className="total-Cart">Total <span>$ {total}</span></li>
                </>
            )
        }
    }

    return (
        <>
            <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu" style={{ backgroundColor: "#FE980F", }}>
                            <td className="image">Item</td>
                            <td className="description">Description</td>
                            <td className="price">Price</td>
                            <td className="quantity">Quantity</td>
                            <td className="total">Total</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderProductCart()}
                    </tbody>
                </table>
            </div>
            <div className="container col-sm-12">
                <div className="heading">
                    <h3>What would you like to do next?</h3>
                    <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="chose_area">
                            <ul className="user_option">
                                <li>
                                    <input type="checkbox" />
                                    <label>Use Coupon Code</label>
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <label>Use Gift Voucher</label>
                                </li>
                                <li>
                                    <input type="checkbox" />
                                    <label>Estimate Shipping &amp; Taxes</label>
                                </li>
                            </ul>
                            <ul className="user_info">
                                <li className="single_field">
                                    <label>Country:</label>
                                    <select>
                                        <option>United States</option>
                                        <option>Bangladesh</option>
                                        <option>UK</option>
                                        <option>India</option>
                                        <option>Pakistan</option>
                                        <option>Ucrane</option>
                                        <option>Canada</option>
                                        <option>Dubai</option>
                                    </select>

                                </li>
                                <li className="single_field">
                                    <label>Region / State:</label>
                                    <select>
                                        <option>Select</option>
                                        <option>Dhaka</option>
                                        <option>London</option>
                                        <option>Dillih</option>
                                        <option>Lahore</option>
                                        <option>Alaska</option>
                                        <option>Canada</option>
                                        <option>Dubai</option>
                                    </select>

                                </li>
                                <li className="single_field zip-field">
                                    <label>Zip Code:</label>
                                    <input type="text" />
                                </li>
                            </ul>
                            <a className="btn btn-default update" href="">Get Quotes</a>
                            <a className="btn btn-default check_out" href="">Continue</a>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="total_area">
                            <ul>
                                {renderSubTotal()}
                                <li>Eco Tax <span>$2</span></li>
                                <li>Shipping Cost <span>Free</span></li>
                                {renderTotal()}
                            </ul>
                            <a className="btn btn-default update" href="">Update</a>
                            <a className="btn btn-default check_out" href="">Check Out</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;