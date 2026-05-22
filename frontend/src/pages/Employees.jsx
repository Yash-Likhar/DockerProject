import { useEffect, useState } from "react";
import API from "../services/api";
import EmployeeTable from "../components/EmployeeTable";

function Employees() {

    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        const res = await API.get("/");
        setEmployees(res.data);
    };

    useEffect(() => {
        const loadEmployees = async () => {
            await fetchEmployees();
        };

        loadEmployees();
    }, []);

    return (
        <div className="p-5">
            <EmployeeTable
                employees={employees}
                fetchEmployees={fetchEmployees}
            />
        </div>
    );
}

export default Employees;