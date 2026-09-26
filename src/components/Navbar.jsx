import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar dark navbar-expand-lg bg-body-tertiary sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="./images/logo1.png" width="80" height="74" /></a>
                <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#hero">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#market">Markets</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#product">Produce</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#aboutus">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contactus">Contact Us</a>
                        </li>
                       
                    </ul>
                    <div>
                        <button className="btn me-2">LogIn</button>
                        <button className="btn">SignIn</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar