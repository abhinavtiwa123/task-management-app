import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"
import { authActions } from '../store/Auth'

const Login = () => {
    const [Data, setData] = useState({ username: "", password: "" });
    const history = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (isLoggedIn === true) {
        history("/");
    }
    const dispatch = useDispatch();

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async () => {
        try {
            if (Data.username === "" || Data.password === "") {
                alert("All fields are required");
            } else {
                const response = await axios.post("https://task-management-app-2xu3.onrender.com/api/v1/log-in", Data);
                setData({ username: "", password: "" })
                localStorage.setItem("id", response.data.id)
                localStorage.setItem("token", response.data.token);
                dispatch(authActions.login());
                history("/");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="h-[98vh] flex items-center justify-center px-4">
            <div className="p-6 w-full sm:w-3/4 md:w-2/4 lg:w-2/6 rounded bg-gray-800 shadow-lg">
                <div className="text-2xl font-semibold text-white text-center mb-4">Login</div>

                <input
                    type="text"
                    placeholder="Username"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
                    name="username"
                    value={Data.username}
                    onChange={change}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
                    name="password"
                    value={Data.password}
                    onChange={change}
                />

                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                    <button
                        className="bg-blue-400 w-full sm:w-auto text-xl font-semibold text-black px-4 py-2 rounded cursor-pointer hover:bg-blue-500 transition"
                        onClick={submit}
                    >
                        Log In
                    </button>
                    <Link
                        to="/signup"
                        className="text-gray-400 hover:text-gray-200 text-sm sm:text-base text-center"
                    >
                        Not having an account? Signup here
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
