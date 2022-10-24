import {ArcRotateCamera, Color4, Engine, Matrix, Scene, SceneLoader, ShaderMaterial, Vector3, Vector4} from "babylonjs";

export class Shading {
	engine: Engine;
	scene: Scene;

	constructor(canvas: HTMLCanvasElement) {
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

		const shaderMaterial = new ShaderMaterial("shader", this.scene, "/shaders/6-Shading/per_fragment", {
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

			const inverseView = Matrix.Invert(view);
			shaderMaterial.setMatrix("inverseView", inverseView);
		});

		const projection = Matrix.PerspectiveFovLH(1, 1, 1, 10000);
		shaderMaterial.setMatrix("projection", projection);

		const ambientLightColor = new Color4(0.2, 0.2, 0.2, 1.0);

		const rightLightPosition = new Vector4(25, 25, -50, 1);
		const rightLightColor = new Color4(255, 0, 64, 20);

		const leftLightPosition = new Vector4(-25, 25, -50, 1);
		const leftLightColor = new Color4(84, 218, 151, 7);

		const shininess = 20;
		
		shaderMaterial.setColor4("uAmbientLightColor", ambientLightColor);

		shaderMaterial.setVector4("rightLightPosition", rightLightPosition);
		shaderMaterial.setColor4("rightLightColor", rightLightColor);

		shaderMaterial.setVector4("leftLightPosition", leftLightPosition);
		shaderMaterial.setColor4("leftLightColor", leftLightColor);

		shaderMaterial.setFloat("shininess", shininess);

		return scene;
	}
}
