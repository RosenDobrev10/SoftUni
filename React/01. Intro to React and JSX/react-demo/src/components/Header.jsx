export default function Header() {
    return (
        <div className="hero_area">
            <div className="hero_bg_box">
                <div className="bg_img_box">
                    <img src="images/hero-bg.png" alt="" />
                </div>
            </div>

            <header className="header_section">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg custom_nav-container ">
                        <a className="navbar-brand" href="index.html">
                            <span>
                                Finexo
                            </span>
                        </a>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className=""> </span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav  ">
                                <li className="nav-item active">
                                    <a className="nav-link" href="index.html">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="about.html"> About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="service.html">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="why.html">Why Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="team.html">Team</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"> <i className="fa fa-user" aria-hidden="true"></i> Login</a>
                                </li>
                                <form className="form-inline">
                                    <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit">
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </button>
                                </form>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <section className="slider_section ">
                <div id="customCarousel1" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container ">
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div className="detail-box">
                                            <h1>
                                                Crypto <br />
                                                Currency
                                            </h1>
                                            <p>
                                                Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.
                                            </p>
                                            <div className="btn-box">
                                                <a href="" className="btn1">
                                                    Read More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="img-box">
                                            <img src="images/slider-img.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item ">
                            <div className="container ">
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div className="detail-box">
                                            <h1>
                                                Crypto <br />
                                                Currency
                                            </h1>
                                            <p>
                                                Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.
                                            </p>
                                            <div className="btn-box">
                                                <a href="" className="btn1">
                                                    Read More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="img-box">
                                            <img src="images/slider-img.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="container ">
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div className="detail-box">
                                            <h1>
                                                Crypto <br />
                                                Currency
                                            </h1>
                                            <p>
                                                Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.
                                            </p>
                                            <div className="btn-box">
                                                <a href="" className="btn1">
                                                    Read More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="img-box">
                                            <img src="images/slider-img.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ol className="carousel-indicators">
                        <li data-target="#customCarousel1" data-slide-to="0" className="active"></li>
                        <li data-target="#customCarousel1" data-slide-to="1"></li>
                        <li data-target="#customCarousel1" data-slide-to="2"></li>
                    </ol>
                </div>

            </section>
        </div>
    );
}