import React, { useEffect, useState } from 'react'
import Cards from '../components/home/Cards'
import axios from 'axios'


const CompletedTasks = () => {
    const [Data, setData] = useState()

    useEffect(() => {
        const fetch = async () => {
            try {
                const headers = {
                    id: localStorage.getItem("id"),
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                };
                const response = await axios.get("http://localhost:1000/api/v2/get-complete-tasks", { headers });
                setData(response.data.data);
            } catch (error) {
                console.error("Fetch user data failed:", error);
            }
        };
        fetch();
    });

    return (
        <div>
            <Cards home={"false"} data={Data} />
        </div>
    )
}

export default CompletedTasks