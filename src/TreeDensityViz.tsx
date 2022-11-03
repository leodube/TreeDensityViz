import React from "react";
import { PtsCanvas } from "react-pts-canvas";
import { Pt, Circle, Bound, CanvasSpace, CanvasForm } from "pts";
import { TreeGrid } from "./TreeGrid";
import "./TreeDensityViz.css";

interface TreeDensityVizProps {
  stemsHA: number;
  spacing: number;
}

const TreeDensityViz: React.FC<TreeDensityVizProps> = ({
  stemsHA = 1600,
  spacing = 0,
}) => {
  let circExtent: number;
  let circPos: Pt;
  let tg: TreeGrid;

  const onStart = (bound: Bound, space: CanvasSpace): void => {
    // this will always be equal to 4m
    circExtent =
      bound.height > bound.width
        ? bound.width / 2 - bound.width * 0.125
        : bound.height / 2 - bound.height * 0.125;

    circPos = space.center;

    tg = new TreeGrid(stemsHA, bound, circExtent / 4, spacing);
  };

  const onAnimate = (space: CanvasSpace, form: CanvasForm): void => {
    form.fill("#3a6024").points(tg.trees, 5, "circle");
    circPos = space.pointer.id === "drag" ? space.pointer : circPos;
    let circ = Circle.fromCenter(circPos, circExtent);
    form.strokeOnly("#689f38", 3).circle(circ);
    form.fillOnly("rgb(123, 180, 66, 0.2)").circle(circ);
  };

  return (
    <PtsCanvas
      name="TreeDensityViz"
      background="#fff"
      onStart={onStart}
      onAnimate={onAnimate}
    />
  );
};

export default TreeDensityViz;
