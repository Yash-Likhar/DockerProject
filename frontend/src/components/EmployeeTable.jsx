import { Link } from "react-router-dom";
import API from "../services/api";

function EmployeeTable({ employees, fetchEmployees }) {
    const handleDelete = async (id) => {
        await API.delete(`/${id}`);
        fetchEmployees();
    };


    return (
        <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-300/30 backdrop-blur-sm">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Employee Directory</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">Employee Data</h2>
                </div>
                <button
                    type="button"
                    onClick={fetchEmployees}
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                    Refresh Data
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold">Name</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold">Email</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold">Department</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold">Salary</th>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                        {employees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-slate-50">
                                <td className="whitespace-nowrap px-4 py-4">{emp.name}</td>
                                <td className="whitespace-nowrap px-4 py-4">{emp.email}</td>
                                <td className="whitespace-nowrap px-4 py-4">{emp.department}</td>
                                <td className="whitespace-nowrap px-4 py-4">{emp.salary}</td>
                                <td className="whitespace-nowrap px-4 py-4">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            to={`/employees/edit/${emp.id}`}
                                            className="rounded-full bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(emp.id)}
                                            className="rounded-full bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default EmployeeTable;