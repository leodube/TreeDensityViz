import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TreeDensitySim from "./TreeDensitySim";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "TreeDensitySim",
  component: TreeDensitySim,
} as ComponentMeta<typeof TreeDensitySim>;

export const Primary: ComponentStory<typeof TreeDensitySim> = () => (
  <TreeDensitySim />
);
