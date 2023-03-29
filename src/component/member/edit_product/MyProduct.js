import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyProduct() {
    const [getinforLogin, setInfologin] = useState()
    const [getProduct, setProduct] = useState();
    const urlImg = 'http://localhost/laravel/public/upload/user/product/'
    useEffect(() => {
        const tam = localStorage.getItem("inforLogin")
        let inforLogin = JSON.parse(tam);
        setInfologin(inforLogin)
        // urlImg = 'http://localhost/laravel/public/upload/user/product/' + getinforLogin.Auth["id"] + '/';
        let config = {
            headers: {
                'Authorization': 'Bearer ' + inforLogin.success.token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        axios.get('http://localhost/laravel/public/api/user/my-product', config)
            .then(res => {
                // console.log(res.data.data)
                setProduct(res.data.data)
            })
            .catch(error => console.log(error))
    }, [])
    function renderProduct(e) {
        if (getProduct) {
            return Object.keys(getProduct).map((value, key) => {
                // console.log(getProduct[value]["id"])
                let img = JSON.parse(getProduct[value]["image"])
                // console.log(img[0])
                return (
                    <>
                        <tr>
                            <td>{getProduct[value]["id"]}</td>
                            <td>{getProduct[value]["name"]}</td>
                            <td>
                                <a><img style={{ width: "100px", height: "90px" }} src={urlImg + getinforLogin.Auth["id"] + '/' + img[0]} alt="img" /></a>
                            </td>
                            <td>$ {getProduct[value]["price"]}</td>
                            <td>
                                <Link to={"/EditProduct/"+getProduct[value]["id"]} style={{ margin: "0 4px" }}>
                                    <button className="fa fa-edit"></button>
                                </Link>
                                <a>
                                    <button id={getProduct[value]["id"]} onClick={deleteProduct} className="fa fa-times"></button>
                                </a>
                            </td>
                        </tr>
                    </>
                )
            })
        }
    }

    function deleteProduct(e) {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + getinforLogin.success.token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        let idProduct = e.target.id
        axios.get('http://localhost/laravel/public/api/user/delete-product/' + idProduct, config)
            .then((res) => {
                console.log(res)
                setProduct(res.data.data)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className="signup-form col-sm-12" style={{ float: "right", padding: "0 0 8px 0" }}>
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead style={{ background: "#FE980F", color: "#fff", fontSize: "20px" }}>
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Image</td>
                                <td>Price</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {renderProduct()}
                        </tbody>
                    </table>
                </div>
                <form>
                    <Link to="/AddProduct">
                        <button type="submit" className="btn btn-default">Add new</button>
                    </Link>
                </form>
            </div>
        </>
    )
}

export default MyProduct;