import "./Tips.scss";
import { useEffect, useState } from "react";

const Tips = () => {
	const [tips, setTips] = useState<any>([]);
	const [expandedTip, setExpandedTip] = useState<number | null>(null);

	const fetchTips = async () => {
		try {
		  	const response = await fetch("http://localhost:3001/tips", {
				method: "GET",
				headers: {
				  "Content-Type": "application/json",
				  "Authorization": `Bearer ${localStorage.getItem("token")}`
				},
			});
		  	if (!response.ok) {
				throw new Error(`Erreur HTTP: ${response.status}`);
		  	}
			const data = await response.json();
			const randomTips = getRandomElements(data, 5);
			console.log(randomTips);
			await setTips(randomTips);
		} catch (error) {
		  console.error("Erreur lors de l'appel API", error);
		}
	};

	const getRandomElements = (array: any, count: number) => {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

	const handleTipClick = (index: number) => {
        setExpandedTip(expandedTip === index ? null : index);
    };

	useEffect(() => {
		fetchTips();
	}, []);
    return (
    	<>
			<ul className="tips-list">
                {tips.map((tip: any, index: number) => (
                    <li key={index}>
                        <div onClick={() => handleTipClick(index)} className="tip-title">
                            {tip.title}
							<span className={`chevron ${expandedTip === index ? 'expanded' : ''}`}></span>
                        </div>
                        <div className={`tip-content ${expandedTip === index ? 'expanded' : ''}`}>
                            {tip.tip}
                        </div>
                    </li>
                ))}
            </ul>
      	</>
    )
  };

export default Tips;
