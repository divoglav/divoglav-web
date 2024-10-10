import WebGLGraphic from "../../global/components/web-gl-graphic/WebGLGraphic";

import vertexShader from "./test-1/vertex.glsl";
import fragmentShader from "./test-1/fragment.glsl";
import css from "./test-1/Test1.module.css";

export default function Home() {
  return (
    <div>
      <p>Home page</p>
      <WebGLGraphic fragmentShader={fragmentShader} vertexShader={vertexShader} css={css} />
    </div>
  );
}
