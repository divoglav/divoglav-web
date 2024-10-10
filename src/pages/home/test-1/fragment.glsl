precision mediump float;

uniform vec4 u_color;

void main() {
  vec4 redTint = vec4(1, 0.5, 0.5, 1);

  gl_FragColor = u_color * redTint;
}
