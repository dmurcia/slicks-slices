import React from 'react';
import { ItemsGrid, ItemStyles } from "../styles/Grids";

export default function LoadingGrid({ count }) {
  return <ItemsGrid>
    { Array.from({ length: count}, (_, i) => (
      <ItemStyles key={i}>
        <p>
          <span className="mark">Loading...</span>
        </p>
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAQAAADYv8WvAAAADklEQVR42mNkAAJGEAEAABkAA50Y5HIAAAAASUVORK5CYII="
          className="loading" 
          alt="Loading" 
          width="500" 
          height="400" 
        />
      </ItemStyles>
    )) }
  </ItemsGrid>
}