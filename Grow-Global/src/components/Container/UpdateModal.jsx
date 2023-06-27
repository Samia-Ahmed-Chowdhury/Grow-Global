import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import useGetAllPosts from '../../hooks/useGetAllPosts';
import { imageUpload } from '../../api/imageUp';


export default function UpdateModal({ closeModal, isOpen, postInfo }) {
    const [axiosSecure] = useAxiosSecure()
    const [, refetchaAllPostsInfo] = useGetAllPosts()
    const { userName, userEmail,photoUrl } = useContext(AuthContext)
    const { _id, postImage, msg } = postInfo
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        const image = data.img[0]
        const { msg } = data;

        imageUpload(image).then(imgLink => {
            const updateItem = { userName, userEmail,userImage:photoUrl, postImage: imgLink, msg }
            axiosSecure.put(`/update_post/${_id}`, updateItem)
                .then(res => {
                    if (res.data?.modifiedCount > 0) {
                        Swal.fire(
                            `update Successfully`,
                            'success'
                        )
                        reset();
                        closeModal()
                        refetchaAllPostsInfo()
                    }
                })
        })
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                        <div className="card-body">
                                            <div className="form-control">
                                                <input type="text" defaultValue={msg} {...register("msg", { required: true })} name='msg' placeholder="Write something.." className="input input-bordered h-24" />
                                                {errors.msg?.type === 'required' && <p role="alert" className='text-red-700'> Post content is required</p>}
                                            </div>
                                            <div className="form-control h-10">
                                                <input type="file"  {...register("img")} name='img' placeholder="Enter Photo url" className="file-input file-input-bordered file-input-error w-full max-w-xs" />
                                            </div>
                                            <div className="form-control mx-auto  mt-4">
                                                <button className="btn bg-primaryColor text-white border-0">Update</button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </form>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

