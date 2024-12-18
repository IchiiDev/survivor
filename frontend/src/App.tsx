import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Compatibility from "./pages/Compatibility";
import Wardrobe from "./pages/Wardrobe";
import Coaches from "./pages/Coaches";
import Customers from "./pages/Customers";
import Statistics from "./pages/Statistics";
import Tips from "./pages/Tips";
import Events from "./pages/Events";
import Nopage from "./pages/Nopage";
import Document from './pages/Document';
import Customer from './pages/Customer';

function App() {
  	return (
    	<Router>
      		<Routes>
        		<Route path="/login" element={<Login />} />
        		<Route path="/" element={<Layout />}>
          			<Route index element={<Home />} />
          			<Route path="/compatibility" element={<Compatibility />} />
          			<Route path="/wardrobe" element={<Wardrobe />} />
          			<Route path="/coaches" element={<Coaches />} />
          			<Route path="/customers" element={<Customers />} />
					<Route path="/customers/:id" element={<Customer />} />
          			<Route path="/statistics" element={<Statistics />} />
          			<Route path="/tips" element={<Tips />} />
          			<Route path="/events" element={<Events />} />
					<Route path="/document" element={<Document />} />
          			<Route path="*" element={<Nopage />} />
        		</Route>
      		</Routes>
    	</Router>
  	);
}

export default App;
