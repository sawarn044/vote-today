import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiHome } from "react-icons/hi";
import { RxCrossCircled } from "react-icons/rx";
import useCreatePoll from '../../hooks/useCreatePoll';
import { toast } from 'react-hot-toast';
import {useNavigate } from "react-router-dom";

const CreatePoll = () => {
    
    const navigate = useNavigate();
    const [question, setQuestion] = useState("");
    const [optionFields, setOptionFields] = useState([
        {option: ''},
        {option: ''}
    ]);
    const handleFormChange = (event,index) => {
        let data = [...optionFields];
        data[index]['option'] = event.target.value;
        setOptionFields(data);
    }

    const submit = async (e) => {
        e.preventDefault();
        await createNewPoll(question,optionFields.map((field)=> field.option));
        navigate('/');
    }

    const addOption = () => {
        let object = {option:''}
        setOptionFields([...optionFields, object]);
    }

    const removeFields = (index) => {
        console.log(index);
        let data=[...optionFields];
        if(data.length==2) {
            toast.error("Minimum two Options required")
            return;
        }
        data.splice(index,1);
        setOptionFields(data);
    }

    const {loading, createNewPoll} = useCreatePoll();

  return (
    <div className='flex flex-col items-center justify-center w-[80rem] mx-auto'>
    <div className=' w-full p-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter min-h-[30rem]'>
        <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-semibold text-center text-green-500'>
		Create Poll
	    </h1>
        <Link to='/'>
        <HiHome className='size-10 fill-green-500'/>
		</Link>
        </div>
        <form onSubmit={submit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Add Question</span>
						</label>
						<input type='text' 
						placeholder= "Whats on your Mind ?" 
						className='w-[50%] input input-bordered h-10' 
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Add Options</span>
						</label>
					</div>
                    {optionFields.map((form,index)=>(
                        <div className="flex items-center gap-2 mt-3" key={index}>
						
						<input
							type='text'
							placeholder='#option'
							className='w-[50%] input input-bordered h-10'
							value={form.option}
							onChange={(event) => handleFormChange(event,index)}
						/>
                        <RxCrossCircled className='size-10 cursor-pointer text-green-400' onClick={() => removeFields(index)}/>
					</div>
                    ))}
                    <div className='flex flex-col justify-between gap-20'>
                <button type='button' className='btn btn-block btn-sm mt-2 bg-blue-400 text-white h-10 w-[130px]' onClick={addOption} disabled={optionFields.length > 3}>
					Add Option
				</button>
				<button type ="submit" className='btn btn-block btn-sm mt-2 bg-green-500 text-white h-10 w-[139px]' onClick={submit} disabled={loading}>
					{loading ? <span className='loading loading-spinner '></span> : "Create"}
				</button>     
		</div>
				</form>

    </div>
    </div>
  )
}

export default CreatePoll