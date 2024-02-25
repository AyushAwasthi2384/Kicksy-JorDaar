import style from "./Anime.module.css";
import img from "../../assets/images/AnimePage/bakugoS.png"
import img2 from "../../assets/images/AnimePage/SpideyS.png"
import { useState } from "react";
  

const Anime = () => {
  const [explore, setExplore] = useState(false);
  console.log(explore);
  return (
    <div>
    <div className={explore ? style.exploresec : ''}>
    <div style={{display:'flex', flexDirection:'row'}} >
      <div className={style.Container}>
          
          <div className={style.Card1}>
            
            <div className={style.head}> Explore our customized anime sneakers</div>
            <div className={style.Content}> 
            Calling all anime aficionados and sneakerheads alike – we've crafted a fusion like no other, blending your passion for iconic anime characters with the comfort and style of premium sneakers. Here, every pair tells a story, merging the dynamic worlds of anime creativity and sneaker fashion into one breathtaking masterpiece.
            </div>  
              <div className={style.Circle1}>
                <img className={style.image} src={img}></img>
              </div>

          </div>

        </div>

      <div className={style.Container}>
        <div className={style.Card2}>
          <div className={style.head}> Sneaker Culture + Anime Artistry</div>
            <div className={style.Content}> 
                  We understand your love for both quality footwear and captivating anime designs. 
                  That's why we've meticulously curated a collection that not only meets but exceeds your expectations.
                  Each sneaker is a canvas, waiting to be adorned with the vibrant hues and
                  intricate details of your favorite anime characters, ensuring that every step you take 
                  is a testament to your uniq ue style and personality.    
            </div>
            <button style={{position: 'absolute', width: '200px', height: '40px', backgroundColor: 'black',color: 'white', right: '0'}} onClick={()=>setExplore(true)}>
              Explore
            </button>
            <div className={style.head}> Sneaker Culture + Anime Artistry</div>
            <div className={style.head}> Sneaker Culture + Anime Artistry</div>
          <div className={style.Circle2}>
          <img className={style.image} src={img2}></img>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div className={explore ? ' ' : style.exploresec}>
        hello
    </div>
    </div>
  )
}

export default Anime