import { useState } from "react";
import API from "../services/api";

function EmployeeForm({ fetchEmployees }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        department: "",
        salary: ""
    });
    const [errors, setErrors] = useState({});

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
            await API.post("/", form);

            alert("Employee Added Successfully 🚀");

            setForm({
                name: "",
                email: "",
                department: "",
                salary: ""
            });
            setErrors({});

            fetchEmployees();
        } catch (error) {
            if (error.response?.data?.message) {
                setErrors({ email: error.response.data.message });
            } else {
                console.log(error);
            }
        }
    };

    return (
        <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-300/30 backdrop-blur-sm">
            <div className="mb-6 space-y-3">
                <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-sky-700">
                    New Employee
                </span>
                <h2 className="text-2xl font-semibold text-slate-900">Add Employee</h2>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                    Use the form below to create a new employee record. All fields are optional, but a full profile helps keep your team organized.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Name</span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Jane Doe"
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
                        placeholder="jane@company.com"
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
                        placeholder="Engineering"
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
                        placeholder="45000"
                        value={form.salary}
                        onChange={handleChange}
                        className={`w-full rounded-3xl border px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:bg-white focus:outline-none ${errors.salary ? "border-rose-500 ring-1 ring-rose-100" : "border-slate-200 bg-slate-50"}`}
                    />
                    {errors.salary && <p className="text-sm text-rose-600">{errors.salary}</p>}
                </label>

                <button
                    type="submit"
                    className="col-span-full inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                    Add Employee
                </button>
            </form>
        </section>
    );
}

export default EmployeeForm;
