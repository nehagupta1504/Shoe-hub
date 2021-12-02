import React from "react";
import {
  useState,
  useEffect,
  Fragment,
  createContext,
  useContext,
} from "react";
import { ShowDetails, AvailableSizes, AvailableCategories } from "../Data/data";

const filterContext = createContext({ categories: [], price: "", size: "" });
const Category = () => {
  const { filter, selectFilter } = useContext(filterContext);
  const { select, categories } = filter;
  const filterCategory = (e) => {
    if (e.target.checked) {
      const set = new Set([...categories, e.target.value]);

      selectFilter({ ...filter, select: true, categories: Array.from(set) });
    } else {
      const finalCategories = categories.filter((category) => {
        if (category !== e.target.value) {
          return category;
        }
      });
      selectFilter({ ...filter, select: true, categories: finalCategories });
    }
  };
  return (
    <div className="sub-bar">
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
                onClick={filterCategory}
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
  const { filter, selectFilter } = useContext(filterContext);
  const { select, categories, price } = filter;
  const handleChange = (e) => {
    console.log(e.target.value);
    selectFilter({ ...filter, select: true, price: e.target.value });
  };
  return (
    <div className="sub-bar">
      <h3>Price</h3>
      <label htmlFor="">
        <span>0$</span>
        <input
          type="range"
          min="1"
          max="6000"
          value={price}
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
  const { filter, selectFilter } = useContext(filterContext);
  const { select, size } = filter;
  const filtersize = (e) => {
    if (e.target.checked) {
      const set = new Set([...size, e.target.value]);

      selectFilter({ ...filter, select: true, size: Array.from(set) });
    } else {
      const finalSizes = size.filter((s) => {
        if (s !== e.target.value) {
          return s;
        }
      });
      selectFilter({ ...filter, select: true, size: finalSizes });
    }
  };
  return (
    <div className="sub-bar">
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
const Card = () => {
  const { filter } = useContext(filterContext);
  const { select, categories, price, size } = filter;
  const [filterdList, setFilteredList] = useState([]);
  useEffect(() => {
    console.log(price);
    if (categories.length == 0 && size.length == 0 && price == 1000) {
      setFilteredList([...ShowDetails]);
    } else {
      let newList = ShowDetails.filter((el) => {
        if (
          categories.indexOf(el.category) != -1 ||
          (size.indexOf(el.size) != -1 && el.price <= price)
        ) {
          console.log("el added");
          console.log(el);
          return el;
        }
      });
      console.log(newList);
      setFilteredList(newList);
    }
  }, [categories, price, size]);

  return (
    <div className="cards">
      {filterdList.map((el) => {
        return (
          <div className="card">
            <h1>{el.company}</h1>
            <img src={el.img} alt="" />
            <h3>
              Price: <span>{el.price}</span>
            </h3>
            <h4>
              Size: <span>{el.size}</span>
            </h4>
            <h4>Category:{el.category}</h4>
          </div>
        );
      })}
    </div>
  );
};
const Dashboard = () => {
  const [filter, selectFilter] = useState({
    select: false,
    categories: [],
    price: 1000,
    size: [],
  });
  const resetFilters = () => {
    selectFilter({ select: false, categories: [], price: 1000, size: [] });
  };
  return (
    <filterContext.Provider
      value={{ filter: filter, selectFilter: selectFilter }}>
      <div className="sidebar">
        <button className="btn-dark" onClick={resetFilters}>
          Reset Filters
        </button>
        <Category />
        <Price />
        <Size />
      </div>
      <div className="dashboard">
        <div>
          <h1>SHOE HUB</h1>
        </div>
        <Card />
      </div>
    </filterContext.Provider>
  );
};

export default Dashboard;
