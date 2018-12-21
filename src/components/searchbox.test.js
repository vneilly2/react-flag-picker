import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import SearchBox from "./searchbox";

const renderer = new ShallowRenderer();
renderer.render(<SearchBox id={"searchContinent"} />);
const result = renderer.getRenderOutput();

it("renders without crashing", () => {
  expect(result.type).toBe("div");
});

it("renders without crashing", () => {
  // console.log(result.props.children);
  // expect(result.props.children).toEqual
});
