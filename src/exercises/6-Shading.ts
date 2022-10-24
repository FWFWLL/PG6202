import {ArcRotateCamera, Color3, Color4, Engine, Matrix, Scene, SceneLoader, ShaderMaterial, Vector3, Vector4} from "babylonjs";

export class Shading {
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

		new ArcRotateCamera("camera", 0, 0, 100, Vector3.Zero(), scene);

		const shaderMaterial = new ShaderMaterial("shader", this.scene, "/shaders/6-Shading/shader", {
			attributes: ["position", "normal", "color"],
			uniforms: ["model", "view", "projection"]
		});

		shaderMaterial.backFaceCulling = false

		const model = Matrix.Identity();
		shaderMaterial.setMatrix("model", model);

		SceneLoader.ImportMesh("", "/models/", "skull.babylon", scene, (newMeshes) => {
			newMeshes[0].material = shaderMaterial;

			const view = Matrix.LookAtLH(new Vector3(0, 0, -100), newMeshes[0].getBoundingInfo().boundingBox.centerWorld, Vector3.Up());
			shaderMaterial.setMatrix("view", view);
		});

		const projection = Matrix.PerspectiveFovLH(1, 1, 1, 10000);
		shaderMaterial.setMatrix("projection", projection);

		const ambientLight = new Color4(0.2, 0.2, 0.2, 1.0);

		const lightPosition = new Vector3(-69, 42, -42);
		const lightColor = new Color4(255, 255, 255, 10);

		// const specular = Color3.White();
		// const shininess = 50;

		shaderMaterial.setColor4("ambientLight", ambientLight);
		shaderMaterial.setVector3("lightPosition", lightPosition);
		shaderMaterial.setColor4("lightColor", lightColor);
		// shaderMaterial.setColor3("iDiffuse", Color3.White());
		// shaderMaterial.setColor3("iDiffuse", lightColor);
		// shaderMaterial.setColor3("iSpecular", lightColor);
		// shaderMaterial.setColor3("kAmbient", ambient);
		// shaderMaterial.setColor3("kSpecular", specular)
		// shaderMaterial.setFloat("kSpecular", shininess);

		return scene;
	}
}
