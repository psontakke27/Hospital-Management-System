import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios"
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";


const HospitalForm = () => {

    const navigate = useNavigate();
    const [hospital, setHospital] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);

    const handleSelectHospital = (id) => {
        setSelectedHospital(id);
        console.log("selected hospital", id);
        navigate(`/${id}/department`);

    }
    const fetchHospitals = async () => {
        try {
            const res = await axios.get("http://localhost:5000/hospital");
            setHospital(res.data);
            console.log("🚀 ~ fetchHospitals ~ res.data:", res.data)

        } catch (error) {
            console.log("hospital fetching error", error);
        }
    }

    useEffect(() => {
        fetchHospitals();
    }, []);

    const hospitalSchema = yup.object({
        name: yup.string().required("hospital name is required"),
        address: yup.string().required("Address is required"),
        contactNumber: yup.string().required("contact Number is required").matches(/^[0-9]{10}$/, "Must be exactly 10 digits").test("not-invalid-start",
            "Contact number cannot start with 12345",
            (value) => {
                if (!value) {
                    return false;
                }
                const invalidStarts = ["1", "2", "3", "4", "5"];
                return !invalidStarts.some(num => value.startsWith(num));
            }
        )
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
            contactNumber: ""
        },
        validationSchema: hospitalSchema,

        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await axios.post("http://localhost:5000/hospital", values);
                toast.success("Hospital created successfully")
                console.log("created: ", res.data)
                fetchHospitals()
                resetForm();
            } catch (error) {
                console.error(error);
                toast.error("Error creating hospital ");
            }
        }
    });
    return (
        <>
            <ToastContainer />
            <div className=" min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Hospital
                    </h1>
                    <div>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div>
                                <label>Hospital Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                                {
                                    formik.touched.name && formik.errors.name && (
                                        <p className="text-red-500 text-sm">{formik.errors.name}</p>
                                    )
                                }

                            </div>
                            <div>
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    onChange={formik.handleChange}
                                    value={formik.values.address}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                                {
                                    formik.touched.address && formik.errors.address && (
                                        <p className="text-red-500 text-sm">{formik.errors.address}</p>
                                    )
                                }

                            </div>

                            <div>
                                <label>Contact Number</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    onChange={formik.handleChange}
                                    value={formik.values.contactNumber}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                                {
                                    formik.touched.contactNumber && formik.errors.contactNumber && (
                                        <p className="text-red-500 text-sm">{formik.errors.contactNumber}</p>
                                    )
                                }

                            </div>
                            <div>
                                <button type="submit"
                                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-lg font-bold"> All Hospital</h2>
                    {hospital.map((h) => (
                        <div key={h._id}
                            onClick={() => handleSelectHospital(h._id)}
                            className="p-3 border rounded-lg mt-2 bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <p><b>Name:</b> {h.name}</p>
                            <p><b>Address:</b> {h.address}</p>

                        </div>
                    ))}
                </div>


            </div>
        </>
    )
}

export default HospitalForm;