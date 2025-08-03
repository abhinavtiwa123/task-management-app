import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';

const InputData = ({ InputDiv, setInputDiv, UpdatedData, setUpdatedData, allTasks }) => {
    const [Data, setData] = useState({ title: "", description: "" });

    useEffect(() => {
        if (UpdatedData && UpdatedData.id !== "") {
            setData({ title: UpdatedData.title, description: UpdatedData.description });
        } else {
            setData({ title: "", description: "" });
        }
    }, [UpdatedData]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    // Check for duplicate title or description
    const isDuplicate = () => {
        return allTasks?.some(task =>
            task._id !== UpdatedData.id && (
                task.title.trim().toLowerCase() === Data.title.trim().toLowerCase() ||
                task.description.trim().toLowerCase() === Data.description.trim().toLowerCase()
            )
        );
    };

    // Submit new task
    const submitData = async () => {
        try {
            if (Data.title === "" || Data.description === "") {
                alert("All fields are required");
                return;
            }

            if (isDuplicate()) {
                alert("Title or Description already exists!");
                return;
            }

            await axios.post("http://localhost:1000/api/v2/create-task", Data, { headers });
            setData({ title: "", description: "" });
            setInputDiv("hidden");
        } catch (error) {
            console.error("Submit data failed:", error);
        }
    };

    // Update existing task
    const UpdateTask = async () => {
        try {
            if (Data.title === "" || Data.description === "") {
                alert("All fields are required");
                return;
            }

            const isSameAsOld =
                Data.title.trim().toLowerCase() === UpdatedData.title.trim().toLowerCase() &&
                Data.description.trim().toLowerCase() === UpdatedData.description.trim().toLowerCase();

            if (!isSameAsOld && isDuplicate()) {
                alert("Title or Description already exists!");
                return;
            }

            await axios.put(`http://localhost:1000/api/v2/update-tasks/${UpdatedData.id}`, Data, { headers });

            setUpdatedData({ id: "", title: "", description: "" });
            setData({ title: "", description: "" });
            setInputDiv("hidden");
        } catch (error) {
            console.error("Update task failed:", error);
        }
    };

    return (
        <>
            <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`} />
            <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className='w-2/6 bg-gray-900 p-4 rounded'>
                    <div className='flex justify-end'>
                        <button
                            className='text-2xl cursor-pointer'
                            onClick={() => {
                                setInputDiv("hidden");
                                setData({ title: "", description: "" });
                                setUpdatedData({ id: "", title: "", description: "" });
                            }}
                        >
                            <RxCross2 />
                        </button>
                    </div>

                    <input
                        type="text"
                        placeholder='Title'
                        name='title'
                        className='bg-gray-700 px-3 py-2 rounded w-full my-3'
                        value={Data.title}
                        onChange={change}
                    />

                    <textarea
                        name="description"
                        placeholder="Enter the description"
                        cols="30"
                        rows="10"
                        className='px-3 py-2 rounded w-full bg-gray-700 my-3'
                        value={Data.description}
                        onChange={change}
                    ></textarea>

                    {UpdatedData.id === "" ? (
                        <button
                            className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold cursor-pointer'
                            onClick={submitData}
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold cursor-pointer'
                            onClick={UpdateTask}
                        >
                            Update
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default InputData;
