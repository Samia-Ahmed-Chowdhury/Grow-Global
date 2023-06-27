import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../provider/AuthProvider'

function useGetSearch(seachValue) {
    const { loading,userEmail } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const { refetch: refetchSearchData,data:searchPost=[] } = useQuery({
        queryKey: ['get_search_post'],
        enabled: !loading,
        queryFn: async () => {
          const res = await axiosSecure(`get_search_post?search=${seachValue}`)
          return res.data
        }
      })
    
      return [searchPost, refetchSearchData]
}

export default useGetSearch