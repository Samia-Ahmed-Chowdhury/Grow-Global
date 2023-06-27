import React, { useContext, useState } from 'react'
import { AuthContext } from '../../provider/AuthProvider';
import useGetSearch from '../../hooks/useGetSearch';

function SearchBox() {
    const { loadedData, setLoadedData } = useContext(AuthContext)
    const[seachValue,setSeachValue]=useState('')
    const [searchPost, refetchSearchData] = useGetSearch(seachValue)

    const searchHandler = (e) => {
        e.preventDefault()
        const value = e.target.value;
        setSeachValue(value)
        refetchSearchData()
    }  
  
    return (
        <div className='flex justify-end mx-5 mb-5'>
            <div className="form-control w-40">
                <input type="text"
                    onChange={searchHandler}
                    placeholder="Search"
                    className="input input-bordered w-24 md:w-auto" />
            </div>

        </div>
    )
}

export default SearchBox