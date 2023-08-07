/** @format */
import React, { useRef, useEffect } from "react";
import * as BABYLON from "@babylonjs/core";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const myStyle = {
	width: "100%",
	height: "100%",
};

const TOKEN =
	"pk.eyJ1IjoidGpoYSIsImEiOiJjbGt5MGFycmsxNmEyM2VwbTQ5YTh4bnVhIn0.gQSAq9e8yUdhDErrnrLgMQ";

// const TOKEN = process.env.MAPS_API_KEY;

const ReactCanvas = (props) => {
	const { mapAttributes } = props;
	let canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const engine = new BABYLON.Engine(canvas);

		const createScene = () => {
			const scene = new BABYLON.Scene(engine);
			const camera = new BABYLON.ArcRotateCamera(
				"camera",
				0,
				0,
				10,
				new BABYLON.Vector3(0, 0, 0),
				scene
			);
			camera.attachControl(true);

			camera.setPosition(new BABYLON.Vector3(0, 0, -2));
			const box = new BABYLON.MeshBuilder.CreateBox("myBox", {
				size: 0.9,
				faceUV: [],
			});

			const boxMap = new BABYLON.StandardMaterial();
			box.material = boxMap;
			const staticMap = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${mapAttributes.longitude},${mapAttributes.latitude},${mapAttributes.zoom},0.00,0.00/1000x600@2x?access_token=${TOKEN}`;
			boxMap.emissiveTexture = new BABYLON.Texture(staticMap, scene);
			return scene;
		};

		const scene = createScene();
		engine.runRenderLoop(function () {
			scene.render();
		});

		window.addEventListener("resize", function () {
			engine.resize();
		});
	}, [mapAttributes]);

	return canvasRef ? (
		<canvas style={myStyle} ref={canvasRef} {...props}></canvas>
	) : (
		<Box sx={{ display: "flex" }}>
			<CircularProgress />
		</Box>
	);
};

export default ReactCanvas;
