#ifdef GL_ES
	precision mediump float;
#endif

varying vec3 fragPosition;
varying vec3 fragNormal;
varying vec4 fragColor;

void main() {
	gl_FragColor = fragColor;
}
