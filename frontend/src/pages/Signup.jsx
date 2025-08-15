import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";

const Signup = () => {
    const history = useNavigate();

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (isLoggedIn === true) {
        history("/");
    }

    const [Data, setData] = useState({ username: "", email: "", password: "" });

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async () => {
        try {
            if (Data.username === "" || Data.email === "" || Data.password === "") {
                alert("All fields are required");
            } else {
                const response = await axios.post("https://task-management-app-2xu3.onrender.com/api/v1/sign-in", Data);
                console.log("Signup response:", response.data);
                setData({ username: "", email: "", password: "" });
                alert("Signup successful!");
                history("/login");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
            <div className="p-6 w-full max-w-md rounded-lg bg-gray-800 shadow-lg">
                <div className="text-2xl font-semibold text-white text-center mb-4">Signup</div>

                <input
                    type="text"
                    placeholder="Username"
                    className="bg-gray-700 text-white px-3 py-2 my-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="username"
                    value={Data.username}
                    onChange={change}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-700 text-white px-3 py-2 my-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="email"
                    value={Data.email}
                    onChange={change}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-700 text-white px-3 py-2 my-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    name="password"
                    value={Data.password}
                    onChange={change}
                />

                <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-4 gap-3">
                    <button
                        className="bg-blue-400 text-lg font-semibold text-black px-4 py-2 rounded cursor-pointer w-full sm:w-auto"
                        onClick={submit}
                    >
                        SignUp
                    </button>
                    <Link
                        to="/login"
                        className="text-gray-400 hover:text-gray-200 text-sm"
                    >
                        Already have an account? Login here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
