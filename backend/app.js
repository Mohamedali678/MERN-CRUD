const express = require("express")
const mongoose = require("mongoose")

const cors = require("cors");

const app = express();
const studentModel = require("./models/studentModel")

//database connection starts here

mongoose.connect("mongodb://localhost:27017").then(() => {
    console.log("Database has been connected successfully");
}).catch((error) => {
    console.log(error);
})
app.use(express.json())

app.use(cors())


app.get("/students", async(req, res) => {

    try{
        const getData = await studentModel.find();
        res.send(getData);

    } catch(error){
        console.log(error);
    }
})


app.post("/add", async(req, res) => {
    try{

        const data = studentModel({
            ID: req.body.ID,
            name: req.body.name,
            studentClass: req.body.studentClass,
            address: req.body.address
        })
        const savedData = await data.save();
        res.send(savedData);

    }catch(error){
        console.log(error);
    }
})

//getting single data


app.get("/students/:id", async(req, res) => {
    try{

        const id = req.params.id;
        const getOneData = await studentModel.findOne({_id: id});
        res.json(getOneData);

    }catch(error){
        console.log(error);
    }
})



//update

// app.put("/update/:id", async(req, res) => {
//     try{
//         const id = req.params.id;
//         const updateData = await studentModel.updateOne({_id: id},{$set: req.body});
//         res.json(updateData);

//     }catch(error){
//         console.log(error);
//     }
// })


app.put("/update/:id", async(req, res) => {

    try{
        const id = req.params.id;
        const updateData = await studentModel.updateOne(
            {_id: req.params.id},
            {$set: req.body}
        )
        res.json(updateData);
    }catch(error){
        console.log(error);
    }
})





//delete

app.delete("/delete/:id", async(req, res) => {

    try{

        const id = req.params.id;
        const deleteData = await studentModel.findByIdAndDelete(id);

        res.json(deleteData);

    }catch(error){
        console.log(error);
    }
})




//searching in database

app.get("/search/:key", async(req, res) => {

    try {
        const searchData = await studentModel.find({
            "$or": [
                {
                    name: { $regex: req.params.key }
                },
                {
                    address: { $regex: req.params.key }
                },
                {
                    ID: { $regex: req.params.key }
                },
            ]
        })
        res.json(searchData)
    }catch(error){
        console.log(error)
    }

}
)

app.listen(1000, () => {
    console.log("Server is running on port 1000");
})