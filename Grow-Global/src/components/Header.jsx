import React, { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import { Link } from 'react-router-dom'

function Header() {
    const { userName, photoUrl, logOut } = useContext(AuthContext)
    return (
        <div  className="flex justify-end gap-2 m-5">
            {
                userName &&
                <label className="btn btn-ghost btn-circle avatar">
                    <div className="w-16  rounded-full">
                        <img title={userName} src={photoUrl} />
                    </div>
                </label>
            }

            {
                userName ?
                    <Link onClick={logOut} className=" btn bg-primaryColor hover:bg-none hover:border-2 hover:font-bold  text-white hover:border-primaryColor border-0 py-0 px-2 md:px-3 ">Logout</Link>
                    :
                   <Link to='/' className="btn bg-primaryColor border-0 py-0 px-2 md:px-3  hover:bg-none hover:border-2 hover:font-bold x text-white hover:border-primaryColor">Login</Link>


            }
        </div>
  )
}

export default Header