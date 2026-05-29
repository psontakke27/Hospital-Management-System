

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const RoomPage = () => {
    const { hospitalId, departmentId } = useParams();
    console.log("🚀 ~ RoomPage ~ departmntId:", departmentId)
    console.log("🚀 ~ RoomPagee ~ hospitalId:", hospitalId)
    const [rooms, setRooms] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [formData, setFormData] = useState({
        departmentId: "",
        roomNumber: "",
        floor: "",
        type: "General",
        status: "active",
        roomMaxCapacity: 1,
    });

    // ---------------- FETCH ROOMS ----------------
    const fetchRooms = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/room/${departmentId}`);
            setRooms(res.data);
        } catch (error) {
            toast.error("Failed to fetch rooms");
        }
    };

    // ---------------- FETCH DEPARTMENTS ----------------
    const fetchDepartments = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/department/${hospitalId}`);
            setDepartments(res.data);
        } catch (error) {
            toast.error("Failed to fetch departments");
        }
    };

    useEffect(() => {
        fetchRooms();
        fetchDepartments();
    }, []);

    // ---------------- HANDLE CHANGE ----------------
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ---------------- CREATE ROOM ----------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/room", formData);

            toast.success("Room created successfully");

            setFormData({
                departmentId: "",
                roomNumber: "",
                floor: "",
                type: "General",
                status: "active",
                roomMaxCapacity:1,
            });

            fetchRooms();
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to create room"
            );
        }
    };

    return (
        <>
            <ToastContainer />

            <div className="p-5">
                <h1 className="text-3xl font-bold mb-5">All Rooms</h1>

                {/* ---------------- FORM ---------------- */}
                <form
                    onSubmit={handleSubmit}
                    className="border p-4 rounded mb-5"
                >
                    <div className="grid grid-cols-2 gap-4">
                        {/* Department */}
                        <select
                            name="departmentId"
                            value={formData.departmentId}
                            onChange={handleChange}
                            className="border p-2"
                            required
                        >
                            <option value="">Select Department</option>

                            {departments.map((dept) => (
                                <option key={dept._id} value={dept._id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>

                        {/* Room Number */}
                        <input
                            type="number"
                            name="roomNumber"
                            placeholder="Room Number"
                            value={formData.roomNumber}
                            onChange={handleChange}
                            className="border p-2"
                            required
                        />
                        
                        {/* Room Maximum capacity */}
                        <input
                            type="number"
                            name="roomMaxCapacity"
                            placeholder="Room maximum capacity"
                            value={formData.roomMaxCapacity}
                            onChange={handleChange}
                            className="border p-2"
                            required
                        />

                        {/* Floor */}
                        <input
                            type="number"
                            name="floor"
                            placeholder="Floor"
                            value={formData.floor}
                            onChange={handleChange}
                            className="border p-2"
                        />

                        {/* Room Type */}
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="border p-2"
                        >
                            <option value="ICU">ICU</option>
                            <option value="General">General</option>
                            <option value="Private">Private</option>
                            <option value="OT">OT</option>
                        </select>

                        {/* Status */}
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="border p-2"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                    >
                        Create Room
                    </button>
                </form>

                {/* ---------------- ROOM TABLE ---------------- */}
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Room No</th>
                            <th className="border p-2">Department</th>
                            <th className="border p-2">Floor</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room._id}>
                                <td className="border p-2">{room.roomNumber}</td>

                                <td className="border p-2">
                                    {room.departmentId?.name}
                                </td>

                                <td className="border p-2">{room.floor}</td>

                                <td className="border p-2">{room.type}</td>

                                <td className="border p-2">{room.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default RoomPage;