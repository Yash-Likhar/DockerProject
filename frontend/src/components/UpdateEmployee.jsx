import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function UpdateEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        department: "",
        salary: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await API.get("/");
                const employee = response.data.find((item) => String(item.id) === String(id));

                if (!employee) {
                    setError("Employee not found.");
                    return;
                }

                setForm({
                    name: employee.name || "",
                    email: employee.email || "",
                    department: employee.department || "",
                    salary: employee.salary || ""
                });
            } catch {
                setError("Could not load employee data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const nextErrors = {};

        if (!form.name.trim()) {
            nextErrors.name = "Name is required.";
        }

        if (!form.email.trim()) {
            nextErrors.email = "Email is required.";
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            nextErrors.email = "Enter a valid email address.";
        }

        if (!form.department.trim()) {
            nextErrors.department = "Department is required.";
        }

        if (String(form.salary).trim() === "") {
            nextErrors.salary = "Salary is required.";
        } else if (Number(form.salary) <= 0 || Number.isNaN(Number(form.salary))) {
            nextErrors.salary = "Salary must be a positive number.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await API.put(`/${id}`, form);
            navigate("/employees");
        } catch {
            setError("Unable to update employee. Please try again.");
        }
    };

    if (isLoading) {
        return (
            <div className="rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-300/30 backdrop-blur-sm">
                <p className="text-slate-700">Loading employee details…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-300/30 backdrop-blur-sm">
                <p className="mb-4 text-slate-700">{error}</p>
                <button
                    type="button"
                    onClick={() => navigate("/employees")}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                    Back to employee list
                </button>
            </div>
        );
    }

    return (
        <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-300/30 backdrop-blur-sm">
            <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Update Employee</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">Edit employee details</h1>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                    Update the employee profile and save the changes. Once submitted, you will return to the employee list.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Name</span>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full rounded-3xl border px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:bg-white focus:outline-none ${errors.name ? "border-rose-500 ring-1 ring-rose-100" : "border-slate-200 bg-slate-50"}`}
                    />
                    {errors.name && <p className="text-sm text-rose-600">{errors.name}</p>}
                </label>

                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Email</span>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full rounded-3xl border px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:bg-white focus:outline-none ${errors.email ? "border-rose-500 ring-1 ring-rose-100" : "border-slate-200 bg-slate-50"}`}
                    />
                    {errors.email && <p className="text-sm text-rose-600">{errors.email}</p>}
                </label>

                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Department</span>
                    <input
                        type="text"
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        className={`w-full rounded-3xl border px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:bg-white focus:outline-none ${errors.department ? "border-rose-500 ring-1 ring-rose-100" : "border-slate-200 bg-slate-50"}`}
                    />
                    {errors.department && <p className="text-sm text-rose-600">{errors.department}</p>}
                </label>

                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Salary</span>
                    <input
                        type="number"
                        name="salary"
                        value={form.salary}
                        onChange={handleChange}
                        className={`w-full rounded-3xl border px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:bg-white focus:outline-none ${errors.salary ? "border-rose-500 ring-1 ring-rose-100" : "border-slate-200 bg-slate-50"}`}
                    />
                    {errors.salary && <p className="text-sm text-rose-600">{errors.salary}</p>}
                </label>

                <div className="col-span-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <button
                        type="button"
                        onClick={() => navigate("/employees")}
                        className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </section>
    );
}

export default UpdateEmployee;
