import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";


export default function SignupPage() {
    const [loading,setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const signupSchema = yup.object({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(6, "Minimum 6 character").required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: signupSchema,
        onSubmit: async (values) => {

            // console.log("email, password", email, password);
            // try-catch used when API call (async operation), and many things can go wrong
            try {
                const res = await fetch("http://localhost:5000/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",   // "Hey backend, I am sending data in JSON format"
                    },
                    body: JSON.stringify(
                        values
                    ),
                })
                console.log("🚀 ~ handleSubmit ~ res:", res)
                const data = await res.json();
                console.log("data", data)
                if (res.ok) {
                    console.log("Signup successful")
                    // redirect to login after signup
                    toast.success("Signup successful")
                    navigate("/login");
                } else {
                    console.log("falled to signup")

                    toast.error(data.message || "Signup failed");
                }

            } catch (err) {
                toast.error("Something went wrong", err);
            } finally{
                setLoading(false)
            }

        }

    })


    return (
        <><ToastContainer />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md ">
                <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
            
                <div>
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg" />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-sm">{formik.errors.name}</p>
                            )}
                        </div>


                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg" />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm">{formik.errors.email}</p>
                            )}
                        </div>


                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter Password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg" />
                            <span onClick={() => { setShowPassword(!showPassword); } }
                                className="absolute right-3 top-5 cursor-pointer text-grey-500">
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm">{formik.errors.password}</p>
                            )}
                        </div>


                        <button type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200">
                            {loading ? "Signing up..." : "Signup"}</button>
                    </form>
                </div>

            </div>
        </div></>

    );
}

