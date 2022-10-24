#ifdef GL_ES
	precision highp float;
#endif

attribute vec3 position;
attribute vec3 normal;
attribute vec4 color;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform vec4 ambientLight;
uniform vec3 lightPosition;
uniform vec4 lightColor;

varying vec3 fragPosition;
varying vec3 fragNormal;
varying vec4 fragColor;

void main() {
	vec4 positionWorld = model * vec4(position, 1.0);

	gl_Position = projection * (view * positionWorld);

	vec3 directionToLight = lightPosition - positionWorld.xyz;
	float attenuation = 1.0 / dot(directionToLight, directionToLight);

	vec3 lightColorF = lightColor.xyz * lightColor.w * attenuation;
	vec3 ambientLightF = ambientLight.xyz * ambientLight.w;
	vec3 diffuseLightF = lightColorF * max(dot(normal, normalize(directionToLight)), 1.0);

	fragColor = vec4(diffuseLightF + ambientLightF, 1.0) * color;
}
