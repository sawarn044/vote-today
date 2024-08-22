import React from 'react'
import { useNavigate } from "react-router-dom";
import usePoll from '../zustand/usePoll';

const Poll = ({poll}) => {
    const navigate = useNavigate();
    const { setSelectedPoll} = usePoll();
    const handleVote = () => {
        setSelectedPoll(poll);
        navigate(`/vote/${poll._id}`)
    }
  return (
    <div className="flex justify-between">
        <div className='w-[50rem] min-h-14 rounded-lg shadow-md bg-gray-100 
        bg-clip-padding text-green-500 ps-8 flex items-center font-bold text-xl'>
        {poll.question}
    </div>
    <button className='btn btn-sm mt-2 w-[139px]  bg-green-500 text-white h-10' onClick={handleVote}>
		Vote 
	</button>
    </div>
    
  )
}

export default Poll;