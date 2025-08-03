import React, { useState, useEffect } from 'react'
import Cards from '../components/home/Cards'
import { IoIosAddCircle } from "react-icons/io";
import InputData from '../components/home/InputData';
import axios from 'axios';



const AllTasks = () => {
    const [InputDiv, setInputDiv] = useState("hidden")

    const [Data, setData] = useState()

    const [UpdatedData, setUpdatedData] = useState({ id: "", title: "", description: "" })

    useEffect(() => {
        const fetch = async () => {
            try {
                const headers = {
                    id: localStorage.getItem("id"),
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                };
                const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
                setData(response.data.data);
            } catch (error) {
                console.error("Fetch user data failed:", error);
            }
        };
        fetch();
    });

    return (
        <>
            <div>
                <div className='w-full flex justify-end px-4 py-2'>
                    <button onClick={() => setInputDiv("fixed")}>
                        <IoIosAddCircle className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300 cursor-pointer' />
                    </button>
                </div>
                {Data && <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setUpdatedData={setUpdatedData} />}
            </div>
            <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData} />
        </>
    )
}

export default AllTasks