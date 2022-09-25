import {ArcRotateCamera, Color4, Engine, Mesh, Scene, ShaderMaterial, Vector3, VertexData} from "babylonjs";

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

		const camera = new ArcRotateCamera("camera", 1.5 * Math.PI, Math.PI / 2, 5, Vector3.Zero(), scene);
		camera.attachControl(this.canvas, true);

		const shaderMaterial = new ShaderMaterial("shader", this.scene, "/shaders/3-Textures/shader", {
			attributes: ["position", "color"]
		});

		const square = this.createSquare();
		square.material = shaderMaterial;

		return scene;
	}

	createSquare() : Mesh {
		const square = new Mesh("square", this.scene);

		const positions = [
			-0.5, 0.5, 0,
			-0.5, -0.5, 0,
			0.5, -0.5, 0,
			0.5, 0.5, 0,
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

	// Extremely messy code
	createDisc(radius: number, steps: number) : Mesh {
		const disc = new Mesh("disc", this.scene);

		const positions = [0, 0, 0];
		const indices = [];

		const angle = (2 * Math.PI) / steps;
		for(let i = 3; i < 3 * (steps + 1); i += 3) {
			positions[i] = radius * Math.sin((i / 3) * angle);
			positions[i + 1] = radius * Math.cos((i / 3) * angle);
			positions[i + 2] = 0;
		}

		for(let i = 0; i < 3 * (steps - 1); i += 3) {
			indices[i] = 0;
			indices[i + 1] = i / 3 + 2;
			indices[i + 2] = i / 3 + 1;
		}

		// The final triangle is a little tricky
		indices[steps * 3 - 3] = 0;
		indices[steps * 3 - 2] = 1;
		indices[steps * 3 - 1] = steps;

		const vertexData = new VertexData();
		vertexData.positions = positions;
		vertexData.indices = indices;

		vertexData.applyToMesh(disc);

		return disc;
	}
}
