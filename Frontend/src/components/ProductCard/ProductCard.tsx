import style from './ProductCard.module.css'
import Shoes from '../../assets/adidas.png' // Dummy Image of Shoes
import shoesColor from '../../assets/shoes_color.png' // Dummy Image of Shoes Color
import ColorCard from '../colorCard/colorCard' 
import { useState } from 'react'
const BestSeller = (product: any) => {
    const [shoesColorData,setShoesColorData] = useState([
        {
            id:1,
            color: shoesColor
            
        },
        {
            id:2,
            color: shoesColor
        },
        {
            id:3,
            color: shoesColor
        }

    ])
    const [activeId, setActiveId] = useState()
    const [imagesrc, setImageSrc] = useState(Shoes)

  return (
    <div className={style.container}>
        <div className={style.shoes}>
        <img src={imagesrc} className={style.shoes__image}/>
        </div>
          <div className={style.shoes__color}>
            {
            shoesColorData.map((item: any) => {
        return <ColorCard setImageSrc={setImageSrc} color={item.color} key={item.id} id={item.id} activeId={activeId} setActiveId={setActiveId}/>
            })
            }
        </div>
        <div className={style.shoes__info}>
            <div className={style.shoes__data}>
                <div className={style.shoes__name}>PRIMUS LITE KNIT WOMENS</div>
                <div className={style.shoes__price}>Rs. 20,456</div>
            </div>
           <p className={style.shoes__tags}>Road Running / Weight + Strength Training / Primal Movement / Calisthenics / Active Everyday</p>
           <p className={style.shoes__tagline}>A barefoot sneaker for strength training, animal flow and light
running</p>
        </div>

    </div>
  )
}

export default BestSeller