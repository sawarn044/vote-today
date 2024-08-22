import React, { useEffect, useState } from 'react'
import usePoll from '../zustand/usePoll';
import toast from "react-hot-toast";

const useGetVote = () => {

    const {selectedPoll,setSelectedPoll, option} = usePoll();

	const vote = async (selectedOption) => {
		try {
			const res = await fetch(`/api/poll/${selectedPoll._id}/${option}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ selectedOption }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
            setSelectedPoll(data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return { vote };
}

export default useGetVote;