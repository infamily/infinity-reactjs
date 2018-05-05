import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

const masonryOptions = {
  transitionDuration: 0
};

const Grid = ({ children }) => (
  // const childElements = this.props.elements.map(element => (
  //     <li className="image-element-class">
  //       <img src={element.src} />
  //     </li>
  //   ));
  <Masonry
    className="my-gallery-class" // default ''
    elementType="div" // default 'div'
    options={masonryOptions} // default {}
    disableImagesLoaded={false} // default false
    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
    // imagesLoadedOptions={imagesLoadedOptions} // default {}
  >
    {children}
  </Masonry>
);

export default Grid;
