import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import usePoll from "../zustand/usePoll";

const useGetOptions = () => {
    const [loading, setLoading] = useState(false);
    const [poll, setPoll] = useState();
    const [selectedOption, setSelectedOption] = useState("");
    const {selectedPoll,setOption} = usePoll();

    const getPoll = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/poll/${selectedPoll._id}`);
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setPoll(data.poll);
            setSelectedOption(data.selectedOption);
            setOption(data.selectedOption);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
		getPoll();
	}, [selectedPoll]);

    return {loading,poll,selectedOption};
  
}

export default useGetOptions;