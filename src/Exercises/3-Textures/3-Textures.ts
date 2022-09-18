import {ArcRotateCamera, Color4, DirectionalLight, Engine, FloatArray, Mesh, MeshBuilder, Nullable, Scene, ShaderMaterial, Texture, Vector3, VertexData} from "@babylonjs/core";

export class Textures {
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

		const camera = new ArcRotateCamera("camera", /* 1.5 * */ Math.PI, Math.PI / 2, 5, Vector3.Zero(), scene);
		camera.attachControl(this.canvas, true);

		// new DirectionalLight("light", new Vector3(0, 0, 1), scene);

		const shaderMaterial = new ShaderMaterial("shader", scene, ".shaders/shader", {
			attributes: ["position", "uv"]
		});

		let texture = new Texture("./textures/plane.basis", scene);
		shaderMaterial.setTexture("textureSampler", texture);

		const plane = MeshBuilder.CreatePlane("plane", {size: 1}, scene);
		plane.material = shaderMaterial;

		// this.createSquare();

		return scene;
	}

	createSquare() : Mesh {
		const square = new Mesh("square", this.scene);

		const positions: Nullable<FloatArray> = [
			-1, 1, 0,
			-1, -1, 0,
			1, -1, 0,
			1, 1, 0,
		];

		const indices: Nullable<FloatArray> = [
			0, 1, 2,
			0, 2, 3
		];

		const colors: Nullable<FloatArray> = [
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
