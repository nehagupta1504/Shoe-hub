import React from "react";
import { useState, Fragment } from "react";
import { ShowDetails, AvailableSizes, AvailableCategories } from "../Data/data";
const Category = () => {
  const [categoriesFilter, setCategoryFilter] = useState([]);
  const filterCategory = (e) => {
    console.log(e.target.value);
  };
  return (
    <div class="sub-bar">
      <h3>Categories</h3>
      <div className="filter">
        {AvailableCategories.map((category) => {
          return (
            <label htmlFor={category} key={category}>
              <input
                type="checkbox"
                name={category}
                id={category}
                value={category}
                onChange={filterCategory}
              />
              {category}
            </label>
          );
        })}
      </div>
    </div>
  );
};
const Price = () => {
  const [price, setPrice] = useState("1000");
  const handleChange = (e) => {
    setPrice(e.target.value);
  };
  return (
    <div class="sub-bar">
      <h3>Price</h3>
      <label htmlFor="">
        <span>0$</span>
        <input
          type="range"
          min="1"
          max="6000"
          value={price}
          class="slider"
          id="myRange"
          onChange={handleChange}
        />
        <span>6000$</span>
        <p>
          Value: <span id="demo">{price}$</span>
        </p>
      </label>
    </div>
  );
};
const Size = () => {
  const [size, selectSize] = useState([]);
  const filtersize = (e) => {
    selectSize([...size, e.target.value]);
  };
  return (
    <div class="sub-bar">
      <h3>Size</h3>
      <div className="filter">
        {AvailableSizes.map((size) => {
          return (
            <label htmlFor={size} key={size}>
              <input
                type="checkbox"
                name={size}
                id={size}
                value={size}
                onChange={filtersize}
              />
              {size}
            </label>
          );
        })}
      </div>
    </div>
  );
};
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Category />
      <Price />
      <Size />
    </div>
  );
};

export default Sidebar;
