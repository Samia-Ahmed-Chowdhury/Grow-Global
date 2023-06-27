import React, { useContext } from 'react'
import { useState } from 'react'
import useGetAllPosts from '../../hooks/useGetAllPosts'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { MdEditNote } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import UpdateModal from './UpdateModal'
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import SearchBox from './SearchBox';

function PostRow() {
  const { userName, userEmail } = useContext(AuthContext)
  const [allPostsData, refetchaAllPostsInfo] = useGetAllPosts()
  const [axiosSecure] = useAxiosSecure()
  const [isOpen, setIsOpen] = useState(false)
  const [postInfo, setPostInfo] = useState({})

  function closeModal() {
    setIsOpen(false)
  }

  function openModal(postInfo) {
    setIsOpen(true)
    setPostInfo(postInfo)
  }

  const deleteHandler = (post) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete_post/${post._id}`)
          .then(res => {
            console.log(res)
            if (res.data) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              refetchaAllPostsInfo()
            }
          })
      }
    })
  }

  return (
    <div className='lg:w-1/2 lg:mx-auto mx-5'>
      <SearchBox />

      {
        allPostsData && Array.isArray(allPostsData) && allPostsData.length > 0 ? (
          <div>
            {
              allPostsData.map(post => (
                <div key={post._id} className='card shadow-lg mb-5'>
                  {
                    post?.userEmail === userEmail
                    &&
                    <div className='flex justify-end gap-2 mx-8 mt-3'>
                      <MdEditNote onClick={() => openModal(post)} className='w-5 h-5 cursor-pointer' />
                      <AiFillDelete onClick={() => deleteHandler(post)} className='w-5 h-5 cursor-pointer' />
                    </div>
                  }

                  <div className="card-body py-5">
                    <div className='flex gap-2 items-center'>
                      <label className="btn btn-ghost btn-circle avatar">
                        <div className="w-16  rounded-full">
                          <img src={post?.userImage} alt="pic" />
                        </div>
                      </label>
                      <p className='font-bold text-2xl'>{post.userName}</p>
                    </div>
                    <h1 className='text-gray-700 text-xl'>{post.msg}</h1>
                    {
                      post.postImage &&
                      <img className='w-96 h-56 mt-4' src={post?.postImage} alt="image" />
                    }
                  </div>
                </div>
              ))
            }
            {isOpen && <UpdateModal isOpen={isOpen} postInfo={postInfo} closeModal={closeModal} />}
          </div>
        )
          :
          <h1 className='text-center mt-16 font-bold'>Not class Data available</h1>
      }
    </div>
  )
}

export default PostRow