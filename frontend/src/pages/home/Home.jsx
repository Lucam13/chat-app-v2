import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
	const { user } = useAuthContext();
	const [areas, setAreas] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAreas = async () => {
			try {
				const response = await axios.get("/areas");
				const filteredAreas = response.data.filter (area => area._id !== user.area);
				setAreas(filteredAreas);
				setLoading(false);
			} catch (error) {
				console.log("Error buscando areas:", error);
			}
		}
		fetchAreas();
	}, [user]);

	return (
		<div className='flex sm:h-[450px] md:h-[750px] rounded-lg overflow-hidden bg-orange-100 '>
			<Sidebar areas = {areas} loading = {loading} />
			<MessageContainer />
		</div>
	);
};
export default Home;