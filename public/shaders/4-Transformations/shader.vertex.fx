#ifdef GL_ES
	precision highp float;
#endif

attribute vec3 position;
attribute vec4 color;

uniform mat4 world;

varying vec4 colorCoords;

void main() {
	colorCoords = color;

	gl_Position = world * vec4(position, 1.0);
}
