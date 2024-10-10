attribute vec2 a_position;

uniform vec2 u_resolution;

void main() {
  vec2 normalized = a_position / u_resolution;
  vec2 clipSpace = (normalized * 2.0) - 1.0;
  clipSpace.y *= -1.0;

  gl_Position = vec4(clipSpace, 0, 1);
}
