import axios from "axios";
import { useState } from "react"

function Comment(props) {
    const [cmtIn, setcmtIn] = useState("");
    let url = 'http://localhost/laravel/public/api/blog/comment/' + props.id_blog
    let idCmt=props.idCmt
    let inforUser=props.inforUser

    function hanldeComment(e) {
        setcmtIn(e.target.value)
    }
    function postComment(e) {
        e.preventDefault()
        let kt = true
        const checkLog = localStorage.getItem("checkLogin")
        if (!checkLog) {
            alert("Ban vui long login truoc khi comment")
            kt = false
        }
        if (cmtIn === "") {
            kt = false
            alert("Ban phai nhap noi dung comment")
        }
        // console.log(props.inforUser)
        if (kt) {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + props.accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            formData.append('id_blog', props.id_blog);
            formData.append('id_user', props.inforUser.Auth.id);
            formData.append('id_comment', (idCmt > 0) ? idCmt : 0);
            formData.append('comment', cmtIn);
            formData.append('image_user', inforUser.Auth.avatar);
            formData.append('name_user', inforUser.Auth.name);
            axios.post(url, formData, config)
                .then((res) => {
                    props.getCmt(res.data.data)
                })
        }
    }

    return (
        <>
            <div className="response-area">
                <div className="replay-box">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>Leave a replay</h2>
                            <div className="text-area">
                                <div className="blank-arrow">
                                    <label>Your Name</label>
                                </div>
                                <span>*</span>
                                <textarea onChange={hanldeComment} name="message" rows="11"></textarea>
                                <button onClick={postComment} className="btn btn-priamry">Post Comment</button>
                                {/* <a class="btn btn-primary" href="">Post comment</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment;