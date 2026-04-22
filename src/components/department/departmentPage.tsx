import {  useFormik } from "formik";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios  from "axios";
import { useEffect, useState } from "react";

const DepartmentPage = () => {
   const { hospitalId } = useParams();
   console.log("🚀 ~ DepartmentPage ~ hospitalId:", hospitalId)
   const navigate = useNavigate();
     console.log("🚀 ~ DepartmentPage ~ navigate:", navigate)
     const [department , setDepartment] = useState([]);
     const [selectedDepartment, setSelectedDepartment] = useState(null);


     // fetch department
     const fetchDepartment = async () => {
        try {  //       `http://localhost:5000/department/${hospitalId}`

            const res = await axios.get(`http://localhost:5000/department/${hospitalId}`);
            console.log("🚀 ~ fetchDepartment ~ res:", res.data);
            setDepartment(res.data);
            
            
        } catch (error) {
            console.log("error",error)
        }
     } 
     useEffect(() =>{
        console.log("🚀 ~ inside useEffect DepartmentPage ~ hospitalId:", hospitalId)
        if(hospitalId){

            fetchDepartment()
        }
     }, [])

    //  const 
    const handleSelectDepartment= (id) =>{ 
        setSelectedDepartment(id);
        console.log("🚀 ~ handleSelectDepartmentn ~ id:", id)
        navigate(`/room/${id}`)

    }

     const departmentSchema = yup.object({
            name: yup.string().required("name is required"),
            type: yup.string().oneOf(["clinical", "support"]).required("Type is required"),
            maxRooms : yup.number().typeError("Must be a number").required("max room is required").min(1,"at least 1 room required"),
        })

     const formik = useFormik({
        initialValues: {
            name: "",
            type: "clinical",
            maxRooms: "",
        },
        validationSchema: departmentSchema,
        onSubmit: async (values ,{resetForm}) =>{
            try {
                const res = await axios.post(`http://localhost:5000/department`,{ 
               ... values ,  
               maxRooms:Number(values.maxRooms),
               hospitalId })          

                console.log("res", res.data)
                toast.success("Department added successfully")
                fetchDepartment()
                resetForm();
                
            } catch (error) {
                console.error(error)
                toast.error("error adding department")
                
            }
        }
     })
   return (
    <>
        <ToastContainer />

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                
                <h1 className="text-2xl font-bold text-center mb-6">
                  Add Department
                </h1>

                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Department Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Department Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        {formik.errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.name}
                            </p>
                        )}
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Type
                        </label>

                        <select
                            name="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="clinical">Clinical</option>
                            <option value="support">Support</option>
                        </select>
                    </div>
                    <div>
                        <label>
                            Room Capacity
                        </label>
                        <input
                            type="number"
                            name="maxRooms"
                            placeholder="max rooms"
                            value={formik.values.maxRooms}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Add Department
                    </button>

                </form>
            </div>
            <div>
                <div>
                    <h2>All Departments</h2>
                    {department.map((d) =>(
                        <div 
                            key = {d._id}
                            onClick={() => handleSelectDepartment(d._id)}
                            className="p-3 border rounded-lg mt-2 bg-gray-50 hover:bg-gray-100 transition">
                                <p><b>Name:</b> {d.name}</p>
                                <p><b>Type:</b> {d.type}</p>
                                <p><b>Room capacity:</b>{d.maxRooms}</p>
                                <p><b>Hospital Name :</b> {d.hospitalId.name}</p>

                            </div>
                    ))}

                </div>
            </div>
        </div>
    </>
);
}
export default DepartmentPage;