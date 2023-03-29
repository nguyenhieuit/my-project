import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rate from "./Rate";

function Blog() {

    const [getItem, setItem]=useState("")

    useEffect(()=>{
        axios.get('http://localhost/laravel/public/api/blog')
        .then(res =>{
            // console.log(res)
            setItem(res.data.blog.data)
        })
        .catch(error=>console.log(error))
    },[])

    function renderDataApi(){
        if(Object.keys(getItem).length > 0){
            return getItem.map((value, key)=>{
                return(
                    <div className="single-blog-post">
                        <h3>{value.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user"></i> Mac Doe</li>
                                <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                <li><i className="fa fa-calendar"></i> {}</li>
                            </ul>
                        </div>
                        <a href="google.com">
                            <img src={'http://localhost/laravel/public/upload/Blog/image/'+ value.image} alt="img" />
                        </a>
                        <p>{value.description}</p>
                        <Link className="btn btn-primary" to={"Blogdetail/" + value.id}>Read more</Link>
                        {/* <a className="btn btn-primary" href="google.com">Read More</a> */}
                    </div>
                )
            })
        }
    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="blog-post-area">
                                <h2 className="title text-center">Latest From our Blog</h2>
                                {/*  */}
                                {renderDataApi()}
                                {/*  */}
                                <div className="pagination-area">
                                    <ul className="pagination">
                                        <li><Link to="/Blog" className="active">1</Link></li>
                                        <li><Link to="/Blog" className="active">2</Link></li>
                                        <li><Link to="/Blog" className="active">3</Link></li>
                                        <li><a href="google.com"><i className="fa fa-angle-double-right"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Blog;