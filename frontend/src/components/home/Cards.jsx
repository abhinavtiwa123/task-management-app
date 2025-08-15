import React from 'react';
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const handleCompleteTask = async (id) => {
        try {
            await axios.put(
                `https://task-management-app-2xu3.onrender.com/api/v2/update-complete-task/${id}`,
                {},
                { headers }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleImportant = async (id) => {
        try {
            await axios.put(
                `https://task-management-app-2xu3.onrender.com/api/v2/update-imp-task/${id}`,
                {},
                { headers }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = (id, title, description) => {
        setInputDiv("fixed");
        setUpdatedData({ id, title, description });
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(
                `https://task-management-app-2xu3.onrender.com/api/v2/delete-tasks/${id}`,
                { headers }
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
            {data && data.map((items, i) => (
                <div key={i} className="flex flex-col justify-between bg-gray-800 rounded-sm p-4">
                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold">{items.title}</h3>
                        <p className="text-gray-300 my-2 text-sm sm:text-base">{items.description}</p>
                    </div>
                    <div className="mt-4 w-full flex flex-col sm:flex-row items-center">
                        <button
                            className={`${items.complete === false ? "bg-red-400" : "bg-green-700"} p-2 rounded w-full sm:w-3/6 cursor-pointer`}
                            onClick={() => handleCompleteTask(items._id)}
                        >
                            {items.complete === true ? "Completed" : "In Completed"}
                        </button>
                        <div className="text-white p-2 w-full sm:w-3/6 text-2xl flex justify-around mt-2 sm:mt-0 sm:mx-2">
                            <button onClick={() => handleImportant(items._id)}>
                                {items.important === false ? <CiHeart /> : <FaHeart className="text-red-500" />}
                            </button>
                            {home !== "false" && (
                                <button onClick={() => handleUpdate(items._id, items.title, items.description)}>
                                    <FaEdit />
                                </button>
                            )}
                            <button onClick={() => deleteTask(items._id)}>
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {home === "true" && (
                <button
                    className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
                    onClick={() => setInputDiv("fixed")}
                >
                    <IoIosAddCircle className="text-5xl" />
                    <h2 className="text-xl sm:text-2xl mt-4">Add Task</h2>
                </button>
            )}
        </div>
    );
};

export default Cards;
