import {ArcRotateCamera, Color4, Engine, Mesh, Scene, Vector3, VertexData} from "@babylonjs/core";

export class MeshesAndCurves {
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

		/* const square = this.createSquare(); */
		this.createDisc(1, 727);

		return scene;
	}

	createSquare() : Mesh {
		const square = new Mesh("square", this.scene);

		const positions = [
			-1, 1, 0,
			-1, -1, 0,
			1, -1, 0,
			1, 1, 0,
		];

		const indices = [
			0, 1, 2,
			0, 2, 3
		];

		const vertexData = new VertexData();
		vertexData.positions = positions;
		vertexData.indices = indices;

		vertexData.applyToMesh(square);

		return square;
	}

	// Extremely messy code
	createDisc(radius: number, steps: number) : Mesh {
		const disc = new Mesh("disc", this.scene);

		let positions = [0, 0, 0];
		let indices = [];

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

		// Show wireframe of disc
		/* const material = new StandardMaterial("wireframe", this.scene); */
		/* material.wireframe = true; */
		/* disc.material = material; */

		return disc;
	}

	// Fuck this shit
	createS() : Mesh {
		const s = new Mesh("s", this.scene);

		let path = [];
		for(let theta = 0; theta < 2 * Math.PI; theta += 0.16) {
			path.push(new Vector3(1 * Math.cos(theta), 1 * Math.sin(theta), 0));
		}

		return s;
	}
}
