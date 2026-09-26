import React, { useState, useEffect } from 'react'

const ProduceGuide = () => {
    const [products, setProducts] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [viewMode, setViewMode] = useState('all')
    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        fetch('./produce.json')
            .then(res => res.json())
            .then(data => setProducts(data))

        const savedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || []
        setWishlist(savedWishlist)
    }, [])

    const toggleWishlist = (product) => {
        let updatedWishlist = [...wishlist]
        const index = updatedWishlist.findIndex(item => item.name === product.name)

        if (index > -1) {
            updatedWishlist.splice(index, 1)
        } else {
            updatedWishlist.push({ name: product.name, image: product.image })
        }

        setWishlist(updatedWishlist)
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist))
    }

    const isInWishlist = (name) => {
        return wishlist.some(item => item.name === name)
    }

    if (selectedProduct) {
        const isSaved = isInWishlist(selectedProduct.name)

        return (
            <div className="container my-5 p-4 rounded-4 shadow-sm bg-white border page-section">
                <button className="btn btn-outline-success mb-4 fw-medium" onClick={() => setSelectedProduct(null)}>
                    ← Back to Produce
                </button>

                <div className="row g-4 align-items-center">
                    <div className="col-12 col-md-5 text-center bg-light p-4 rounded-4">
                        <img 
                            src={`./images/${selectedProduct.image}`} 
                            alt={selectedProduct.name} 
                            className="img-fluid" 
                            style={{ maxHeight: '280px', objectFit: 'contain' }}
                            onError={(e) => { e.target.src = selectedProduct.image }}
                        />
                    </div>

                    <div className="col-12 col-md-7">
                        <span className="badge rounded-pill px-3 py-2 fw-semibold mb-2" style={{ backgroundColor: '#e6f4ea', color: '#137333' }}>
                            • {selectedProduct.category ? selectedProduct.category.toUpperCase() : 'PRODUCE'}
                        </span>
                        <h2 className="fw-bold text-dark mt-2 mb-1">{selectedProduct.name}</h2>
                        <p className="text-muted fw-medium mb-3">🌱 Season: {selectedProduct.season}</p>
                        <p className="text-secondary fs-6 mb-4">{selectedProduct.description}</p>

                        <button 
                            onClick={() => toggleWishlist(selectedProduct)} 
                            className={`btn ${isSaved ? 'btn-danger' : 'btn-outline-danger'} px-4 py-2 fw-medium`}
                        >
                            {isSaved ? '♥ Saved in Wishlist' : '♡ Add to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const displayItems = viewMode === 'wishlist' 
        ? products.filter(p => isInWishlist(p.name))
        : products

    return (
        <div className="container py-4" id='product'>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <div>
                    <h2 className="fw-bold text-dark m-0">🥦 Produce Guide</h2>
                    <p className="text-muted small m-0">Explore fresh fruits and vegetables</p>
                </div>

                <div className="d-flex gap-2">
                    <button 
                        onClick={() => setViewMode('all')} 
                        className={`btn ${viewMode === 'all' ? 'btn-success' : 'btn-outline-success'} fw-medium`}
                    >
                        All Items
                    </button>
                    <button 
                        onClick={() => setViewMode('wishlist')} 
                        className={`btn ${viewMode === 'wishlist' ? 'btn-danger' : 'btn-outline-danger'} fw-medium`}
                    >
                        ♡ Wishlist ({wishlist.length})
                    </button>
                </div>
            </div>

            {displayItems.length > 0 ? (
                <div className="row g-4">
                    {displayItems.map((product) => {
                        const saved = isInWishlist(product.name)

                        return (
                            <div key={product.id || product.name} className="col-12 col-sm-6 col-lg-4">
                                <div className="pg-card h-100 border rounded-4 shadow-sm overflow-hidden bg-white d-flex flex-column" style={{ borderRadius: '24px' }}>
                                    <div className="p-3 text-center bg-light">
                                        <img 
                                            src={`./images/${product.image}`} 
                                            className="img-fluid" 
                                            alt={product.name} 
                                            style={{ height: '160px', objectFit: 'contain' }}
                                            onError={(e) => { e.target.src = product.image }}
                                        />
                                    </div>

                                    <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
                                        <div>
                                            <div className="d-flex align-items-center justify-content-between mb-2">
                                                <span className="pg-badge badge rounded-pill px-3 py-2 fw-semibold" style={{ backgroundColor: '#e6f4ea', color: '#137333', width: 'auto' }}>
                                                    • {product.category ? product.category.toUpperCase() : 'PRODUCE'}
                                                </span>
                                                <small className="text-muted fw-medium">🌱 {product.season}</small>
                                            </div>

                                            <h5 className="fw-bold text-dark mb-1">{product.name}</h5>
                                            <p className="text-muted small mb-3">{product.description}</p>
                                        </div>

                                        <div className="pg-btn-group d-flex gap-2 mt-auto">
                                            <button 
                                                onClick={() => toggleWishlist(product)} 
                                                className={`btn ${saved ? 'btn-danger' : 'btn-outline-danger'} flex-fill py-2 fw-medium`}
                                            >
                                                {saved ? '♥ Saved' : '♡ Save'}
                                            </button>
                                            <button 
                                                onClick={() => setSelectedProduct(product)} 
                                                className="btn btn-success flex-fill py-2 fw-medium"
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-5 my-5">
                    <h4 className="text-muted">
                        {viewMode === 'wishlist' ? 'Your Wishlist is empty ♡' : 'No produce items found'}
                    </h4>
                    {viewMode === 'wishlist' && (
                        <button className="btn btn-success mt-3" onClick={() => setViewMode('all')}>
                            Browse All Produce
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProduceGuide