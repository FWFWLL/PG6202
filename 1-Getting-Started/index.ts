/// <reference path="node_modules/webpack-dev-server/types/lib/Server.d.ts"/>
import type {Configuration} from "webpack";

import {ArcRotateCamera, Color4, Engine, HemisphericLight, MeshBuilder, Scene, ShaderMaterial, Vector3} from "babylonjs";

const canvas: any = document.getElementById("renderCanvas");
const engine: Engine = new Engine(canvas, true);

function createScene() : Scene {
	const scene: Scene = new Scene(engine);
	scene.clearColor = new Color4(0.1, 0.1, 0.1, 1);

	const camera: ArcRotateCamera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
	camera.attachControl(canvas, true);

	const light: HemisphericLight = new HemisphericLight("light", new Vector3(1, 1, 0), scene);

	const shaderMaterial = new ShaderMaterial("shader", scene, {vertexElement: "vertexShaderCode", fragmentElement: "fragmentShaderCode"}, {
		attributes: ["position"]
	});

	const plane = MeshBuilder.CreatePlane("plane", {size: 1}, scene);
	plane.material = shaderMaterial;

	return scene;
}

const scene: Scene = createScene();

engine.runRenderLoop(() => {
	scene.render();
});
