import { onMount } from "solid-js";
import { WebGL } from "../../utils/webgl";
import { Mathematics } from "../../utils/mathematics";
import { Random } from "../../utils/random";

import cssDefault from "./WebGLGraphic.module.css";

type WebGLGraphicProps = {
  vertexShader: string;
  fragmentShader: string;
  css?: CSSModuleClasses;
};

function test(gl: WebGLRenderingContext, program: WebGLProgram) {
  function setHexagon(gl: WebGLRenderingContext, x: number, y: number, radius: number) {
    const x1 = x + radius;
    const y1 = y;

    const x2 = x + radius * Mathematics.COS_60;
    const y2 = y + radius * Mathematics.SIN_60;

    const x3 = x - radius * Mathematics.COS_60;
    const y3 = y + radius * Mathematics.SIN_60;

    const x4 = x - radius;
    const y4 = y;

    const x5 = x - radius * Mathematics.COS_60;
    const y5 = y - radius * Mathematics.SIN_60;

    const x6 = x + radius * Mathematics.COS_60;
    const y6 = y - radius * Mathematics.SIN_60;

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        x,
        y,
        x1,
        y1,
        x2,
        y2,
        x,
        y,
        x2,
        y2,
        x3,
        y3,
        x,
        y,
        x3,
        y3,
        x4,
        y4,
        x,
        y,
        x4,
        y4,
        x5,
        y5,
        x,
        y,
        x5,
        y5,
        x6,
        y6,
        x,
        y,
        x6,
        y6,
        x1,
        y1,
      ]),
      gl.STATIC_DRAW,
    );
  }
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const colorUniformLocation = gl.getUniformLocation(program, "u_color");

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());

  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);

  gl.enableVertexAttribArray(positionAttributeLocation);

  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  for (let i = 0; i < 10; i++) {
    setHexagon(gl, Random.range(0, gl.canvas.height), Random.range(0, gl.canvas.height), 50);

    gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), Math.random());

    gl.drawArrays(gl.TRIANGLES, 0, 18);
  }
}

export default function WebGLGraphic(props: WebGLGraphicProps) {
  let canvasRef: HTMLCanvasElement;

  onMount(() => {
    const gl = canvasRef.getContext("webgl2");
    if (!gl) {
      console.error("Failed to get WebGL2 context");
      return;
    }

    const vertexShader = WebGL.compileShader(gl, gl.VERTEX_SHADER, props.vertexShader);
    const fragmentShader = WebGL.compileShader(gl, gl.FRAGMENT_SHADER, props.fragmentShader);

    const program = WebGL.linkProgram(gl, vertexShader, fragmentShader);

    test(gl, program);

    gl.useProgram(program);
  });

  return (
    <canvas
      ref={(el) => (canvasRef = el)}
      classList={{
        [cssDefault.canvas]: true,
        [props.css?.canvas as string]: Boolean(props.css),
      }}
    ></canvas>
  );
}
