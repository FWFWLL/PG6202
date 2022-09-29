import {ArcRotateCamera, Color4, Engine, Matrix, Mesh, Scene, ShaderMaterial, Vector3, VertexData} from "babylonjs";

export class Camera {
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

		const shaderMaterial = new ShaderMaterial("shader", this.scene, "/shaders/5-Camera/shader", {
			attributes: ["position", "color"],
			uniforms: ["model", "view", "projection"]
		});

		shaderMaterial.backFaceCulling = false

		const world = Matrix.Identity();
		shaderMaterial.setMatrix("world", world);

		// 1 - Creating a view of your own
		// const eye = new Vector3(0, 40, -40);
		// const target = new Vector3(0, 0, 50);
		// const view = Matrix.LookAtLH(eye, target, Vector3.Up());
		// shaderMaterial.setMatrix("view", view);

		// 2 - Creating a perspective of your own
		// const projection = Matrix.PerspectiveFovLH(0.8, this.engine.getAspectRatio(camera), 1, 10000);

		// 2.1 - Orthographic Camera
		// const canvasWidth = parseFloat(this.canvas.getAttribute("width")!)
		// const canvasHeight = parseFloat(this.canvas.getAttribute("height")!)
		// const projection = Matrix.OrthoLH(canvasWidth / 16, canvasHeight / 16, 1, 10000);

		// shaderMaterial.setMatrix("projection", projection);

		// 3 - Animating your camera
		const target = new Vector3(0, 0, 0); // Just point view towards Origin
		const distance = 5; // Distance between target and view
		const speed = Math.PI / 180; // Animation speed

		let theta = 0;
		scene.registerAfterRender(() => {
			if(theta > Math.PI)
				theta = -Math.PI;

			theta += speed;

			const eye = new Vector3(Math.cos(theta) * distance, distance, distance * Math.sin(theta));
			const view = Matrix.LookAtLH(eye, target, Vector3.Up());
			shaderMaterial.setMatrix("view", view);
		});

		const projection = Matrix.PerspectiveFovLH(1, this.engine.getAspectRatio(camera), 1, 10000);
		shaderMaterial.setMatrix("projection", projection);

		const square = this.createSquare(1);
		square.material = shaderMaterial;

		return scene;
	}

	createSquare(size: number) : Mesh {
		const square = new Mesh("square", this.scene);

		const positions = [
			-size, size, 0,
			-size, -size, 0,
			size, -size, 0,
			size, size, 0,
		];

		const indices = [
			0, 1, 2,
			0, 2, 3,
		];

		const colors = [
			1, 0, 0, 1,
			1, 1, 0, 1,
			0, 1, 0, 1,
			0, 0, 1, 1,
		];

		const vertexData = new VertexData();
		vertexData.positions = positions;
		vertexData.indices = indices;
		vertexData.colors = colors;

		vertexData.applyToMesh(square);

		return square;
	}
}
