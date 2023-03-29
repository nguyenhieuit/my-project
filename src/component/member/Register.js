import axios from "axios";
import { useState } from "react";

function Register() {
    const [item, setItem] = useState({
        fullname: "",
        email: "",
        pass: "",
        phone: "",
        add: "",
        avt: "",
        level: ""
    })
    const [itemErr, setItemErr] = useState({})
    const [avatar, setAvatar] = useState('')
    const [file, setFile] = useState('')
    const ktMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const ktType = ["png", "jpg", "jpeg", "PNG", "JPG"]

    function handelIn(e) {
        const nameIn = e.target.name;
        const value = e.target.value;
        setItem(state => ({ ...state, [nameIn]: value }))
    }

    function hanldeFile(e) {
        const file = e.target.files;
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);//post len API
            setFile(file[0]);//luu thong tin file upload
        };
        reader.readAsDataURL(file[0])
    }
    console.log(file)
    // console.log(avatar)
    function hanldeSubmit(e) {
        e.preventDefault();
        let kt = true
        const errSubmit = {}
        let typeImg = file.name;
        let typeSplit = typeImg.split(".")
        let tam = typeSplit[1]


        if (item.fullname === "") {
            kt = false
            errSubmit.fullname = "Vui long nhap ho ten";
        } else {
            errSubmit.fullname = "";
        }
        if (item.email === "") {
            kt = false
            errSubmit.email = "Nhap dia chi email";
        } else {
            if (!ktMail.test(item.email)) {
                kt = false
                errSubmit.email = "Dia chi email khong dung dinh dang"
            } else {
                errSubmit.email = ""
            }
        }
        if (item.pass === "") {
            kt = false
            errSubmit.pass = "Nhap mat khau";
        } else {
            errSubmit.pass = ""
        }
        if (item.phone === "") {
            kt = false
            errSubmit.phone = "Nhap so dien thoai"
        } else {
            errSubmit.phone = ""
        }
        if (item.add === "") {
            kt = false
            errSubmit.add = "Nhap dia chi cua ban"
        } else {
            errSubmit.add = ""
        }

        if (!ktType.includes(tam)) {
            kt = false
            errSubmit.avt = "file tai len khong dung dinh dang!"
        } else {
            if (file.size > 1024 * 1024) {
                kt = false
                errSubmit.avt = "Kich thuoc anh qua lon"
            } else {
                errSubmit.avt = ""
            }
        }

        if (!kt) {
            setItemErr(errSubmit)
        } else {
            const dataPost = {
                name: item.fullname,
                email: item.email,
                password: item.pass,
                phone: item.phone,
                address: item.add,
                avatar: avatar,
                level: 0
            }
            // console.log(dataPost)
            axios.post("http://localhost/laravel/public/api/register", dataPost)
                .then((res) => {
                    if (res.data.errors) {
                        setItemErr(res.data.errors)
                        // console.log(res.data.errors)
                    } else {
                        alert("thanh cong")
                        setItemErr("")
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
        <div id="form">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="signup-form">
                            <h2>New User Signup!</h2>
                            <form onSubmit={hanldeSubmit} encType="multipart/form-data">
                                <input type="text" name="fullname" onChange={handelIn} placeholder="Name" value={item.fullname} />
                                <input type="email" name="email" onChange={handelIn} placeholder="Email" value={item.email} />
                                <input type="password" name="pass" onChange={handelIn} placeholder="Password" value={item.pass} />
                                <input type="number" name="phone" onChange={handelIn} placeholder="Phone Number" value={item.phone} />
                                <input type="text" name="add" onChange={handelIn} placeholder="Address" value={item.add} />
                                <input type="file" name="avt" onChange={hanldeFile} value={item.avt} />
                                {/* <input type="number" name="level" onChange={handelIn} value={0} /> */}
                                {renderErr()}
                                <button type="submit" className="btn btn-default">register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;