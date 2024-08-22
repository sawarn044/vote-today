import { useState } from 'react';
import { toast } from 'react-hot-toast';

const useCreatePoll = () => {
    const [loading, setLoading] = useState(false);
    const createNewPoll = async (question, options) => {
        setLoading(true);
		try {
			const res = await fetch('api/poll/create', {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ 
                    question,
                    options
                 }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
            setLoading(false);
        }
	};

	return { loading, createNewPoll };
  
}

export default useCreatePoll