import axios from "axios";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

function Rate(props) {
    const [rate, setRate] = useState(0);
    let url = 'http://localhost/laravel/public/api/blog/rate/' + props.id
    useEffect(() => {
        axios.get(url)
            .then((res) => {
                const startList = res.data.data
                if (startList) {
                    let start = 0
                    for (let i = 0; i < startList.length; i++) {
                        start = start + (startList[i]["rate"])
                    }
                    start = (start / startList.length)
                    // console.log(start)
                    setRate(start)
                }
            })
            .catch(errors => console.log(errors))
    }, [])

    function changeRating(newRating, name) {
        setRate(newRating)
        let kt = true
        const checkLog = localStorage.getItem("checkLogin")
        if (!checkLog) {
            alert("Ban vui long login truoc khi danh gia")
            kt = false
        }
        if (kt) {
            alert("is success")
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + props.accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            formData.append('user_id', props.inforUser.Auth.id)
            formData.append('blog_id', props.id)
            formData.append('rate', rate)
            axios.post(url, formData, config)
        }
    }

    return (
        <StarRatings
            rating={rate}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={5}
            name='rate'>
        </StarRatings>
    )
}

export default Rate;