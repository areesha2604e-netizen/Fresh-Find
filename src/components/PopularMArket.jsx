import React from 'react'

const PopularMarkets = () => {
    const markets = [
        {
            id: 1,
            title: "Green Valley Organic Market",
            description: "Fresh organic vegetables, fruits, and dairy straight from local farms.",
            image: "./images/cardimg.png",
            distance: "1.2 km away",
            rating: "4.8"
        },
        {
            id: 2,
            title: "Central Farmers Market",
            description: "Handcrafted artisan goods, seasonal fruits, and pure organic honey.",
            image: "./images/cardimg.png",
            distance: "2.5 km away",
            rating: "4.6"
        },
        {
            id: 3,
            title: "Sunrise Produce Hub",
            description: "Daily fresh harvest, local spices, and farm-fresh dairy products.",
            image: "./images/cardimg.png",
            distance: "3.1 km away",
            rating: "4.9"
        }
    ]

    return (
        <section className="py-5" id='market'>
            <div className="container">
                <div className="mb-4">
                    <h3 className="fw-bold text-success mb-1">🛒 Explore Popular Markets Near You</h3>
                    <p className="text-muted small">Fresh products recommended by local growers and community</p>
                </div>

                <div className="row g-4">
                    {markets.map((market) => (
                        <div key={market.id} className="col-12 col-md-6 col-lg-4">
                            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                                <div className="position-relative">
                                    <img 
                                        src={market.image} 
                                        className="card-img-top" 
                                        alt={market.title} 
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <span className="position-absolute top-0 end-0 bg-white text-dark small fw-bold m-3 px-2 py-1 rounded-3 shadow-sm">
                                        ⭐ {market.rating}
                                    </span>
                                </div>

                                <div className="card-body d-flex flex-column p-4 bg-white">
                                    <div className="text-muted small mb-1">📍 {market.distance}</div>
                                    <h5 className="card-title fw-bold text-dark mb-2">{market.title}</h5>
                                    <p className="card-text text-secondary small flex-grow-1 mb-3">
                                        {market.description}
                                    </p>
                                    <a href="#explore" className="btn btn-success w-100 fw-semibold rounded-3 py-2">
                                        Explore Market
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PopularMarkets