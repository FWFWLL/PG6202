import {ArcRotateCamera, Axis, Color4, Engine, Matrix, Mesh, Quaternion, Scene, ShaderMaterial, Vector3, VertexData} from "babylonjs";

export class Transformations {
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

		const shaderMaterial = new ShaderMaterial("shader", this.scene, "/shaders/4-Transformations/shader", {
			attributes: ["position", "color"],
			uniforms: ["world"]
		});

		shaderMaterial.backFaceCulling = false;

		// 1 - Set up your own transformation matrix
		// const translationMatrix = Matrix.Identity();
		// translationMatrix.setTranslation(new Vector3(0.5, 0.5, 0));
		// shaderMaterial.setMatrix("world", translationMatrix);

		const square = this.createSquare();
		square.material = shaderMaterial;

		// 2 -  Use Babylon
		// square.translate(Axis.X, 0.5);
		// square.translate(Axis.Y, 0.5);

		// 3 -  Animation with Euler angles
		// let theta = 0;
		// let speed = Math.PI / 180;
		// scene.registerAfterRender(() => {
		// 	if(theta > 3)
		// 		speed = -speed;

		// 	theta += speed;

		// 	const rotationMatrix = Matrix.RotationX(theta);
		// 	shaderMaterial.setMatrix("world", rotationMatrix);
		// });

		// 4 - Animation with quaternions
		const pose1 = Quaternion.RotationAxis(new Vector3(1, 0, 0), Math.PI / 2);
		const pose2 = Quaternion.RotationAxis(new Vector3(0, 0, 1), Math.PI);

		let amount = 1;
		let speed = Math.PI / 360;
		scene.registerAfterRender(() => {
			if(amount > 1 || amount < 0)
				speed = -speed;

			amount += speed;

			square.rotationQuaternion = Quaternion.Slerp(pose1, pose2, amount);
		});

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
}
