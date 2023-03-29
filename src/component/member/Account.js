import axios from "axios"
import { useEffect, useState } from "react"

function Account() {
    const [getUser, setUser] = useState()
    const [item, setItem] = useState({
        fullname: "",
        email: "",
        pass: "",
        phone: "",
        country: "",
        add: "",
        avt: "",
    })
    const [itemErr, setItemErr] = useState({})
    const [avatar, setAvatar] = useState('')
    const [file, setFile] = useState('')
    const ktType = ["png", "jpg", "jpeg", "PNG", "JPG"]
    useEffect(() => {
        const tam = localStorage.getItem("inforLogin")
        let inforUser = JSON.parse(tam)
        setUser(inforUser)
        setItem({
            fullname: inforUser.Auth["name"],
            email: inforUser.Auth["email"],
            pass: inforUser.Auth["password"],
            phone: inforUser.Auth["phone"],
            country: inforUser.Auth["country"],
            add: inforUser.Auth["address"],
            avt: inforUser.Auth["avatar"],
        })
    }, [])
    // console.log(getUser)
    function hanldeIn(e) {
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
    function renderUserUpdate() {
        if (item) {
            return (
                <>
                    <input onChange={hanldeIn} name="fullname" type="text" value={item.fullname} />
                    <input onChange={hanldeIn} name="email" type="email" readOnly={true} value={item.email} />
                    <input onChange={hanldeIn} name="pass" type="password" placeholder="Password" value={item.pass} />
                    <input onChange={hanldeIn} name="add" type="text" value={item.add} />
                    <input onChange={hanldeIn} name="country" type="text" value={item.country} />
                    <input onChange={hanldeIn} name="phone" type="text" value={item.phone} />
                    <input onChange={hanldeFile} name="avt" type="file" />
                </>
            )
        }
    }
    function hanldeSubmit(e) {
        e.preventDefault();
        let kt = true;
        const errorsSubmit = {}
        let typeImg = file.name;
        typeImg = typeImg.split(".");
        typeImg = typeImg[1]
        // console.log(typeImg)

        if (item.fullname === "") {
            kt = false
            errorsSubmit.fullname = "Vui long nhap ho ten";
        } else {
            errorsSubmit.fullname = "";
        }
        if (item.phone === "") {
            kt = false
            errorsSubmit.phone = "Nhap so dien thoai"
        } else {
            errorsSubmit.phone = ""
        }
        if (item.add === "") {
            kt = false
            errorsSubmit.add = "Nhap dia chi cua ban"
        } else {
            errorsSubmit.add = ""
        }
        if (!typeImg) {
            kt = false
            errorsSubmit.avt = "Anh chua duoc upload"
        }else {
            if (!ktType.includes(typeImg)) {
                kt = false
                errorsSubmit.avt = "file tai len khong dung dinh dang"
            } else {
                if (file.size > 1024 * 1024) {
                    kt = false
                    errorsSubmit.avt = "kich thuoc anh qua lon"
                } else {
                    errorsSubmit.avt = ""
                }
            }

        }
        if (!kt) {
            setItemErr(errorsSubmit)
        } else {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + getUser.success.token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            const dataPost = new FormData();
            dataPost.append('name', item.fullname)
            dataPost.append('email', item.email)
            dataPost.append('password', item.pass)
            dataPost.append('phone', item.phone)
            dataPost.append('address', item.add)
            dataPost.append('country', item.country)
            dataPost.append('avatar', avatar)
            console.log(dataPost)
            axios.post(("http://localhost/laravel/public/api/user/update/" + getUser.Auth["id"]), dataPost, config)
                .then((res) => {
                    if (!res.data.errors) {
                        alert("is success")
                        setItemErr("")
                        localStorage.setItem("inforLogin", JSON.stringify(res.data))
                    } else {
                        setItemErr(res.data.errors)
                        // console.log(res.data.errors)
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
        <>
            <div className="signup-form col-sm-12" style={{ float: "right", padding: "0 0 8px 0" }}>
                <h2>User Update</h2>
                <form onSubmit={hanldeSubmit} encType="multipart/form-data">
                    {renderUserUpdate()}
                    <button type="submit" className="btn btn-default">Update</button>
                    {renderErr()}
                </form>
            </div>
        </>
    )
}

export default Account;