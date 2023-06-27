import React, { useContext } from 'react'
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';


function SocialSystem() {
    const navigate = useNavigate()
    const location = useLocation();
    // console.log('logonn ', location)
    const from = location.state?.from?.pathname || '/home';
    const { setUserName, setUserEmail, setPhotoUrl, googleHandler } = useContext(AuthContext)

    const googleBtnClicked = () => {
        googleHandler()
            .then((result) => {

                // The signed-in user info.
                setPhotoUrl(result.user?.photoURL)
                setUserEmail(result.user?.email)
                setUserName(result.user.displayName)
                Swal.fire(
                    'Good job!',
                    'Added Successfully (^_^)',
                    'success'
                )
                navigate(from)
            }).
            catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                // console.log(errorMessage)
            });
    }
    const githubBtnClicked = () => {
        githubHandler()
            .then((result) => {
                const userInfo = {
                    image: result.user?.photoURL,
                    name: result?.user?.displayName,
                    email: result.user?.email,
                }
                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log(res)
                        if (res.data.insertedId) {
                            // The signed-in user info.
                            setPhotoUrl(result.user?.photoURL)
                            setUserEmail(result.user?.email)
                            setUserName(result.user.displayName)
                            Swal.fire(
                                'Good job!',
                                'Added Successfully (^_^)',
                                'success'
                            )
                            navigate('/');
                        }
                        else {
                            navigate('/');
                        }
                    })
            }).catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }
    return (
        <>
            <div className='my-8 flex flex-col lg:flex-row gap-3 justify-center mx-5'>
                <button onClick={googleBtnClicked} className='btn btn-outline btn-success hover:bg-success'><FaGoogle className='text-lg me-1' />Login With Google</button>
                <button onClick={githubBtnClicked} className='btn btn-outline hover:btn'><FaGithub className='text-lg me-1' />Login With Github</button>

            </div>
        </>
    )
}

export default SocialSystem