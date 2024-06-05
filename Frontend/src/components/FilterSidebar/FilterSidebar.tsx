import { useState } from 'react';
import style from './FilterSidebar.module.css';
import { Button, Input } from '../index';

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [mActive, setMActive] = useState(false);
  const [wActive, setWActive] = useState(false);

  const productTypeOptions = ['Boots', 'Shoes', 'Sandals'];
  const brandOptions = ['Dr. Martens', 'Nike', 'Adidas', 'jordaar'];
  const sizeOptions = ['S', 'M', 'L'];
  const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];

  const handleGenderButtonClick = (gender) => {
    let newFilters;
    if (gender === 'M') {
      setMActive(!mActive);
      newFilters = mActive ? filters.filter(filter => filter !== 'Men') : [...filters, 'Men'];
    } else if (gender === 'F') {
      setWActive(!wActive);
      newFilters = wActive ? filters.filter(filter => filter !== 'Women') : [...filters, 'Women'];
    }
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (value) => {
    const currentFiltersCopy = [...filters];
    const filterIndex = currentFiltersCopy.indexOf(value);

    if (filterIndex > -1) {
      currentFiltersCopy.splice(filterIndex, 1);
    } else {
      currentFiltersCopy.push(value);
    }
    onFilterChange(currentFiltersCopy);
  };

  return (
    <div className={style.filtersidebar}>
      <div className={style.CurrentFiltersContainer}>
        <h4 className={style.CurrentFiltersContainerHeading}>Current Filters</h4>
        <div>{filters.map((filter, index) => <p key={index}>{filter}</p>)}</div>
        <p onClick={() => onFilterChange([])} style={{ cursor: 'pointer', display: filters.length === 0 ? 'none' : 'inline-block', width: "max-content" }}>Clear All</p>
      </div>
      <div className={style.BodyTypeContainer}>
        <label className={style.BodyType}>Body Type:</label>
        <div className={style.buttons}>
          <Button
            className={style.Button}
            style={{ backgroundColor: mActive ? 'black' : 'white', color: mActive ? 'white' : 'black', width: '80px' }}
            onClick={() => handleGenderButtonClick('M')}
          >
            Men
          </Button>
          <Button
            className={style.Button}
            style={{ backgroundColor: wActive ? 'black' : 'white', color: wActive ? 'white' : 'black', width: '80px' }}
            onClick={() => handleGenderButtonClick('F')}
          >
            Women
          </Button>
        </div>
      </div>

      {[
        { filterName: 'category', options: productTypeOptions },
        { filterName: 'brand', options: brandOptions },
        { filterName: 'size', options: sizeOptions },
        { filterName: 'color', options: colorOptions },
      ].map(({ filterName, options }) => (
        <div className={style.FilterNameContainer} key={filterName}>
          <label className={style.FilterName}>{filterName}:</label>
          <div>
            {options.map((option) => (
              <Input
                key={option}
                padding="5px"
                margin="5px"
                style={{ height: '20px', width: '20px', marginRight: '10px' }}
                type={"checkbox"}
                labelcheckbox={option}
                onChange={() => handleCheckboxChange(option)}
                checked={filters.includes(option)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;