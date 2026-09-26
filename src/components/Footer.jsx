import React, { useState } from 'react'

const Footer = () => {

    const [newsletterData, setNewsletterData] = useState({ email: '' })
    const handleChange = (e) => { setNewsletterData({ ...newsletterData, [e.target.name]: e.target.value }) }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!newsletterData.email.includes('@') || !newsletterData.email.includes('.')) {
            alert('Please enter a valid email address!')
            return
        } alert('Subscribed successfully!')
        setNewsletterData({ email: '' })
    }

    return (
        <footer className="footer p-4 text-white">
            <div className="container">
                <div className="row g-4">

                    <div className="col-12 col-md-3">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <img className="image rounded-2" src="./images/logo1.jpeg" alt="logo" style={{ width: '40px', height: '40px' }} />
                            <h5 className="m-0">Fresh Find</h5>
                        </div>
                        <p className="small text-white-50">
                            FreshFind is your local market companion, bridging the gap between communities and local growers. We bring scattered details about farmers' markets into one easy-to-use platform.
                        </p>
                    </div>

                    <div className="col-12 col-md-3">
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href="index.html" className="text-white text-decoration-none">Home</a></li>
                            <li className="mb-2"><a href="#market" className="text-white text-decoration-none">Markets</a></li>
                            <li className="mb-2"><a href="#product" className="text-white text-decoration-none">Produce</a></li>
                            <li className="mb-2"><a href="#aboutus" className="text-white text-decoration-none">About Us</a></li>
                            <li className="mb-2"><a href="#contactus" className="text-white text-decoration-none">Contact Us</a></li>
                            <li className="mb-2"><a href="index.html" className="text-white text-decoration-none">Wishlist</a></li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-3">
                        <h5 className="mb-3">Follow Us</h5>
                        <div className="d-flex flex-column gap-2">
                            <a href="https://www.instagram.com/binarybeast2.0?stkn=MWhzOGhvaG1nbjdpeA==" className="text-white text-decoration-none">
                                <i className="bi bi-instagram me-2"></i>Instagram
                            </a>
                            <a href="https://www.whatsapp.com/?hl=en" className="text-white text-decoration-none">
                                <i className="bi bi-whatsapp me-2"></i>WhatsApp
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61595033630384" className="text-white text-decoration-none">
                                <i className="bi bi-facebook me-2"></i>Facebook
                            </a>
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <h5 className="mb-3">Newsletter</h5>
                        <form onSubmit={handleSubmit}> <div className="mb-2"> <label htmlFor="inputEmail" className="form-label small"> Enter your email here </label> <input type="email" name="email" className="form-control" id="inputEmail" placeholder="Enter Your Email" value={newsletterData.email} onChange={handleChange} required /> </div> <button type="submit" className="btn btn-light w-100 fw-bold"> Subscribe </button> </form>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer