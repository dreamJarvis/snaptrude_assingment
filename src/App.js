/** @format */
import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import RenderMap from "./components/RenderMap";
import ReactCanvas from "./components/ReactCanvas";

function App() {
	const [mapAttributes, setMapAttributes] = useState({});
	const [open, setOpen] = React.useState(false);

	useEffect(() => {}, [mapAttributes, open]);

	return (
		<div className='container'>
			<RenderMap setMapAttributes={setMapAttributes} setOpen={setOpen} />
			{open && <ReactCanvas mapAttributes={mapAttributes} />}
		</div>
	);
}

export default App;

/* 

*/
