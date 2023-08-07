/** @format */
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "@watergis/mapbox-gl-export/css/styles.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

mapboxgl.accessToken =
	"pk.eyJ1IjoidGpoYSIsImEiOiJjbGt5MGFycmsxNmEyM2VwbTQ5YTh4bnVhIn0.gQSAq9e8yUdhDErrnrLgMQ";

// mapboxgl.accessToken = process.env.MAPS_API_KEY;

const RenderMap = (props) => {
	const { setMapAttributes, setOpen } = props;
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(28.7041);
	const [lat, setLat] = useState(77.1025);
	const [zoom, setZoom] = useState(9);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [lng, lat],
			zoom: zoom,
			preserveDrawingBuffer: true,
		});

		// Add the control to the map.
		map.current.addControl(
			new MapboxGeocoder({
				accessToken: mapboxgl.accessToken,
				mapboxgl: mapboxgl,
			})
		);

		map.current.on("move", () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
	}, []);

	const renderMap = () => {
		setMapAttributes({
			latitude: lat,
			longitude: lng,
			zoom: zoom,
		});
		setOpen(true);
	};

	return (
		<div>
			<div className='sidebar'>
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div ref={mapContainer} className='map-container' />
			<Box textAlign='center' mt={2} mb={2}>
				<Button
					variant='contained'
					color='success'
					size='large'
					onClick={renderMap}>
					Render
				</Button>
			</Box>
		</div>
	);
};

export default RenderMap;
