import React, { useState, useEffect } from 'react'

const MarketExplorer = () => {
    const [markets, setMarkets] = useState([])
    const [produce, setProduce] = useState({})
    const [selectedMarket, setSelectedMarket] = useState(null)

    const [areaFilter, setAreaFilter] = useState('all')
    const [dayFilter, setDayFilter] = useState('all')
    const [typeFilter, setTypeFilter] = useState('all')
    const [sortFilter, setSortFilter] = useState('default')

    useEffect(() => {
        fetch('./market.json')
            .then(res => res.json())
            .then(data => setMarkets(data))

        fetch('./produce.json')
            .then(res => res.json())
            .then(data => setProduce(data))
    }, [])

    const getMapImage = (place) => {
        let clean = place.toLowerCase().trim()
        if (clean === 'clifton') return 'cliftonmap.png'
        if (clean === 'dha') return 'dhamap.png'
        return clean.replace(/[^a-z0-9]/g, '_') + '_map.png'
    }

    const getCardImage = (index) => {
        let num = String((index % 15) + 1).padStart(2, '0')
        return `market_image_${num}.jpg`
    }

    let filtered = markets.filter(m => {
        let matchArea = areaFilter === 'all' || m.place.toLowerCase().includes(areaFilter.toLowerCase())
        let matchDay = dayFilter === 'all' || m.day.toLowerCase().includes(dayFilter.toLowerCase())
        let matchType = typeFilter === 'all' || m.type.toLowerCase() === typeFilter.toLowerCase()
        return matchArea && matchDay && matchType
    })

    if (sortFilter === 'az') {
        filtered = [...filtered].sort((a, b) => a.name.trim().localeCompare(b.name.trim()))
    }

    if (selectedMarket) {
        let times = selectedMarket.time.split('-')
        let mapImg = getMapImage(selectedMarket.place)
        let currentProduce = produce[selectedMarket.name.trim()] || produce[selectedMarket.name] || ''

        return (
            <div className="container mt-5" style={{ backgroundColor: 'rgb(201, 236, 201)', padding: '25px', borderRadius: '20px' }}>
                <button className="btn btn-outline-success mb-3 fw-bold" onClick={() => setSelectedMarket(null)}>
                    ← Back
                </button>
                
                <h1 className="text-center" style={{ color: '#063b0f', fontSize: '40px', fontFamily: "'Times New Roman', Times, serif" }}>
                    {selectedMarket.name}
                </h1>
                
                <p className="text-center" style={{ color: '#063b0f', fontSize: '20px' }}>
                    Location: {selectedMarket.place}
                </p>

                <img 
                    src={`./images/${mapImg}`} 
                    className="img-fluid" 
                    alt="map" 
                    style={{ width: '80%', height: '350px', display: 'block', margin: '20px auto', borderRadius: '15px', objectFit: 'cover' }} 
                />

                <p className="bg-white p-3 rounded" style={{ color: '#063b0f', fontSize: '17px' }}>
                    Market-Day: {selectedMarket.day}
                </p>
                <p className="bg-white p-3 rounded" style={{ color: '#063b0f', fontSize: '17px' }}>
                    Opening Time: {times[0] ? times[0].trim() : selectedMarket.time}
                </p>
                <p className="bg-white p-3 rounded" style={{ color: '#063b0f', fontSize: '17px' }}>
                    Closing-Time: {times[1] ? times[1].trim() : ''}
                </p>
                <p className="bg-white p-3 rounded" style={{ color: '#063b0f', fontSize: '17px' }}>
                    Type: {selectedMarket.type}
                </p>

                <div className="container mt-4">
                    <h2 className="text-center" style={{ color: '#315c3b' }}>Produce Guide</h2>
                    <div className="card p-3" style={{ borderRadius: '15px', backgroundColor: '#f4f8ed', border: '1px solid #d8e5ce' }}>
                        <h4 style={{ color: '#063b0f' }}>
                            {selectedMarket.type === 'fruit' ? 'Fruit Available' : 'Vegetable Available'}
                        </h4>
                        <p className="m-0" style={{ backgroundColor: 'transparent', padding: '0', color: '#063b0f' }}>
                            {currentProduce}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-4">
            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <select className="form-select" value={areaFilter} onChange={e => setAreaFilter(e.target.value)}>
                        <option value="all">All Areas</option>
                        <option value="clifton">Clifton</option>
                        <option value="dha">DHA</option>
                        <option value="gulshan">Gulshan</option>
                        <option value="saddar">Saddar</option>
                        <option value="gulshan-e-iqbal">Gulshan-e-Iqbal</option>
                        <option value="gulistan-e-johar">Gulistan-e-Johar</option>
                        <option value="malir">Malir</option>
                        <option value="landhi">Landhi</option>
                        <option value="korangi">Korangi</option>
                        <option value="north nazimabad">North Nazimabad</option>
                        <option value="federal b area">Federal B area</option>
                        <option value="pechs">PECHS</option>
                        <option value="nazimabad">Nazimabad</option>
                        <option value="orangi town">Orangi town</option>
                        <option value="sarjani town">Sarjani town</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <select className="form-select" value={dayFilter} onChange={e => setDayFilter(e.target.value)}>
                        <option value="all">All Days</option>
                        <option value="mon">Mon</option>
                        <option value="tues">Tues</option>
                        <option value="wed">Wed</option>
                        <option value="thurs">Thurs</option>
                        <option value="fri">Fri</option>
                        <option value="sat">Sat</option>
                        <option value="sun">Sun</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <select className="form-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                        <option value="all">All Types</option>
                        <option value="vegetable">Vegetable</option>
                        <option value="fruit">Fruit</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <select className="form-select" value={sortFilter} onChange={e => setSortFilter(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="az">A-Z</option>
                    </select>
                </div>
            </div>

            <div className="row g-4">
                {filtered.map((item, index) => (
                    <div key={index} className="col-12 col-md-4">
                        <div 
                            className="card h-100 p-3" 
                            style={{ cursor: 'pointer', backgroundColor: '#f4f8ed', border: '1px solid #d8e5ce', borderRadius: '15px' }}
                            onClick={() => setSelectedMarket(item)}
                        >
                            <img 
                                src={`./images/${getCardImage(index)}`} 
                                className="card-img-top mb-3" 
                                alt={item.name}
                                style={{ height: '180px', objectFit: 'cover', borderRadius: '10px' }}
                            />
                            <h4 style={{ color: '#063b0f' }}>{item.name}</h4>
                            <p className="mb-1" style={{ backgroundColor: 'transparent', padding: '0', color: '#063b0f' }}>Location: {item.place}</p>
                            <p className="mb-1" style={{ backgroundColor: 'transparent', padding: '0', color: '#063b0f' }}>Day: {item.day}</p>
                            <p className="mb-1" style={{ backgroundColor: 'transparent', padding: '0', color: '#063b0f' }}>Time: {item.time}</p>
                            <span className="badge bg-success align-self-start mt-2">{item.type}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MarketExplorer