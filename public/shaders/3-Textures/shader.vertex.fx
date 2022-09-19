#ifdef GL_ES
	precision highp float;
#endif

attribute vec3 position;
attribute vec4 color;

varying vec4 colorCoords;

void main() {
	colorCoords = color;

	// halve the positions so we can see the shapes better
	gl_Position = vec4(position * 0.5, 1.0);
}
