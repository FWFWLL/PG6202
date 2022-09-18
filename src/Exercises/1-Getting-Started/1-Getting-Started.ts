import {ArcRotateCamera, Color4, Engine, MeshBuilder, Scene, ShaderMaterial, Vector3} from "@babylonjs/core";

export class GettingStarted {
	engine: Engine;
	scene: Scene;

	constructor(private canvas: HTMLCanvasElement) {
		this.engine = new Engine(canvas, true);
		this.scene = this.createScene();

		this.engine.runRenderLoop(() => {
			this.scene.render();
		});
	}

	createScene() : Scene {
		const scene = new Scene(this.engine);
		scene.clearColor = new Color4(0.1, 0.1, 0.1, 1.0);

		const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
		camera.attachControl(this.canvas, true);

		const shaderMaterial = new ShaderMaterial("shader", scene, "./shaders/shader", {
			attributes: ["position"]
		});

		const plane = MeshBuilder.CreatePlane("plane", {size: 1}, scene);
		plane.material = shaderMaterial;

		return scene;
	}
}
