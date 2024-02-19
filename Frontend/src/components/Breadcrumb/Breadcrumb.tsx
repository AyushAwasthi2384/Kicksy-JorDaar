import { useSelector } from "react-redux";
import style from "./Breadcrumb.module.css";

const Breadcrumb = () => {
  const { currentSection, currentAction } = useSelector(
    (state) => state.dashboard
  );
  return (
    <div className={style.container}>
      <div className={style.heading}>Dashboard</div>
      {currentSection && (
        <div className={style.step}>
          <div>1</div>
          <div> {currentSection}</div>
        </div>
      )}
      {currentAction && (
        <div className={style.step}>
          <div> 1 </div>
          <div>{currentAction}</div>
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
