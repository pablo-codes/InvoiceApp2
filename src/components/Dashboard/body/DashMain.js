import React from 'react'

const DashMain = () => {
    return (
        <div className="main_content_iner ">
            <div className="container-fluid plr_30 body_white_bg pt_30">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="single_element">
                            <div className="quick_activity">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="quick_activity_wrap">
                                            <div className="single_quick_activity">
                                                <h4>Total Blogs</h4>
                                                <h3><span className="counter"></span></h3>
                                                <div className="icon-div" style={{ position: "relative", left: "40%" }}>
                                                    <div className="icon">
                                                        +
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="single_quick_activity">
                                                <h4>Total Images</h4>
                                                <h3> <span className="counter"></span></h3>
                                                <div className="icon-div" style={{ position: "relative", left: "40%" }}>
                                                    <div className="icon">
                                                        +
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="single_quick_activity">
                                                <h4>Uploaded Blogs</h4>
                                                <h3> <span className="counter">0</span></h3>
                                                <p>Manage</p>
                                            </div>
                                            <div className="single_quick_activity">
                                                <h4>Uploaded Images</h4>
                                                <h3> <span className="counter">0</span></h3>
                                                <p>Manage</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div >
            </div >
        </div >
    )
}

export default DashMain