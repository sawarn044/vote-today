import React from 'react'
import Poll from '../../components/Poll'
import useGetPolls from '../../hooks/useGetPolls'
import {useNavigate } from "react-router-dom";
import useLogout from '../../hooks/useLogout';

const Home = () => {
  const navigate = useNavigate();
  const {loading, polls} = useGetPolls();
  const {load, logout} =useLogout();
  const routeToCreate = () => {
    navigate('/create');
  }
  return (
    <div className='flex flex-col items-center justify-center w-[80rem] mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter '>
        <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-semibold text-center text-green-500'>
					Live Polls
				</h1>
        <div>
        <button className='btn btn-sm w-[139px]  bg-green-500 text-white h-10' onClick={routeToCreate}>
						Create Poll
				</button>
        <button className='btn btn-sm w-[80px]  bg-red-500 text-white h-10 ml-1' onClick={logout} >
          {load ? <span className='loading loading-spinner '></span> : "Logout"}
				</button>
        </div>
        
        </div>
				<div className='flex flex-col overflow-auto h-[30rem] mt-10 gap-10'>
          {polls.map((poll,idx) => (
            <Poll key={idx} poll={poll}/>
          ))}
          {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>

				
			</div>
		</div>
  )
}

export default Home