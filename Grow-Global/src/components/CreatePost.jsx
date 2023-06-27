import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import { imageUpload } from '../api/imageUp';
import { AuthContext } from '../provider/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useGetAllPosts from '../hooks/useGetAllPosts';

function CreatePost() {
    const [axiosSecure] = useAxiosSecure()

    const { userName, userEmail,photoUrl } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit,reset  } = useForm();
    const [, refetchaAllPostsInfo] = useGetAllPosts()

    const onSubmit = data => {
        console.log(data)
        const { msg } = data;
        //image upload
        const image = data.img[0]
            imageUpload(image).then(imgLink => {
                const savePost = { userName, userEmail,userImage:photoUrl, postImage:imgLink, msg,     date: new Date() }
                console.log(savePost)
                axiosSecure.post('/add_post', savePost)
                    .then(data => {
                        console.log(data)
                        if (data.data?.insertedId) {
                            Swal.fire(
                                'Good job!',
                                'Added Successfully (^_^)',
                                'success'
                            )
                            reset();
                            refetchaAllPostsInfo()
                        }
                    })
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card lg:w-1/2 mx-5 border border-gray-100 bg-base-100 lg:mx-auto mt-8 mb-8">
            <div className="card-body">
                <div className="form-control">
                    <input type="text" {...register("msg", { required: true })} name='msg' placeholder="Write something.." className="input input-bordered h-24" />
                    {errors.msg?.type === 'required' && <p role="alert" className='text-red-700'> Post content is required</p>}
                </div>
                <div className="form-control h-10">
                    <input type="file"  {...register("img")} name='img' placeholder="Enter Photo url" className="file-input file-input-bordered file-input-error w-full max-w-xs" />
                </div>
                <div className="form-control mx-auto  mt-4">
                    <button className="btn bg-primaryColor text-white border-0">Post</button>
                </div>
            </div>
        </form>
    )
}

export default CreatePost