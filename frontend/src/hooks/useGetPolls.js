import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetPolls = () => {
    const [loading, setLoading] = useState(false);
	const [polls, setPolls] = useState([]);

	useEffect(() => {
		const getPolls = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/poll");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setPolls(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getPolls();
	}, []);

	return { loading, polls };
}

export default useGetPolls;