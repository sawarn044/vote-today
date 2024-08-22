import React, { useEffect } from 'react'
import usePoll from '../../zustand/usePoll';
import useGetOptions from '../../hooks/useGetOptions';
import Options from '../../components/Options';
import useGetVote from '../../hooks/useGetVote';

const Vote = () => {
    const {option, selectedPoll} = usePoll();
    const {loading, poll,selectedOption} = useGetOptions();
    const {vote}=useGetVote();

    const onClickHandler = () => {
        vote(selectedOption);
    }

  return (
    <div className='flex flex-col items-center justify-center w-[80rem] mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter '>
        <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-semibold text-center text-green-500'>
			{selectedPoll.question}
		</h1>
        <button className='btn btn-sm mt-2 w-[139px]  bg-green-500 text-white h-10' 
            disabled={!option} onClick={onClickHandler}>
			Vote
		</button>
        </div>
				<div className='flex flex-col overflow-auto h-[30rem] mt-10 gap-10'>
            {poll?.options?.map((option,idx)=>(
                <Options key={idx} givenOption={option} index={idx} voted={selectedOption?true:false}/>
            ))}
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>

		<h1>Total Votes: {poll?.totalVotes}</h1>
		</div>
		</div>
  )
}

export default Vote