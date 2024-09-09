import Titlebox from "../components/Titlebox"
import "./Stats.scss";
import { Line, Pie } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
		Title, Tooltip, Legend,
		ArcElement, } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement,
	Title, Tooltip, Legend );
const Statistics = () => {
	const newCustomers = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		datasets: [{
			label: "Meetings",
			data: [65, 59, 80, 81, 56, 55],
			fill: false,
			borderColor: "rgba(75, 192, 192, 1)",
	},],};
	const event = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		datasets: [{
			label: "Event organized",
			data: [32, 59, 80, 81, 56, 70],
			fill: false,
			borderColor: "rgba(75, 192, 192, 1)",
	},],};

	const astrologicData = {
		labels: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Aquarius", "Sagittarius", "Capricorn", "Pisces"],
		datasets: [
	  		{
				data: [12, 19, 3, 5, 2, 3, 8, 10, 4, 12, 20, 9],
				backgroundColor: [
		  			"rgba(255, 0, 0, 0.2)",
		  			"rgba(0, 255, 0, 0.2)",
		  			"rgba(0, 0, 255, 0.2)",
		  			"rgba(255, 255, 0, 0.2)",
		  			"rgba(0, 255, 255, 0.2)",
		  			"rgba(255, 0, 255, 0.2)",
					"rgba(255, 165, 0, 0.2)",
					"rgba(128, 0, 128, 0.2)",
					"rgba(255, 105, 180, 0.2)",
					"rgba(165, 42, 42, 0.2)",
					"rgba(128, 128, 128, 0.2)",
					"rgba(0, 0, 0, 0.2)",
				],
				borderColor: [
					"rgba(255, 0, 0, 0.2)",
					"rgba(0, 255, 0, 0.2)",
					"rgba(0, 0, 255, 0.2)",
					"rgba(255, 255, 0, 0.2)",
					"rgba(0, 255, 255, 0.2)",
					"rgba(255, 0, 255, 0.2)",
				  	"rgba(255, 165, 0, 0.2)",
				  	"rgba(128, 0, 128, 0.2)",
				  	"rgba(255, 105, 180, 0.2)",
				  	"rgba(165, 42, 42, 0.2)",
				  	"rgba(128, 128, 128, 0.2)",
				  	"rgba(0, 0, 0, 0.2)",
				],
				borderWidth: 1,
	  		},
		],
	};

	const genderData = {
		labels: ["Women", "Men", "Others"],
		datasets: [
	  		{
				data: [20, 25, 4],
				backgroundColor: [
		  			"rgba(255, 105, 180, 0.2)",
		  			"rgba(0, 255, 255, 0.2)",
					"rgba(128, 128, 128, 0.2)",
				],
				borderColor: [
					"rgba(255, 105, 180, 0.2)",
					"rgba(0, 255, 255, 0.2)",
					"rgba(128, 128, 128, 0.2)",
				],
				borderWidth: 1,
	  		},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
	};

    return (
    	<>
		<Titlebox title="Statistics"></Titlebox>
      	<div className="container">
        	<div className="box">
          		<h3 className="title is-4 dark-text">Event last months</h3>
          		<div style={{ height: "300px" }}>
            		<Line data={event} options={options} />
          		</div>
        	</div>
			<div className="box">
				<h3 className="title is-4 dark-text">Astologic signs</h3>
				<div style={{ height: "300px", width: "300px" }}>
      				<Pie data={astrologicData} options={options} />
    			</div>
			</div>
			<div className="box">
				<h3 className="title is-4 dark-text">Genders</h3>
				<div style={{ height: "300px", width: "300px" }}>
      				<Pie data={genderData} options={options} />
    			</div>
			</div>
      	</div>
		<div className="container">
			<div className="box">
          		<h3 className="title is-4 dark-text">Encounters last months</h3>
          		<div style={{ height: "300px" }}>
            		<Line data={newCustomers} options={options} />
          		</div>
        	</div>
		</div>
      	</>
    )
  };

export default Statistics;