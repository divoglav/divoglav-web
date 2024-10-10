type RenderingContext = WebGLRenderingContext | WebGL2RenderingContext;

export class WebGL {
  static compileShader(gl: RenderingContext, type: GLenum, source: string) {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Unable to create shader");

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error("Could not compile shader: " + info);
    }

    return shader;
  }

  static linkProgram(gl: RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    const program = gl.createProgram();
    if (!program) throw new Error("Unable to create program");

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error("Program failed to link: " + info);
    }

    return program;
  }
}
