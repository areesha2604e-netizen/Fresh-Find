import React from 'react'

const About = () => {
    return (
        <div>
            <section className="about-section page-section" id='aboutus'>
                <div className="about-content">
                    <div className="about-text">
                        <h1>About Us</h1>

                        <h3>Fresh Vegetables, Healthier Communities.</h3>


                        <p>
                            At Fresh Find, we believe that fresh food leads to healthier
                            lives. We are a local vegetable market dedicated to bringing
                            you fresh, high-quality vegetables at affordable prices.
                            Our goal is to make healthy eating easy, accessible, and
                            enjoyable for everyone in our community.
                        </p>
                        <a href="#" className="about-btn">Learn More</a>
                    </div>
                    <div className="about-image">
                         <img 
                src="./images/aboutus.jpg" 
                alt="Fresh vegetables"
            />
                    </div>
                </div>

            </section>



            <section className="who-we-are">
                <div className="who-container">

                </div>
            </section>




            <section className="why-us" id="why-us">
                <h2> Why Choose Fresh Find?</h2>
                <p className="why-intro">
                    Fresh vegetables, friendly service, and quality you can trust.
                </p>
                <div className="features">
                    <div className="feature-card">
                        <div className="feature-icon">🥬</div>
                        <h3>Fresh Produce</h3>
                        <p>
                            We provide fresh and high-quality vegetables sourced from trusted suppliers.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🌱</div>
                        <h3>Local Farmers</h3>
                        <p>
                            We support local farmers and help bring fresh produce to our community.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">💚</div>
                        <h3>Customer Care</h3>
                        <p>
                            We care about our customer and provide a simple and friendly shopping experience.
                        </p>
                    </div>
                    </div>
            </section>
           
        </div>
    )
}

export default About