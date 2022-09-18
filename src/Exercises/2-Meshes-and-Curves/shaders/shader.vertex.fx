#ifdef EL_GS
precision highp float;
#endif

attribute vec3 position;

void main() {
	gl_Position = vec4(pos, 1.0);
}
