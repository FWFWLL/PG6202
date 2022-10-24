#ifdef GL_ES
	precision highp float;
#endif

attribute vec3 position;
attribute vec3 normal;
attribute vec4 color;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

varying vec3 fragPosition;
varying vec3 fragNormal;
varying vec3 fragColor;

void main() {
	vec4 positionWorld = model * vec4(position, 1.0);

	gl_Position = projection * (view * positionWorld);

	fragPosition = positionWorld.xyz;
	fragNormal = normalize(normal);
	fragColor = color.xyz * color.w;
}

