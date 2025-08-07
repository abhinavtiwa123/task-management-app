import React, { useEffect, useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { FaStar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/Auth'
import axios from 'axios';


const Sidebar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const data = [
        {
            title: "All tasks",
            icon: <CgNotes />,
            link: "/"

        },
        {
            title: "Important tasks",
            icon: <FaStar />,
            link: "/importantTasks"
        },
        {
            title: "Completed tasks",
            icon: <FaCheckCircle />,
            link: "/completedTasks"
        },
        {
            title: "Incompleted tasks",
            icon: <FaTimesCircle />,
            link: "/incompletedTasks"
        },
    ];

    const [Data, setData] = useState()

    const logout = () => {
        localStorage.clear("id");
        localStorage.clear("token");
        dispatch(authActions.logout());
        history("/signup");
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const headers = {
                    id: localStorage.getItem("id"),
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                };
                const response = await axios.get("https://task-management-app-2xu3.onrender.com/api/v2/get-all-tasks", { headers });
                setData(response.data.data);
            } catch (error) {
                console.error("Fetch user data failed:", error);
            }
        };
        fetch();
    }, []);

    return (
        <>
            {Data && (<div>
                <h2 className='text-xl font-semibold text-white'>{Data.username}</h2>
                <h4 className='mb-1 text-gray-200'>{Data.email}</h4>
            </div>)}
            <div>
                {data.map((items, i) => (
                    <Link to={items.link} key={i} className='flex items-center space-x-2 my-2 text-white hover:bg-gray-600 p-2 rounded transition-all duration-300'>
                        <span className="text-lg">{items.icon}</span>
                        <span>{items.title}</span>
                    </Link>
                ))}
            </div>
            <div >
                <button className='bg-gray-600 w-full p-2 rounded mt-4 text-white text-center cursor-pointer' onClick={logout}>Log Out</button>
            </div>
        </>
    );
};

export default Sidebar;
