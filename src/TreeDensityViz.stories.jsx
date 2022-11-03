import React from "react";
import TreeDensityViz from "./TreeDensityViz";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "TreeDensityViz",
  component: TreeDensityViz,
};

export const Primary = () => <TreeDensityViz />;
