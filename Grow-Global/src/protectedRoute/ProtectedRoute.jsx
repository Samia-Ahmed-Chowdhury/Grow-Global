import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { TailSpin } from 'react-loader-spinner';

function ProtectedRoute({ children }) {
  const { userName, loading } = useContext(AuthContext)
  const location = useLocation();
  // console.log(location)

  if (loading) {
    return <div className='text-center flex justify-center my-16'>
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  }
  if (userName) {
    return children
  }
  return <Navigate to="/" state={{ from: location }} replace ></Navigate>;
}

export default ProtectedRoute
