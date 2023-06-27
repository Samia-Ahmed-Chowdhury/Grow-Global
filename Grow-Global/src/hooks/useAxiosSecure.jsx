import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        //interceptors for request
        axiosSecure.interceptors.request.use(config => {
            const token = localStorage.getItem('access-token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        })

        //interceptors for request
        axiosSecure.interceptors.response.use(response => response,
            async error => {
                if (error.response && error.response.status === 401 || error.response.status === 403) {
                    await logOut()
                    navigate('/')
                }
                return Promise.reject(error)
            })
    }, [logOut, navigate, axiosSecure])

    return [axiosSecure]
}
export default useAxiosSecure