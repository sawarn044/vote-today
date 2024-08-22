import Option from "../models/option.model.js";
import Poll from "../models/poll.model.js";

export const createPoll = async (req,res) => {
    try {
        const {question , options} = req.body;
        const createdBy = req.user._id;

        const existingPoll = await Poll.findOne({question});

        if(existingPoll){
            return res.status(400).json({error: "Poll already exists"});
        }

        const newPoll = new Poll({
            question,
            createdBy,
        });

        options.forEach( async (option) => {
            const newOption = new Option({
                option
            });

            if(newOption){
                newPoll.options.push(newOption._id);
                newOption.save();
            }

        });

        await newPoll.save();
        
        res.status(201).json(newPoll);

    } catch (error) {
        console.log("Error in createPoll controller", error.message);
        res.status(500).json({error: "Internal Server error"});

    }
}

export const getPolls = async (req,res) => {
    try {
        const polls = await Poll.find().select("question");

        res.status(200).json(polls);

    } catch (error) {
        console.log("Error in getPolls controller", error.message);
        res.status(500).json({error: "Internal Server error"});
    }
}

export const getPollById = async (req,res) => {
    try {
        const {id : pollId} = req.params;
        const userId = req.user._id;
        const poll = await Poll.findOne({_id : pollId}).populate("options");

        let selectedOption = "";

        poll.options.every((option) => {

            if(option.votedBy.includes(userId)){
                selectedOption = option._id;
                return false;
            }
            return true;
        });

        const data ={
            poll : poll,
            selectedOption: selectedOption
        }
        res.status(200).json(data);

    } catch (error) {
        console.log("Error in getPollById controller", error.message);
        res.status(500).json({error: "Internal Server error"});
    }
}

export const voteonPoll = async (req,res) => {
    try {
        const {id : pollId, optionId} = req.params;
        const voterId = req.user._id;
        const {selectedOption} = req.body;


        if(selectedOption){
            
            const option = await Option.findOne({_id : selectedOption});

            if(option){
                const index = option.votedBy.indexOf(voterId);
                if (index > -1) { 
                option.votedBy.splice(index, 1); 
                }
                option.voteCount -= 1;
            }
            await option.save();
        }

        const option = await Option.findOne({_id : optionId});

        if(option){

            option.votedBy.push(voterId);
            option.voteCount += 1;
        }
        await option.save();

        const poll = await Poll.findOne({_id : pollId}).populate("options");

        if(poll && !selectedOption){
            poll.totalVotes += 1;
        }

        await poll.save();

        res.status(201).json(poll);

    } catch (error) {
        console.log("Error in voteonPoll controller", error.message);
        res.status(500).json({error: "Internal Server error"});
    }
}