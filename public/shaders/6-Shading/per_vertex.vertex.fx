#ifdef GL_ES
	precision highp float;
#endif

attribute vec3 position;
attribute vec3 normal;
attribute vec4 color;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform vec4 uAmbientLight;
uniform vec4 uLightPosition;
uniform vec4 uLightColor;

varying vec3 fragPosition;
varying vec3 fragNormal;
varying vec3 fragColor;

void main() {
	vec4 positionWorld = model * vec4(position, 1.0);

	gl_Position = projection * (view * positionWorld);

	vec3 directionToLight = uLightPosition - positionWorld.xyz;
	float attenuation = 1.0 / dot(directionToLight, directionToLight);

	vec3 lightColor = uLightColor.xyz * uLightColor.w * attenuation;
	vec3 ambientLight = uAmbientLight.xyz * uAmbientLight.w;
	vec3 diffuseLight = lightColor * max(dot(normal, normalize(directionToLight)), 0.0);

	fragColor = (diffuseLight + ambientLight) * color.xyz * color.w;
}
