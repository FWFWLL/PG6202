#ifdef EL_GS
precision highp float;
#endif

attribute vec3 position;
attribute vec2 uv;

varying ve2 texCoords;

void main() {
	// Invert the y-axis
	texCoords = vec2(uv.x, 1.0 - uv.y);

	gl_Position = vec4(pos, 1.0);
}
