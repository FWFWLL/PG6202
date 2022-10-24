#ifdef GL_ES
	precision mediump float;
#endif

struct PointLight {
	vec4 position;
	vec4 color;
};

varying vec3 fragPosition;
varying vec3 fragNormal;
varying vec3 fragColor;

uniform mat4 inverseView;

uniform vec4 uAmbientLightColor;

uniform vec4 rightLightPosition;
uniform vec4 rightLightColor;

uniform vec4 leftLightPosition;
uniform vec4 leftLightColor;

uniform float shininess;

void main() {
	vec3 diffuseLight = uAmbientLightColor.xyz * uAmbientLightColor.w;
	vec3 specularLight = vec3(0.0);
	vec3 surfaceNormal = normalize(fragNormal);

	vec3 cameraPosition = inverseView[3].xyz;
	vec3 viewDirection = normalize(cameraPosition - fragPosition);

	PointLight pointLights[2];
	pointLights[0].position = leftLightPosition;
	pointLights[0].color = leftLightColor;
	pointLights[1].position = rightLightPosition;
	pointLights[1].color = rightLightColor;

	for(int i = 0; i < 2; i++) {
		// Diffuse Lighting
		vec3 directionToLight = pointLights[i].position.xyz - fragPosition;
		float attenuation = 1.0 / dot(directionToLight, directionToLight);
		directionToLight = normalize(directionToLight);
		float cosAngleIncidence = max(dot(surfaceNormal, directionToLight), 0.);
		vec3 intensity = pointLights[i].color.xyz * pointLights[i].color.w * attenuation;

		diffuseLight += intensity * cosAngleIncidence;

		// Specular Lighting
		vec3 halfAngle = normalize(directionToLight + viewDirection);
		float blinnTerm = dot(surfaceNormal, halfAngle);
		blinnTerm = clamp(blinnTerm, 0.0, 1.0);
		blinnTerm = pow(blinnTerm, shininess);

		specularLight += intensity * blinnTerm;
	}

	gl_FragColor = vec4(diffuseLight * fragColor + specularLight * fragColor, 1.0);
}

