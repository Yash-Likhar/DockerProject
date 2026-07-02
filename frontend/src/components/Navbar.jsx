import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    return (
        <header className="bg-slate-900 text-slate-100 shadow-lg shadow-slate-900/10">
            <div className="mx-auto flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div>
                    <span className="mb-2 inline-flex rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-sky-200">
                        Employee Manager
                    </span>
                    <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:mt-0">
                        CRUD App
                    </h1>
                </div>

                <nav className="flex flex-wrap items-center gap-3 text-sm font-medium">
                    <Link
                        to="/"
                        className={`rounded-full px-4 py-2 transition ${location.pathname === "/" ? "bg-slate-100 text-slate-900" : "text-slate-200 hover:bg-slate-800 hover:text-white"}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/employees"
                        className={`rounded-full px-4 py-2 transition ${location.pathname === "/employees" ? "bg-slate-100 text-slate-900" : "text-slate-200 hover:bg-slate-800 hover:text-white"}`}
                    >
                        Employees
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;