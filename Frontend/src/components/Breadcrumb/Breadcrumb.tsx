import { useState } from "react";
import style from "./Breadcrumb.module.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from "@mui/material";

import Profile from "../Profile/Profile";
import { toggleProfileVisibility } from "../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";

const Breadcrumb = ({ currentSection, currentAction }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(true)
  const [searchtxt, setSearchTxt] = useState("")

  const handleToggleProfileVisibility = () => {
    dispatch(toggleProfileVisibility());
  };


  return (
    <>
      <div className={style.container}>
        <div className={style.header}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* {search ?
            <CloseIcon onClick={() => setSearch(!search)} />
            :
            <SearchIcon onClick={() => setSearch(!search)} />
          } */}
            <div>
              {search ?
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    className={style.searchBar}
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearchTxt(e.target.value)}
                  />
                  <button className={style.goButton}>GO</button>
                </div> : null
              }
            </div>
          </div>
          <div>
            <Profile />
            <div>
              <Avatar onClick={handleToggleProfileVisibility} className={style.avatar} alt="Remy Sharp" />
            </div>

          </div>
        </div>
        <div className={style.currentSectionText} style={{ marginTop: "-10px" }}>Hello, Welcome Back👋</div>
        {currentSection && (
          <div className={style.step}>
            <div className={style.circle}></div>
            <div className={style.currentSectionText}> {currentSection}</div>
          </div>
        )}
        {currentAction && (
          <div className={style.step}>
            <div className={style.circle}></div>
            <div className={style.currentSectionText}>{currentAction}</div>
          </div>
        )}
      </div>
    </>
  );
};



export default Breadcrumb;
