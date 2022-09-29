#ifdef GL_ES
	precision highp float;
#endif

attribute vec3 position;
attribute vec4 color;

uniform mat4 world;
uniform mat4 view;
uniform mat4 projection;

varying vec4 colorCoords;

void main() {
	colorCoords = color;

	/* gl_Position = world * vec4(position, 1.0); */
	gl_Position = projection * view * world * vec4(position, 1.0);
}
