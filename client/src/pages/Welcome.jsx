import { useNavigate, Link } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import { useEffect } from "react";

export default function Welcome() {
    const navigate = useNavigate()
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState('')

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }

    const serif = "font-['Young_Serif',Georgia,serif]";
    const link = "text-[#2B2118] underline-offset-4 hover:text-[#B4532A] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2F5D50]"

    return (
        <div className="min-h-screen flex flex-col bg-[#faf6ef] font-['Instrument_Sans', system-ui,sans-serif] text-[#2B2118]">
            <header className="border-b border-[#2B2118]/20">
                <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4">
                    <Link to="/" className={`text-2xl ${serif}`}>Buku Kita</Link>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base">
                        {user ? (
                            <>
                                <Link className={link} to="/profile">Profile</Link>
                                {user.role === "admin" && (
                                    <Link className={link} to="/admin">Dashboard Admin</Link>
                                )}
                                <span className="text-[#2b2118]/70">Halo, {user.name}</span>
                                <button onClick={handleLogout} className="rounded-sm border border-[#2b2118] px-3 py-1 hover:bg-[#2b2118] hover:text-[#faf6ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5d50]">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={link}>Login</Link>
                                <Link to="/register" className="rounded-sm bg-[#B4532A] px-4 py-1.5 text-[#FAF6EF] hover:bg-[#9A4422] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D50]">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>
            <main></main>
        </div>
    );
}