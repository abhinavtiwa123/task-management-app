import React, { useEffect, useState } from 'react';
import { CgNotes } from "react-icons/cg";
import { FaStar, FaCheckCircle, FaTimesCircle, FaBars } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/Auth';
import axios from 'axios';

const Sidebar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState();

    const menuItems = [
        { title: "All tasks", icon: <CgNotes />, link: "/" },
        { title: "Important tasks", icon: <FaStar />, link: "/importantTasks" },
        { title: "Completed tasks", icon: <FaCheckCircle />, link: "/completedTasks" },
        { title: "Incompleted tasks", icon: <FaTimesCircle />, link: "/incompletedTasks" },
    ];

    const logout = () => {
        localStorage.clear("id");
        localStorage.clear("token");
        dispatch(authActions.logout());
        history("/signup");
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const headers = {
                    id: localStorage.getItem("id"),
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                };
                const res = await axios.get("https://task-management-app-2xu3.onrender.com/api/v2/get-all-tasks", { headers });
                setUserData(res.data.data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <>
            {/* Toggle Button - Mobile Only */}
            <div className="sm:hidden p-2 ml-2.5 mt-1.5 bg-gray-800 text-white fixed top-2 left-2 rounded-4xl z-50">
                <button onClick={() => setIsOpen(!isOpen)}>
                    <FaBars size={20} />
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed sm:static top-0 left-0 h-full bg-gray-800 p-4 rounded-2xl shadow-lg max-w-[260px] w-full sm:translate-x-0 transform transition-transform duration-300 z-40 flex flex-col 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}>

                {/* User Info */}
                {userData && (
                    <div className="text-center border-b border-gray-600 pb-4 mb-4">
                        <h2 className="text-lg font-semibold text-white">{userData.username}</h2>
                        <p className="text-gray-400 text-sm">{userData.email}</p>
                    </div>
                )}

                {/* Menu Items - Middle Section */}
                <div className="flex-1">
                    {menuItems.map((item, i) => (
                        <Link
                            to={item.link}
                            key={i}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-3 my-2 text-white bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-all duration-300 shadow-sm"
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-base">{item.title}</span>
                        </Link>
                    ))}
                </div>

                {/* Logout Button - Bottom Section */}
                <div className="pt-4 border-t border-gray-600">
                    <button
                        className="w-full bg-red-600 hover:bg-red-500 p-3 rounded-lg text-white font-medium transition-all duration-300 shadow-md"
                        onClick={logout}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;