/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { ParentProps } from "solid-js";

import "./global/styles/reset.css";
import "./global/styles/style.css";

import Navigation from "./global/components/Navigation";
import Footer from "./global/components/Footer";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import NotFound from "./pages/not-found/NotFound";

function Layout(props: ParentProps) {
  return (
    <>
      <Navigation />
      <h1>Website Title</h1>
      {props.children}
      <Footer />
    </>
  );
}

const root = document.getElementById("root");
if (!root) {
  throw new Error("Wrapper div not found!");
}

render(
  () => (
    <Router root={Layout}>
      <Route path="/" component={Home}></Route>
      <Route path="/about" component={About}></Route>
      <Route path="*404" component={NotFound}></Route>
    </Router>
  ),
  root,
);
