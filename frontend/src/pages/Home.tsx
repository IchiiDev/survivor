import Titlebox from "../components/Titlebox"
import "./Stats.scss";

const Home = () => {
    return (
    	<>
		<Titlebox title=""></Titlebox>
      	<div className="container">
        	<div className="box centered-box">
          		<h3 className="title is-4 dark-text">Number of customers</h3>
          		<h3 className="subtitle is-2 dark-text">45</h3>
        	</div>
        	<div className="box centered-box">
          		<h3 className="title is-4 dark-text">Number of coaches</h3>
          		<h3 className="subtitle is-2 dark-text">12</h3>
        	</div>
        	<div className="box centered-box">
          		<h3 className="title is-4 dark-text">Number of events</h3>
          		<h3 className="subtitle is-2 dark-text">126</h3>
        	</div>
      </div>

      <div className="table-container">
        	<table className="table custom-table-stats">
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
