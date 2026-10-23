import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
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
            const res = await axios.post('/api/auth/login', form)
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
                <h1>Login</h1>
                <div>
                    {error && (
                        <p>{error}</p>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} requires />
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} requires />
                        <button type="submit" disabled={loading}>
                            {loading ? 'memproses...' : 'login'}
                        </button>
                    </form>
                    <p>
                        Belum punya akun?{' '}
                        <Link to="/register" >Daftar</Link>    
                    </p>
                </div>
            </div>
        </div>
    );
}