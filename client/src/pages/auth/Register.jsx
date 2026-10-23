import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await axios.post('/api/auth.register', form)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'terjadi kesalahan')
        } finally {
            setLoading(false)
        }
    } 

    return (
        <div>
            <Link to="/">
                Buku <span>Kita</span>
            </Link>
            <div>
                <h1>Daftar Akun</h1>
                <div>
                    {error && (
                        <p>{error}</p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Nama Lengkap" value={form.name} onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Memproses' : 'Daftar'}
                        </button>
                    </form>
                    <p>
                        Sudah punya akun?{' '}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}