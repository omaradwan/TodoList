const mongoose = require("mongoose")
const list = require("../model/Todo")
const user = require("../model/user")
const asyncHandler = require("express-async-handler");

exports.showList = asyncHandler (async(req,res,next) => {
    
        const token = req.headers["Authorization"] || req.headers["authorization"];
        const splitToken = token.split(" ")[1];
        const userr = await user.findOne({token:splitToken});
        console.log(splitToken);
        const lists =  await list.find({userId:userr._id},{"__v":false});
        console.log(lists);
        res.json(lists);
    // res.render("/ToDo")
});


exports.deleteMany = asyncHandler(async(req,res) => {
    const token = req.headers["Authorization"] || req.headers["authorization"];
    const splitToken = token.split(" ")[1];
    const userr = await user.findOne({token:splitToken});
    const emptyList =  await list.deleteMany({userId:userr._id})  
    // res.json({status:status.SUCCESS,data:{emptyList}});
    res.json(emptyList);

})

exports.deleteOne = asyncHandler(async(req,res) => {
       const id = req.params.id;
       const lists = await list.deleteOne({_id:id})
    //    res.json({status:status.SUCCESS,data:{lists}});
        res.json(lists);

})

exports.add = asyncHandler(async(req,res,next) => {
        const token = req.headers["Authorization"] || req.headers["authorization"];
        const splitToken = token.split(" ")[1];
        const userr = await user.findOne({token:splitToken});
        const addedList = new list(req.body);
        addedList.userId = userr._id;
        const lists = await addedList.save({userId:user._id});
        // res.json({status:status.SUCCESS,data:lists});
        res.json(lists);

})

exports.update = asyncHandler( async(req,res) => {
       const id = req.params.id;
       const updated = await list.updateOne({_id:id},{$set:{...req.body}})
    //    res.json({status:status.ERROR,data:{updated}});
       res.json(updated);
})

exports.search = asyncHandler(async(req,res) => {
    const body = req.body.description
    console.log(body);
    const todo = await list.findOne({description:body})
    res.status(200).json(todo)
})

exports.done = asyncHandler ( async(req,res) => {

      const id = req.params.id;
      const todo = await list.findOne({_id:id});  
      todo.done = true;
      todo.save()
      res.status(200).json(todo);
})