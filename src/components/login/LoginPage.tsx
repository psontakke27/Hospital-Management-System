import {  useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";




export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const loginSchema = yup.object({
        email: yup.string().email("Invalid email").required("Email.is required"),
        password: yup.string().required("password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            // try-catch used when API call (async operation), and many things can go wrong
            try {
                const res = await fetch("http://localhost:5000/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",   // "Hey backend, I am sending data in JSON format"
                    },
                    body: JSON.stringify(values),
                })
                console.log("🚀 ~ handleSubmit ~ res:", res)
                const data = await res.json();
                console.log("data", data)

                if (res.ok) {
                    console.log("user login ")
                    // store token   localStorage.setItem("token", data.access_token);
                    localStorage.setItem("token", data.access_token )
                     navigate("/hospital");;
                    console.log("🚀 ~ LoginPage ~ data.access_taken:", data.access_token)
                    toast.success("Login successful")
                } else {
                    console.log("falled to login")
                    toast.error("failed to login")
                }

            } catch (err) {
                console.log("Error")
                toast.error("Something went wrong", err)
            } finally {
                setLoading(false); 
            }
        }
    });




    return (
        <>
        <ToastContainer />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <br />
                <div>
                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 cursor-pointer text-grey-500">
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm">{formik.errors.password}</p>
                            )}

                        </div>

                        <button type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200">
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <p className="text-center mt-4">
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="text-blue-500 cursor-pointer"
                        >
                            Signup
                        </span>
                        </p>
                                        </div>

            </div>
        </div></>

    );
}

