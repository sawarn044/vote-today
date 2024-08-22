import React, { useState } from 'react'
import usePoll from '../zustand/usePoll';

const Options = ({givenOption, index, voted}) => {

    const {option,setOption} = usePoll();
    console.log(option);
    const handleClick = () => {
        setOption(givenOption._id);
    }

  return (
        <div className={`flex relative gap-4 w-[50rem] min-h-14 rounded-lg shadow-md bg-gray-100 
        bg-clip-padding text-green-500 ps-4 items-center font-bold text-xl 
        hover:border-green-400 cursor-pointer hover:border-2  
        ${option == givenOption._id ? "border-green-600 border-2" : ""}`} onClick={handleClick}>
        <div>{index+1}.</div>
        <div>{givenOption.option}</div>
        {voted ? <div className='text-green-500 font-medium text-xl absolute right-3 '>Votes : {givenOption.voteCount}</div> : <></>}
    </div>
    
  )
}

export default Options;