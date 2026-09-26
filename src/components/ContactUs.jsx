import React, { useState } from 'react'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Select a subject',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    

    const handleSubmit = (e) => {
  e.preventDefault()
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
        alert('Name should contain only letters!')
        return
    }

        alert('Message sent successfully!')
        setFormData({ name: '', email: '', subject: 'Select a subject', message: '' })
    }

    return (
        <div className="cnt-wrapper p-4 page-section" id='contactus'>
          

            <section className="cnt-hero">
                <h3>Get In Touch</h3>
                <h1>Contact Us</h1>
                <p>Have a question about local farmers markets? We would love to hear from you send us a message and our team will get back to you.</p>
                <img 
                    src="./images/farmer.png" 
                    alt="Farmer"
                    onError={(e) => { e.target.style.display = 'none' }}
                />
            </section>

            <section className="cnt-main">
                <div className="cnt-info">
                    <div className="cnt-info-box">
                        <div className="cnt-icon">📍</div>
                        <h3>Our Location</h3>
                        <p>Karachi, Pakistan</p>
                    </div>

                    <div className="cnt-info-box">
                        <div className="cnt-icon">✉️</div>
                        <h3>Email Us</h3>
                        <p>freshfind@gmail.com</p>
                    </div>

                    <div className="cnt-info-box">
                        <div className="cnt-icon">📞</div>
                        <h3>Call Us</h3>
                        <p>+92 300 1234567</p>
                    </div>
                </div>

                <div className="cnt-form">
                    <h2>Send us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Name *</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter Your name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />

                        <label>Email *</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter Your Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />

                        <label>Subject</label>
                        <select name="subject" value={formData.subject} onChange={handleChange}>
                            <option value="Select a subject">Select a subject</option>
                            <option value="Market Information">Market Information</option>
                            <option value="Product Information">Product Information</option>
                            <option value="Other">Other</option>
                        </select>

                        <label>Message *</label>
                        <textarea 
                            name="message" 
                            placeholder="Write Your message here...." 
                            value={formData.message} 
                            onChange={handleChange} 
                            required 
                        ></textarea>

                        <button type="submit">✈️ Send Message</button>
                    </form>
                </div>

                <div className="cnt-features">
                    <div className="cnt-feature">
                        <div className="cnt-icon">🌿</div>
                        <h3>Local Support</h3>
                        <p>We support local farmers and small businesses.</p>
                    </div>

                    <div className="cnt-feature">
                        <div className="cnt-icon">♡</div>
                        <h3>Fresh & Healthy</h3>
                        <p>Fresh food for a healthier community.</p>
                    </div>

                    <div className="cnt-feature">
                        <div className="cnt-icon">👥</div>
                        <h3>Better Together</h3>
                        <p>Farmers, shoppers and communities - all connected</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactUs