import { useEffect, useState } from "react";
import { getRecentProducts } from "../../api/user.api";
import style from "./Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const response = await getRecentProducts();
    if (response.statusCode === 200) setProducts(response.data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <div>
        <h1>New Arrivals</h1>
        {products.map((product: any, index: number) => {
          return (
            <div key={index} className={style.card}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
