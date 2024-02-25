import { useEffect, useState } from "react";
import { getRecentProducts } from "../../api/user.api";
import style from "./Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import SliderCard from "../../components/SliderCard/SliderCard";
import { Button, Container } from "../../components";
import HeroSection from "../../components/HeroSection/HeroSection";

//Importing Images
import GirlPic1 from "../../assets/images/GirlPic1.png";
import MenPic1 from "../../assets/images/MenPic1.png";
import KidPic1 from "../../assets/images/KidPic1.png";
import JordanLogo from "../../assets/images/JordanLogo.png";
import NikeLogo from "../../assets/images/NikeLogo.png";
import AdidasLogo from "../../assets/images/AdidasLogo.png";
import AnimeShoe1 from "../../assets/images/AnimeShoe1.png";
import CustomNike from "../../assets/images/CustomNike.png";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await getRecentProducts();
    if (response.statusCode === 200) setProducts(response.data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <SliderCard />
      <div className={style.Gender}>
        <div className={style.GenderContainer}>
          <div className={style.GenderBox}>
            <img src={GirlPic1} alt="" />
          </div>
          <div className={style.GenderBoxTitle}>Women</div>
        </div>
        <div className={style.GenderContainer}>
          <div className={style.GenderBox}>
            <img src={MenPic1} alt="" />
          </div>
          <div className={style.GenderBoxTitle}>Men</div>
        </div>
        <div className={style.GenderContainer}>
          <div className={style.GenderBox}>
            <img src={KidPic1} alt="" />
          </div>
          <div className={style.GenderBoxTitle}>Kids</div>
        </div>
        <div className={style.SaleBox}>
          <div className={style.Box}>
            <span className={style.SaleBoxContent}>Sale</span>
          </div>
        </div>
      </div>

      <div className={style.CompanyContainer}>
        <div className={style.CompanyItemBox}>
          <div className={style.CompanyItem}>
            <img src={JordanLogo} alt="" />
          </div>
          <div className={style.CompanyItemTitle}>Jordan</div>
        </div>
        <div className={style.CompanyItemBox}>
          <div className={style.CompanyItem}>
            <img src={NikeLogo} alt="" />
          </div>
          <div className={style.CompanyItemTitle}>Jordan</div>
        </div>
        <div className={style.CompanyItemBox}>
          <div className={style.CompanyItem}>
            <img src={AdidasLogo} alt="" />
          </div>
          <div className={style.CompanyItemTitle}>Jordan</div>
        </div>
        <div className={style.CompanyItemBox}>
          <div className={style.CompanyItem}>
            <img src={NikeLogo} alt="" />
          </div>
          <div className={style.CompanyItemTitle}>Jordan</div>
        </div>
        <div className={style.CompanyItemBox}>
          <img src={CustomNike} alt="" />
        </div>
      </div>
      <div className={style.NewArrivals}>
        <h1 className={style.NewArrivalsSliderTitle}>New Arrivals</h1>
        <div className={style.NewArrivalsSlider}>
          <div className={style.cards}>
            {products.map((product: Object, index: number) => {
              return (
                <div key={index}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={style.BestSellerSlider}>
        <h1 className={style.BestSellerSliderHeading}>Best Seller</h1>
      </div>
      <HeroSection />
    </Container>
  );
};

export default Home;
