import Titlebox from "../components/Titlebox"
import './Home.scss';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
		Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,
	Title, Tooltip, Legend );

const Home = () => {
	const newCustomers = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
		datasets: [{
			label: 'Statistiques',
			data: [65, 59, 80, 81, 56, 55],
			fill: false,
			backgroundColor: 'rgba(75, 192, 192, 0.4)',
			borderColor: 'rgba(75, 192, 192, 1)',
	},],};
	const event = {
		labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
		datasets: [{
			label: 'Statistiques',
			data: [3, 7, 9, 17],
			fill: false,
			backgroundColor: 'rgba(75, 192, 192, 0.4)',
			borderColor: 'rgba(75, 192, 192, 1)',
	},],};
	const data = {
		labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
		datasets: [{
			label: 'Statistiques',
			data: [3, 7, 9, 17],
			fill: false,
			backgroundColor: 'rgba(75, 192, 192, 0.4)',
			borderColor: 'rgba(75, 192, 192, 1)',
	},],};

	  const options = {
		responsive: true,
		maintainAspectRatio: false,
	  };
    return (
    	<>
			<Titlebox title=""></Titlebox>
			<div className="container">
    			<div className="box">
    			    <h3 className="title is-4">New customers</h3>
    			    <div style={{ height: '300px' }}> <Line data={newCustomers} options={options} />
					</div>
    			</div>
    			<div className="box">
    			    <h3 className="title is-4">Event this month</h3>
    			    <div style={{ height: '300px' }}> <Line data={event} options={options} />
					</div>
    			</div>
    			<div className="box">
    			    <h3 className="title is-4">Graphique des Statistiques</h3>
    			    <div style={{ height: '300px' }}> <Line data={data} options={options} />
					</div>
    			</div>
    		</div>
			<div className="table-container">
                <table className="table is-striped is-fullwidth custom-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Duration</th>
                            <th>Max Participants</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Event 1</td>
                            <td>2024-09-05</td>
                            <td>2 hours</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>Event 2</td>
                            <td>2024-09-10</td>
                            <td>3 hours</td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <td>Event 3</td>
                            <td>2024-09-15</td>
                            <td>1.5 hours</td>
                            <td>200</td>
                        </tr>
                    </tbody>
                </table>
            </div>
      	</>
    )
  };

export default Home;
