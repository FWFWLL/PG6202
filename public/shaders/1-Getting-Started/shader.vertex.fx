#ifdef GL_ES
	precision highp float;
#endif

attribute vec3 position;

void main() {
	gl_Position = vec4(position.x, position.y * 2.0, position.z, 1.0);
}
