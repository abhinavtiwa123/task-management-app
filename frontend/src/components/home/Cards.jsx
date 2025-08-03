import React from 'react'
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
            await axios.put(`http://localhost:1000/api/v2/update-complete-task/${id}`,
                {},
                { headers }
            );
        } catch (error) {
            console.log(error);
        }
    }
    // handle important task
    const handleImportant = async (id) => {
        try {
            await axios.put(`http://localhost:1000/api/v2/update-imp-task/${id}`, {},
                { headers }
            );
        } catch (error) {
            console.log(error);
        }
    }

    // handle edit task
    const handleUpdate = (id, title, description) => {
        setInputDiv("fixed");
        setUpdatedData({ id: id, title: title, description: description })
    }

    // handle delete task
    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:1000/api/v2/delete-tasks/${id}`,
                { headers }
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='grid grid-cols-3 gap-5 p-4'>
            {data && data.map((items, i) => (
                <div className='flex flex-col justify-between bg-gray-800 rounded-sm p-4'>
                    <div >
                        <h3 className='text-xl font-semibold'>{items.title}</h3>

                        <p className='text-gray-300 my-2'>{items.description}</p>
                    </div>
                    <div className='mt-4 w-full flex items-center'>
                        <button className={` ${items.complete === false ? "bg-red-400" : "bg-green-700"} p-2 rounded w-3/6 cursor-pointer`} onClick={() => handleCompleteTask(items._id)}
                        >
                            {items.complete === true ? "Completed" : "in Completed"}
                        </button>
                        <div className='text-white p-2 w-3/6 text-2xl flex justify-around mx-2'>

                            <button className='cursor-pointer' onClick={() => handleImportant(items._id)}>
                                {items.important === false ? <CiHeart /> : <FaHeart className='text-red-500' />}
                            </button>

                            {home !== "false" && (<button className='cursor-pointer' onClick={() => handleUpdate(items._id, items.title, items.description)}><FaEdit /></button>)
                            }

                            <button className='cursor-pointer' onClick={() => deleteTask(items._id)}><MdDelete />
                            </button>

                        </div>
                    </div>
                </div>
            ))}
            {home === "true" && (
                <button className='flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transion-all duration-300' onClick={() => setInputDiv("fixed")}>
                    <IoIosAddCircle className='text-5xl' />
                    <h2 className='text-2xl mt-4'>
                        Add Task</h2>
                </button>
            )}
        </div>
    )
}

export default Cards