import React, { useState, useEffect } from "react";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import { getAllProducts } from "../../api/user.api";
import style from "./Shop.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";

const Shop: React.FC = () => {
  const [filters, setFilters] = useState({});

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const data = await getAllProducts();
      setAllProducts(data.data.products);
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      let filteredResult = [...allProducts];
      Object.keys(filters).forEach((filterName) => {
        const filterValues = filters[filterName];

        if (filterValues && filterValues.length > 0) {
          filteredResult = filteredResult.filter((product) => {
            const productValues = product[filterName] || [];
            return filterValues.every((filterValue) =>
              productValues.includes(filterValue)
            );
          });
        }
      });

      setFilteredProducts(filteredResult);
    };

    filterProducts();
  }, [filters, allProducts]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <div className={style.shoppage}>
      <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
      <div className={style.productlist}>
      {filteredProducts.map((product: any, index: number) => (
        <div key={index}>
          <ProductCard product={product} />
        </div> 
      ))}
      </div>
    </div>
  );
};

export default Shop;
