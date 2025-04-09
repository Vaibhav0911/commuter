import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "../styles.css";

const AdvancedRouteFinder = () => {
    const [map, setMap] = useState(null);
    const [control, setControl] = useState(null);
    const [startMarker, setStartMarker] = useState(null);
    const [destinationMarker, setDestinationMarker] = useState(null);
    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");
    const [fare, setFare] = useState("-");
    const [trafficData, setTrafficData] = useState(["Loading traffic data..."]);
    const [history, setHistory] = useState([]);

    const setStartOnMapRef = useRef(false);
    const setDestinationOnMapRef = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (map || control) return; // prevent multiple inits

        const mapInstance = L.map("map").setView([20.5937, 78.9629], 5);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstance);

        const controlInstance = L.Routing.control({
            waypoints: [],
            routeWhileDragging: true,
        }).addTo(mapInstance);

        mapInstance.on("click", function (e) {
            const latlng = e.latlng;
            if (setStartOnMapRef.current) {
                addMarker(latlng, "start");
                setStart(`${latlng.lat}, ${latlng.lng}`);
                setStartOnMapRef.current = false;
            } else if (setDestinationOnMapRef.current) {
                addMarker(latlng, "destination");
                setDestination(`${latlng.lat}, ${latlng.lng}`);
                setDestinationOnMapRef.current = false;
            }
        });

        setMap(mapInstance);
        setControl(controlInstance);

        return () => mapInstance.remove();
    }, []);

    const addMarker = (latlng, type) => {
        if (!map) return;
        const marker = L.marker(latlng, { draggable: true }).addTo(map);
        if (type === "start") {
            if (startMarker) startMarker.remove();
            setStartMarker(marker);
        } else {
            if (destinationMarker) destinationMarker.remove();
            setDestinationMarker(marker);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const startCoords = start.split(",").map(Number);
        const destinationCoords = destination.split(",").map(Number);

        if (startCoords.length === 2 && destinationCoords.length === 2 && control) {
            try {
                control.setWaypoints([
                    L.latLng(startCoords[0], startCoords[1]),
                    L.latLng(destinationCoords[0], destinationCoords[1])
                ]);
            } catch (err) {
                console.error("Error setting waypoints:", err);
            }

            calculateFare(startCoords, destinationCoords);
            fetchTrafficUpdates();
            saveCommuteHistory(startCoords, destinationCoords);
        }
    };

    const calculateFare = (startCoords, destinationCoords) => {
        const distance = Math.sqrt(
            Math.pow(destinationCoords[0] - startCoords[0], 2) +
            Math.pow(destinationCoords[1] - startCoords[1], 2)
        ) * 111; // approx km/degree
        setFare(`₹${(distance * 5).toFixed(2)}`);
    };

    const fetchTrafficUpdates = () => {
        setTrafficData([
            "🟠 Moderate traffic near your destination",
            "🔴 Heavy traffic on route due to road construction",
            "🟢 Clear roads ahead",
        ]);
    };

    const saveCommuteHistory = async (startCoords, destinationCoords) => {
        const token = localStorage.getItem("token");
        const data = {
            start: { lat: startCoords[0], lng: startCoords[1] },
            destination: { lat: destinationCoords[0], lng: destinationCoords[1] },
        };

        try {
            const response = await fetch("http://localhost:4000/api/history", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error saving history:", error);
        }
    };

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:4000/api/history", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            if (!response.ok) {
                throw new Error(`Server error ${response.status}`);
            }

            const data = await response.json();
            if (Array.isArray(data)) {
                setHistory(data);
            } else {
                console.error("Expected array but got:", data);
                setHistory([]);
            }
        } catch (error) {
            console.error("Failed to fetch history:", error.message);
            setHistory([]);
        }
    };

    return (
        <div className="route-finder-container">
            <header className="main-header">🚗 Advanced Route Finder</header>

            <form className="route-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Start (Lat, Lng):</label>
                    <input type="text" value={start} onChange={(e) => setStart(e.target.value)} required />
                    <button type="button" onClick={() => (setStartOnMapRef.current = true)}>📍 Set Start on Map</button>
                </div>

                <div className="input-group">
                    <label>Destination (Lat, Lng):</label>
                    <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                    <button type="button" onClick={() => (setDestinationOnMapRef.current = true)}>📍 Set Destination on Map</button>
                </div>

                <button type="submit">🧭 Find Route</button>
            </form>

            <div id="map"></div>

            <section id="info-sections">
                <div>
                    <h3>💰 Fare Estimation</h3>
                    <p><strong>Estimated Cost:</strong> {fare}</p>
                </div>

                <div>
                    <h3>🚦 Live Traffic Updates</h3>
                    <ul id="traffic-data">
                        {trafficData.map((update, index) => (
                            <li key={index}>{update}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3>🕓 Commute History</h3>
                    <button onClick={fetchHistory}>📜 View History</button>
                    <ul id="history-list">
                        {history.map((item, index) => (
                            <li key={index}>
                                From ({item.start.lat}, {item.start.lng}) to ({item.destination.lat}, {item.destination.lng}) on{" "}
                                {new Date(item.date).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <footer className="footer">
                <a href="#">Home</a>
                <a href="#">Contact</a>
                <a href="#">Support</a>
            </footer>
        </div>
    );
};

export default AdvancedRouteFinder;
