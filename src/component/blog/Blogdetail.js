import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import Listcomment from "./Listcomment";
import Rate from "./Rate";

function Blogdetail() {

    let params = useParams();
    const [getComment, setComment] = useState('');
    const [dataRes, setResCmt]=useState('');
    const [idCmt,setIdCmt]=useState('');
    const dataUser = localStorage.getItem("inforLogin")
    const inforUser = JSON.parse(dataUser)
    const accessToken = inforUser.success.token

    useEffect(() => {
        axios.get('http://localhost/laravel/public/api/blog/detail/' + params.id)
            .then(res => {
                setComment(res.data.data)
                setResCmt(res.data.data.comment)
                // localStorage.setItem("id_Blog", JSON.stringify(res.data.data.id))
            })
            .catch(error => console.log(error))
    },[])

    function getCmt(dataComment){
        let xx = dataRes.concat(dataComment)
        setResCmt(xx)
    }
    function getIdCmt(idCmt){
        setIdCmt(idCmt)
    }
    function renderDataApi() {
        return (
            <>
            <div className="single-blog-post">
                <h3>{getComment.title}</h3>
                <div className="post-meta">
                    <ul>
                        <li><i className="fa fa-user"></i> Mac Doe</li>
                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                    </ul>
                </div>
                <a href="google.com">
                    <img src={"http://localhost/laravel/public/upload/Blog/image/" + getComment.image} alt="" />
                </a>
                <p></p><br />
                <div className="pager-area">
                    <ul className="pager pull-right">
                        <li><a href="google.com#">Pre</a></li>
                        <li><a href="google.com#">Next</a></li>
                    </ul>
                </div>
            </div>
                <ul className="media-list">
                    <li className="media">
                        <a className="pull-left" href="google.com">
                            <img className="media-object" src="images/blog/man-two.jpg" alt="" />
                        </a>
                        <div className="media-body">
                        </div>
                    </li>
                </ul>
            </>
        )
    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="left-sidebar">
                                <h2>Category</h2>
                                <div className="panel-group category-products" id="accordian">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordian" href="google.comsportswear">
                                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                                    Sportswear
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="sportswear" className="panel-collapse collapse">
                                            <div className="panel-body">
                                                <ul>
                                                    <li><a href="google.com">Nike </a></li>
                                                    <li><a href="google.com">Under Armour </a></li>
                                                    <li><a href="google.com">Adidas </a></li>
                                                    <li><a href="google.com">Puma</a></li>
                                                    <li><a href="google.com">ASICS </a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordian" href="google.commens">
                                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                                    Mens
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="mens" className="panel-collapse collapse">
                                            <div className="panel-body">
                                                <ul>
                                                    <li><a href="google.com">Fendi</a></li>
                                                    <li><a href="google.com">Guess</a></li>
                                                    <li><a href="google.com">Valentino</a></li>
                                                    <li><a href="google.com">Dior</a></li>
                                                    <li><a href="google.com">Versace</a></li>
                                                    <li><a href="google.com">Armani</a></li>
                                                    <li><a href="google.com">Prada</a></li>
                                                    <li><a href="google.com">Dolce and Gabbana</a></li>
                                                    <li><a href="google.com">Chanel</a></li>
                                                    <li><a href="google.com">Gucci</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordian" href="google.comwomens">
                                                    <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                                    Womens
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="womens" className="panel-collapse collapse">
                                            <div className="panel-body">
                                                <ul>
                                                    <li><a href="google.com">Fendi</a></li>
                                                    <li><a href="google.com">Guess</a></li>
                                                    <li><a href="google.com">Valentino</a></li>
                                                    <li><a href="google.com">Dior</a></li>
                                                    <li><a href="google.com">Versace</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><a href="google.com#">Kids</a></h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><a href="google.com#">Fashion</a></h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><a href="google.com#">Households</a></h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><a href="google.com#">Interiors</a></h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><a href="google.com#">Clothing</a></h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><a href="google.com#">Bags</a></h4>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title"><a href="google.com#">Shoes</a></h4>
                                        </div>
                                    </div>
                                </div>

                                <div className="brands_products">
                                    <h2>Brands</h2>
                                    <div className="brands-name">
                                        <ul className="nav nav-pills nav-stacked">
                                            <li><a href="google.com"> <span className="pull-right">(50)</span>Acne</a></li>
                                            <li><a href="google.com"> <span className="pull-right">(56)</span>Grüne Erde</a></li>
                                            <li><a href="google.com"> <span className="pull-right">(27)</span>Albiro</a></li>
                                            <li><a href="google.com"> <span className="pull-right">(32)</span>Ronhill</a></li>
                                            <li><a href="google.com"> <span className="pull-right">(5)</span>Oddmolly</a></li>
                                            <li><a href="google.com"> <span className="pull-right">(9)</span>Boudestijn</a></li>
                                            <li><a href="google.com"> <span className="pull-right">(4)</span>Rösch creative culture</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="price-range">
                                    <h2>Price Range</h2>
                                    <div className="well">
                                        <input type="text" className="span2" value="" data-slider-min="0" data-slider-max="600" data-slider-step="5" data-slider-value="[250,450]" id="sl2" /><br />
                                        <b>$ 0</b> <b className="pull-right">$ 600</b>
                                    </div>
                                </div>

                                <div className="shipping text-center">
                                    <img src="images/home/shipping.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="blog-post-area">
                                <h2 className="title text-center">Latest From our Blog</h2>
                                {/*  */}
                                {renderDataApi()}
                                {/*  */}
                            </div>
                            <div className="rating-area">
                                <ul className="ratings">
                                    <li className="rate-this">Rate this item:</li>
                                    <li>
                                        {<Rate id={params.id} inforUser={inforUser} accessToken={accessToken}/>}
                                    </li>
                                    {/* <li className="color">(6 votes)</li> */}
                                </ul>
                                <ul className="tag">
                                    <li>TAG:</li>
                                    <li><a className="color" href="google.com">Pink <span>/</span></a></li>
                                    <li><a className="color" href="google.com">T-Shirt <span>/</span></a></li>
                                    <li><a className="color" href="google.com">Girls</a></li>
                                </ul>
                            </div>
                            {/* <div className="socials-share">
                                <a href="google.com"><img src="images/blog/socials.png" alt="" /></a>
                            </div> */}
                            <h2>RESPONSES</h2>
                            {<Listcomment dataRes={dataRes} getIdCmt={getIdCmt}/>}
                            {<Comment getCmt={getCmt} id_blog={params.id} idCmt={idCmt} accessToken={accessToken} inforUser={inforUser}/>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Blogdetail;


// hienthi nhieu cha
// DUNG map

// ...map(){
//     if(id_cmt ==0){
//         Li cha
//     }



//         ...map{
//             if(id_cmt.map2 == id.map1){
    //             Li con   
//             }
//         }
// }