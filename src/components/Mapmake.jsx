import { useState, useEffect } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
});


// Function to move the map
function ChangeMapView({ position }) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 15);
        }
    }, [position, map]);

    return null;
}


// Main Map Component
function Mapmake({ locateTrigger }) {

    const [position, setPosition] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Get current location
    function getLocation() {

        setError("");

        if (!navigator.geolocation) {
            setError("Your browser does not support location.");
            return;
        }

        setLoading(true);

        navigator.geolocation.getCurrentPosition(

            function (location) {

                const latitude = location.coords.latitude;
                const longitude = location.coords.longitude;

                setPosition([latitude, longitude]);

                setLoading(false);
            },

            function (error) {

                if (error.code === 1) {
                    setError("Please allow location access in your browser.");
                } else if (error.code === 2) {
                    setError("Your location is unavailable. Try again.");
                } else if (error.code === 3) {
                    setError("Location request timed out. Try again.");
                } else {
                    setError("Unable to get your location.");
                }

                setLoading(false);
            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    }


    // Automatically get location when homepage button is clicked
    useEffect(() => {
        if (locateTrigger) {
            getLocation();
        }
    }, [locateTrigger]);


    return (

        <div style={{ padding: "20px" }}>

            <h2>Current Location</h2>
            <p>Click On Find My Location On Home Section To Get Your Current Location</p>

            {/* <button
                onClick={getLocation}
                disabled={loading}
                style={{
                    padding: "12px 20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px"
                }}
            >
                {loading ? "Getting Location..." : "📍 Get My Current Location"}
            </button> */}


            {/* Show latitude and longitude */}

            {position && (

                <div style={{ marginTop: "15px" }}>

                    <p>
                        <strong>Latitude:</strong> {position[0]}
                    </p>

                    <p>
                        <strong>Longitude:</strong> {position[1]}
                    </p>

                </div>

            )}


            {/* Show error */}

            {error && (

                <p style={{ color: "red", marginTop: "15px" }}>
                    {error}
                </p>

            )}


            {/* Map */}

            <div style={{ marginTop: "20px" }}>

                <MapContainer
                    center={[24.8607, 67.0011]}
                    zoom={12}
                    style={{
                        height: "450px",
                        width: "100%",
                        borderRadius: "12px"
                    }}
                >

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    {/* Move map when location is found */}

                    <ChangeMapView position={position} />


                    {/* Show current location marker */}

                    {position && (

                        <Marker position={position}>

                            <Popup>
                                📍 You are here!
                            </Popup>

                        </Marker>

                    )}

                </MapContainer>

            </div>

        </div>
    );
}

export default Mapmake;