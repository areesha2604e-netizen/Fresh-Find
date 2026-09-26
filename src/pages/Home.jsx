import React, { useState, useRef } from 'react'
import PopularMarkets from '../components/PopularMArket'
import MarketExplorer from '../components/MarketExplorer'
import ProduceGuide from '../components/ProduceGuide'
import ContactUs from '../components/ContactUs'
import About from '../components/About'
import Mapmake from '../components/Mapmake'
import Team from '../components/Team'



const Home = () => {
    const [locationText, setLocationText] = useState('')
    const [loading, setLoading] = useState(false)
    const mapRef = useRef(null)
const [locateTrigger, setLocateTrigger] = useState(false)

const getLocation = () => {
    setLocateTrigger(true)

    mapRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

    // const getLocation = () => {
    //     setLoading(true)
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const { latitude, longitude } = position.coords
    //                 setLocationText(`Lat: ${latitude.toFixed(2)}, Long: ${longitude.toFixed(2)}`)
    //                 setLoading(false)
    //             },
    //             () => {
    //                 setLocationText('Unable to fetch location')
    //                 setLoading(false)
    //             }
    //         )
    //     } else {
    //         setLocationText('Geolocation not supported')
    //         setLoading(false)
    //     }
    // }

    return (
        <>
        <div className="card text-white border-0 position-relative rounded-0 overflow-hidden page-section" id="hero">
            <img 
                src="./images/overlay.png" 
                className="card-img" 
                alt="Hero banner" 
                style={{ minHeight: '380px', objectFit: 'cover' }}
            />
            
            <div className="card-img-overlay d-flex align-items-center justify-content-center p-3">
                <div className="card-background rounded-4 p-4 p-md-5 text-center shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
                    
                    {/* <nav aria-label="breadcrumb" className="d-flex justify-content-center mb-3">
                        <ol className="breadcrumb m-0 small">
                            <li className="breadcrumb-item"><a href="index.html" className="text-decoration-none">🏠 Home</a></li>
                            <li className="breadcrumb-item"><a href="#market" className="text-decoration-none">Market</a></li>
                            <li className="breadcrumb-item active text-muted" aria-current="page">Details</li>
                        </ol>
                    </nav> */}

                    <h1 className="fw-bold mb-2 fs-2">Find Market Near You!</h1>
                    <p className="card-text mb-4 opacity-75 small">
                        Discover the best local markets, shops, and fresh products near your location.
                    </p>
                    
                    <button 
                        onClick={getLocation} 
                        className="btn btn-light fw-semibold rounded-pill px-4 py-2 shadow-sm"
                        disabled={loading}
                    >
                        {loading ? 'Locating...' : '📍 Find My Location'}
                    </button>

                    {locationText && (
                        <div className="mt-3 p-2 bg-dark bg-opacity-50 rounded-3 small border border-light border-opacity-25">
                            {locationText}
                        </div>
                    )}
                    
                </div>
            </div>
        </div>

        <About/>
       <div ref={mapRef} id="map-section">
    <Mapmake locateTrigger={locateTrigger} />
</div>
        <PopularMarkets />
        <MarketExplorer />
        <ProduceGuide />
        <ContactUs />
        <Team/>
                            </>
    )
}

export default Home