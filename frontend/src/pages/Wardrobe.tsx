import { useState } from 'react';

const Wardrobe = () => {
	const clothes = { // Call API to get the images
		hat: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRrcaxpYyiNcvpwSzAqomvVCLImzOqtv41tw&s", "/assets/shoe.svg"],
		top: ["https://www.svgrepo.com/show/160974/t-shirt.svg", "/assets/shoe.svg"],
		bottom: ["https://icons.veryicon.com/png/o/miscellaneous/buckle/pants-5.png", "/assets/shoe.svg"],
		shoes: ["https://www.svgrepo.com/show/50532/shoes.svg", "/assets/shoe.svg", "/assets/boots.svg"]
	}
	const [indices, setIndices] = useState({ hat: 0, top: 0, bottom: 0, shoes: 0 });
	const changeClothe = (type: keyof typeof clothes, direction: number) => {
        setIndices(prevIndices => {
            const newIndex = prevIndices[type] + direction;
            const length = clothes[type].length;
            return {
                ...prevIndices,
                [type]: (newIndex < 0) ? length - 1 : (newIndex >= length) ? 0 : newIndex
            };
        });
    };
    return (
    	<div>
        	<h1 className="basic-text-color wardrobe">Wardrobe</h1>
			<div className="wardrobe-container">
				<ul>
					<li>
						<img onClick={() => changeClothe('hat', -1)} className="wardrobe-arrows" src="/assets/left-arrow.svg" alt="left-arrow" />
						<img className="wardrobe-container-img" src={clothes.hat[indices.hat]} alt="clothe hat" />
						<img onClick={() => changeClothe('hat', 1)} className="wardrobe-arrows" src="/assets/right-arrow.svg" alt="right-arrow" />
					</li>
					<li>
						<img onClick={() => changeClothe('top', -1)} className="wardrobe-arrows" src="/assets/left-arrow.svg" alt="left-arrow" />
						<img className="wardrobe-container-img" src={clothes.top[indices.top]} alt="clothe top" />
						<img onClick={() => changeClothe('top', 1)} className="wardrobe-arrows" src="/assets/right-arrow.svg" alt="right-arrow" />
					</li>
					<li>
						<img onClick={() => changeClothe('bottom', -1)} className="wardrobe-arrows" src="/assets/left-arrow.svg" alt="left-arrow" />
						<img className="wardrobe-container-img" src={clothes.bottom[indices.bottom]} alt="clothe bottom" />
						<img onClick={() => changeClothe('bottom', 1)} className="wardrobe-arrows" src="/assets/right-arrow.svg" alt="right-arrow" />
					</li>
					<li>
						<img onClick={() => changeClothe('shoes', -1)} className="wardrobe-arrows" src="/assets/left-arrow.svg" alt="left-arrow" />
						<img className="wardrobe-container-img" src={clothes.shoes[indices.shoes]} alt="clothe shoes" />
						<img onClick={() => changeClothe('shoes', 1)} className="wardrobe-arrows" src="/assets/right-arrow.svg" alt="right-arrow" />
					</li>
				</ul>
			</div>
      	</div>
    )
  };

export default Wardrobe;
