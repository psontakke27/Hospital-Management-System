import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function AdminPage() {
    const [message, setMessage] = useState("");
    useEffect(() =>{
        const fetchAdminData  = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:5000/auth/admin-test", {
                    method: "GET",
                    headers: {
                        Authorization : `Bearer ${token}`,

                    }
                });
                const data = await res.json();

                if(res.ok) {
                    toast.success("Admin page")
                }else{
                    toast.error("Access Denied");
                }

                setMessage(data)
            } catch (error) {
                console.error(error);
                setMessage("Access Denied")
                
            }
        };
        fetchAdminData();

    }, []);

   

return (
    <div>
        <h1>Admin Page</h1>
        <p>{message}</p>
    </div>
)
}