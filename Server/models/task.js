import mongoose from "mongoose";


const taskSchema = new mongoose.Schema(
{
title: { type: String, required: true },
status: {
type: String,
enum: ["Todo", "In Progress", "Done"],
default: "Todo",
},
projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
},
{ timestamps: true }
);


export default mongoose.model("Task", taskSchema);