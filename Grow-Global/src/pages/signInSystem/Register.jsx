import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../provider/AuthProvider';
import SocialSystem from './SocialSystem';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import Lottie from "lottie-react";
import img from '../../assets/login.json'

function Register() {
    const navigate = useNavigate()


    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [error, setError] = useState('')

    const { setUserName, setUserEmail, setPhotoUrl, googleHandler, githubHandler, registerWithEmail, updateUserProfile } = useContext(AuthContext)

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        setPasswordError('')
        setError('')
        console.log(data)
        const email = data.email
        const image = data.image
        const password = data.password
        const name = data.name
        const confirmPassword = data.confirmPassword

        if (confirmPassword === password) {
            registerWithEmail(email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    updateUserProfile(name, image)
                        .then(() => {
                            setUserName(user.displayName);
                            setUserEmail(user.email)
                            setPhotoUrl(user.photoURL)
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/home');
                        })
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(error.message)
                    setError(errorMessage)
                });
        }
        else {
            setPasswordError("Password and confirm Password doesn't match")
        }
    };

    return (
        <div className='grid md:grid-cols-[1fr,.9fr]  gap-10 my-16 lg:mx-16 mx-5'>

            <div className='text-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='md:w-3/4 mx-auto px-10 pb-4 shadow-xl  rounded-lg text-center'>
                    <h2 className='text-3xl font-semibold'>Please SingUp </h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" {...register("name", { required: true })} placeholder="Enter Your Name" className="bg-[#E8F0FE] input w-full  " />
                        {errors.name?.type === 'required' && <p role="alert" className='text-red-700'> name is required</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="url" name="image"  {...register("image", { required: true })} placeholder="Enter Your Photo URL" className="bg-[#E8F0FE] input w-full  " />
                        {errors.image?.type === 'required' && <p role="alert" className='text-red-700'> image is required</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" {...register("email", { required: true })} placeholder="Enter Your Email" className="bg-[#E8F0FE] input w-full  " />
                        {errors.email?.type === 'required' && <p role="alert" className='text-red-700'>email is required</p>}
                    </div>

                    {/* password */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>

                        <input type={showPass ? 'text' : 'password'} name="password"
                            {...register("password",
                                {
                                    required: true,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                    minLength: 6
                                })}
                            placeholder="Enter Your password" className="bg-[#E8F0FE]  input w-full " />
                        {
                            showPass ?
                                <FaEye onClick={() => setShowPass(!showPass)} className="absolute  top-[10%] right-1/4" />
                                : <FaEyeSlash onClick={() => setShowPass(!showPass)} className="absolute top-[10%] right-1/4" />
                        }
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}

                    </div>

                    {/* confirm password */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Comfirm Password</span>
                        </label>

                        <input type={showConfirmPass ? 'text' : 'password'} name="confirmPassword"
                            {...register("confirmPassword",
                                {
                                    required: true,
                                })}
                            placeholder="Enter confirmPassword " className="bg-[#E8F0FE]  input w-full " />
                        {
                            showConfirmPass ?
                                <FaEye onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute  top-[10%] right-1/4" />
                                : <FaEyeSlash onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute top-[10%] right-1/4" />
                        }
                        {errors.confirmPassword?.type === 'required' && <p className="text-red-600">confirmPassword is required</p>}

                    </div>

                    {
                        error && <p className="text-red-600">{error}</p>
                    }
                    {
                        passwordError && <p className="text-red-600">{passwordError}</p>
                    }


                    <div className="form-control  my-5">
                        <button className="btn bg-primaryColor text-white" type="submit">Submit</button>
                    </div>
                    <p className='text-lg font-medium my-8'>Already Have An Account ? <Link className='font-medium text-primaryColor' to='/'>Login</Link></p>
                </form>
            </div>
            <div>
                <p className='text-lg font-bold text-center text-primaryColor'>Login With Social : </p>
                <SocialSystem />
                <Lottie className='' animationData={img} loop={true} />;
            </div>
        </div>
    )
}

export default Register