
function Listcomment(props) {
  
    let idRep = 0
    function idCmt(e) {
        idRep = e.target.id
        // console.log(idRep)
        props.getIdCmt(idRep)
        
    }
    function renderComment(e) {
        const cmtData = props.dataRes
        // console.log(cmtData)
        if(cmtData){
            return cmtData.map((value, key)=>{
                if (value["id_comment"] == 0) {
                    return (
                        <>
                            <li className="media">
                                {/* <a class="pull-left">
                                    <img class="media-object" src={"http://localhost/laravel/public/upload/user/avatar/"+ value["image_user"]} alt=""/>
                                </a> */}
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user"></i>{value["name_user"]}</li>
                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                    </ul>
                                    <p>{value["comment"]}</p>
                                    <a id={value["id"]} onClick={idCmt} className="btn btn-primary"><i className="fa fa-reply"></i> Replay</a>
                                </div>
                            </li>
                            {
                                cmtData.map((value2, key)=>{
                                    if (value2["id_comment"] == value["id"]) {
                                        return (
                                            <li className="media second-media">
                                                {/* <a class="pull-left">
                                                    <img class="media-object" src={"http://localhost/laravel/public/upload/user/avatar/" + value["image_user"]} alt="" />
                                                </a> */}
                                                <div className="media-body">
                                                    <ul className="sinlge-post-meta">
                                                        <li><i className="fa fa-user"></i>{value2["name_user"]}</li>
                                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                                    </ul>
                                                    <p>{value2["comment"]}</p>
                                                    <a id={value2["id"]} onClick={idCmt} className="btn btn-primary"><i className="fa fa-reply"></i> Replay</a>
                                                </div>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </>
                    )
                }
            })
        }
        
    }

    return (
        <>
            <ul className="media-list">
                {renderComment()}
            </ul>
        </>
    )
}

export default Listcomment;