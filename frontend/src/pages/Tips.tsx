import "./Tips.scss";
import Titlebox from "../components/Titlebox";

const Tips = () => {
    return (
    	<>
        	<Titlebox title="Tips"></Titlebox>
			<div className="box-container">
        		<div className="box">
          			<h3 className="title is-4 dark-text">First Tip</h3>
        		</div>
				<div className="box">
					<h3 className="title is-4 dark-text">Second Tip</h3>
				</div>
				<div className="box">
					<h3 className="title is-4 dark-text">Third Tip</h3>
				</div>
			</div>
			<div className="box-container">
        		<div className="box">
          			<h3 className="title is-4 dark-text">First Tip</h3>
        		</div>
				<div className="box">
					<h3 className="title is-4 dark-text">Second Tip</h3>
				</div>
				<div className="box">
					<h3 className="title is-4 dark-text">Third Tip</h3>
				</div>
			</div>
			<div className="box-container">
        		<div className="box">
          			<h3 className="title is-4 dark-text">First Tip</h3>
        		</div>
				<div className="box">
					<h3 className="title is-4 dark-text">Second Tip</h3>
				</div>
				<div className="box">
					<h3 className="title is-4 dark-text">Third Tip</h3>
				</div>
			</div>
      	</>
    )
  };

export default Tips;
