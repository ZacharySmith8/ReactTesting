import React from "react";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';
import Carousel from "./Carousel";


//Test If Carosuel Renders witout Crashing.
it("Renders Without Crashing", () => {
  render(<Carousel />)
})
//Snapshot Test for Carousel
it("Matches SnapShot", () => {
  const {asFragment} = render(<Carousel/>);
  expect(asFragment()).toMatchSnapshot();
})



it("works when you click on the left arrow", () =>{

  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");


  fireEvent.click(rightArrow);

  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  
  
  
  fireEvent.click(leftArrow);

  
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

})


it("arrows are hidden", () => {
  const {queryByTestId} = render(<Carousel/>)
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");
  
  expect(leftArrow.style.visibility).toBe("hidden")

  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  expect(rightArrow.style.visibility).toBe("hidden");

})
it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  
  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});
