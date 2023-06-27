import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../provider/AuthProvider'

function useGetAllPosts() {
    const { loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const { refetch: refetchaAllPostsInfo,data:allPostsData=[] } = useQuery({
        queryKey: ['posts'],
        enabled: !loading,
        queryFn: async () => {
          const res = await axiosSecure(`posts`)
          return res.data
        }
      })
    
      return [allPostsData, refetchaAllPostsInfo]
}

export default useGetAllPosts
