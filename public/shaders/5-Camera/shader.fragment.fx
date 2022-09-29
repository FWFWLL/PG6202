#ifdef GL_ES
	precision mediump float;
#endif

varying vec4 colorCoords;

void main() {
	gl_FragColor = colorCoords;
}
