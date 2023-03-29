import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [itemLogin, setItemLogin] = useState({
        email: "",
        pass: "",
    })
    const [itemErr, setItemErr] = useState({})
    const ktMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const navigate = useNavigate()

    function hanldeIn(e) {
        const nameIn = e.target.name;
        const value = e.target.value;
        setItemLogin(state => ({ ...state, [nameIn]: value }))
    }
    function hanldeSubmit(e) {
        e.preventDefault();
        let kt = true;
        const errSubmit = {}

        if (itemLogin.email === "") {
            kt = false
            errSubmit.email = "Nhap dia chi email"
        } else {
            if (!ktMail.test(itemLogin.email)) {
                kt = false
                errSubmit.email = "Dia chi email khong dung dinh dang"
            } else {
                errSubmit.email = ""
            }
        }
        if (itemLogin.pass === "") {
            kt = false
            errSubmit.pass = "Vui long nhap password"
        } else {
            errSubmit.pass = ""
        }

        if (!kt) {
            setItemErr(errSubmit);
        } else {
            const dataPost = {
                email: itemLogin.email,
                password: itemLogin.pass,
                level: 0
            }
            axios.post("http://localhost/laravel/public/api/login", dataPost)
                .then((res) => {
                    if (res.data.errors) {
                        setItemErr(res.data.errors)
                    } else {
                        alert("is sucess")
                        setItemErr("")
                        navigate('/')
                        let checkLg = String(true)
                        localStorage.setItem('checkLogin', JSON.stringify(checkLg))
                        localStorage.setItem("inforLogin", JSON.stringify(res.data))
                    }
                })
        }
    }

    function renderErr() {
        if (Object.keys(itemErr).length > 0) {
            return Object.keys(itemErr).map((keys, index) => {
                return (
                    <p key={index}>{itemErr[keys]}</p>
                )
            })
        }
    }

    return (
        <section id="form">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-1">
                        <div className="login-form">
                            <h2>Login to your account</h2>
                            <form onSubmit={hanldeSubmit}>
                                <input value={itemLogin.email} type="email" onChange={hanldeIn} name="email" placeholder="Email Address" />
                                <input value={itemLogin.pass} type="password" onChange={hanldeIn} name="pass" placeholder="Password" />
                                <span>
                                    <input type="checkbox" className="checkbox" />
                                    Keep me signed in
                                </span>
                                <button type="submit" className="btn btn-default">Login</button>
                                {renderErr()}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;