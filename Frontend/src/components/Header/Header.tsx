import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import style from "./Header.module.css";
import { toggleCartVisibility } from "../../redux/reducers/cartSlice";
import Profile from "../Profile/Profile";

//Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { Home } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { toggleWishlistVisibility } from "../../redux/reducers/wishlistSlice";
import { toggleProfileVisibility } from "../../redux/reducers/authSlice";
import Searchbar from "../Searchbar/Searchbar";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { RootState } from "../../redux/store/store";
import TimelineIcon from "@mui/icons-material/Timeline";

const Header = () => {
  const dispatch = useDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const isUser = useSelector((state: RootState) => state.auth.status);
  const location = window.location.pathname.split().pop();
  const userRole = useSelector((state) => state.auth?.userData?.role);

  const navigate = useNavigate();
  const navItems = [
    { name: "Home", slug: "/", isActive: true },
    { name: "Shop", slug: "/shop", isActive: true },
    { name: "Custom Anime", slug: "/anime", isActive: true },
    { name: "Blogs", slug: "/blogs", isActive: true },
    { name: "Login", slug: "/login", isActive: !authStatus },
    { name: "Signup", slug: "/register", isActive: !authStatus },
    { name: "Seller", slug: "/seller", isActive: isUser && userRole === "user" },
  ];

  const handleToggleCartVisibility = () => {
    dispatch(toggleCartVisibility());
  };

  const handleToggleWishlistVisibility = () => {
    dispatch(toggleWishlistVisibility());
  };

  const handleToggleProfileVisibility = () => {
    dispatch(toggleProfileVisibility());
  };

  const toggleSearchVisibility = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <header className={style.header}>
        <Container>
          <nav className={style.nav}>
            <div>
              <Logo width="100px" />
            </div>
            <ul className={style.navList}>
              {navItems.map((item) =>
                item.isActive ? (
                  <li className={style.navListItem} key={item.name}>
                    <button
                      className={
                        item.slug === location
                          ? style.activeNavListItemButton
                          : style.navListItemButton
                      }
                      onClick={() => {
                        navigate(item.slug);
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
            </ul>
            <ul className={style.iconList}>
              <li
                className={style.iconListItems}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <SearchIcon />
              </li>
              {authStatus && (
                <>
                  <li className={style.iconListItems}>
                    <LocalMallIcon onClick={() => navigate("/checkout")} />
                  </li>
                  <li className={style.iconListItems}>
                    <ShoppingCartIcon onClick={handleToggleCartVisibility} />
                  </li>
                  <li
                    className={style.iconListItems}
                    onClick={handleToggleWishlistVisibility}
                  >
                    <FavoriteIcon />
                  </li>
                  <li
                    className={style.iconListItems}
                    onClick={handleToggleProfileVisibility}
                  >
                    <AccountCircleIcon />
                  </li>
                </>
              )}
            </ul>
          </nav>
        </Container>
      </header>
      <Searchbar open={isSearchOpen} close={toggleSearchVisibility} />
      <div className={style.topbar}>
        <span className={style.openbtn} onClick={() => setSidebar(!sidebar)}>
          &#9776;
        </span>
        <Logo width="100px" />
        <div className={sidebar ? style.sidenav : style.closeSidenav}>
          <a className={style.closebtn} onClick={() => setSidebar(!sidebar)}>
            {/* &times; */}
            <CloseOutlinedIcon />
          </a>
          <h1 style={{ marginBottom: "24px" }}>MENU</h1>
          <a href={!userRole ? "/login" : "/dashboard"}>
            <AccountCircleOutlinedIcon
              style={{
                fontWeight: "light",
                color: "#1c1b1f",
                marginRight: "12px",
                fontSize: "24px",
              }}
            />{" "}
            My Profile
          </a>
          <div>
            <Profile />
          </div>
          <a href={authStatus ? "/login" : "/dashboard"}>
            <ShoppingBagOutlinedIcon
              style={{
                fontWeight: "light",
                color: "#1c1b1f",
                marginRight: "12px",
                fontSize: "24px",
              }}
            />{" "}
            Orders
          </a>
          <a href="/seller">
            <SellOutlinedIcon
              style={{
                fontWeight: "light",
                color: "#1c1b1f",
                marginRight: "12px",
                fontSize: "24px",
              }}
            />{" "}
            Seller Request
          </a>
          {/* <a href="#" onClick={handleToggleWishlistVisibility}>
            <FavoriteBorderOutlinedIcon
              style={{
                fontWeight: "light",
                color: "#1c1b1f",
                marginRight: "12px",
                fontSize: "24px",
              }}
            />{" "}
            My Wishlist
          </a> */}
          {userRole === "admin" || userRole === "seller" && (
            <a href="/dashboard">
            <TimelineIcon
              style={{
                fontWeight: "light",
                color: "#1c1b1f",
                marginRight: "12px",
                fontSize: "24px",
              }}
            />{" "}
            Dashboard
          </a>
          )}
          <a href="/blogs">
            <LibraryBooksOutlinedIcon
              style={{
                fontWeight: "light",
                color: "#1c1b1f",
                marginRight: "12px",
                fontSize: "24px",
              }}
            />{" "}
            Blogs
          </a>
          <div className={style.buttons}>
            <LogoutBtn wid="100%" />
          </div>
        </div>
      </div>
      <div className={style.bottomnavbar}>
        <a href="/">
          <Home />
        </a>
        <a onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <SearchIcon />
        </a>
        <a href="/checkout">
          <AddShoppingCartIcon />
        </a>
        <a href={authStatus ? "/dashboard" : "/login"}>
          <AccountCircleIcon />
        </a>
      </div>
    </>
  );
};

export default Header;
