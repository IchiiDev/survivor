import "./Tips.scss";
import { useEffect, useState } from "react";

const Tips = () => {
	const [tips, setTips] = useState<any>([]);

	const fetchCustomers = async () => {
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
			const randomTips = getRandomElements(data, 9);
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

	useEffect(() => {
		fetchCustomers();
	});
    return (
    	<>
			{tips.length > 0 && (
				<>
				<div className="box-container">
					<div className="box firsts-boxes">
						<h3 className="title is-4 dark-text">{tips[0].title}</h3>
						<p className="basic-text-color">{tips[0].tip}</p>
					</div>
					<div className="box firsts-boxes">
						<h3 className="title is-4 dark-text">{tips[1].title}</h3>
						<p className="basic-text-color">{tips[1].tip}</p>
					</div>
					<div className="box last-boxes">
						<h3 className="title is-4 dark-text">{tips[2].title}</h3>
						<p className="basic-text-color">{tips[2].tip}</p>
					</div>
				</div>
				<div className="box-container">
					<div className="box firsts-boxes">
						<h3 className="title is-4 dark-text">{tips[3].title}</h3>
						<p className="basic-text-color">{tips[3].tip}</p>
					</div>
					<div className="box firsts-boxes">
						<h3 className="title is-4 dark-text">{tips[4].title}</h3>
						<p className="basic-text-color">{tips[4].tip}</p>
					</div>
					<div className="box last-boxes">
						<h3 className="title is-4 dark-text">{tips[5].title}</h3>
						<p className="basic-text-color">{tips[5].tip}</p>
					</div>
				</div>
				<div className="box-container">
					<div className="box firsts-boxes">
						<h3 className="title is-4 dark-text">{tips[6].title}</h3>
						<p className="basic-text-color">{tips[6].tip}</p>
					</div>
					<div className="box firsts-boxes">
						<h3 className="title is-4 dark-text">{tips[7].title}</h3>
						<p className="basic-text-color">{tips[7].tip}</p>
					</div>
					<div className="box last-boxes">
						<h3 className="title is-4 dark-text">{tips[8].title}</h3>
						<p className="basic-text-color">{tips[8].tip}</p>
					</div>
				</div>
				</>
			)}
      	</>
    )
  };

export default Tips;
