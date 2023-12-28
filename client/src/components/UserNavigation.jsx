import React, { useContext } from 'react'
import AnimationWrapper from './PageAnimation'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import { removeFromSession } from '../common/Session'

const UserNavigation = () => {

 const{userAuth:{username},setUserAuth} = useContext(UserContext)

 const signoutUser = () =>{
   removeFromSession("user")
   setUserAuth({access_token:null})

 }



  return (
    <AnimationWrapper 
    className="absolute right-0 z-50"
    transition={{duration:0.2,y:{duration:0.1}}}>

      <div className='bg-white absolute right-0 border border-grey w-60 duration-200'>
         <Link to="/editor" className='flex gap-2 link md:hidden pl-8 py-4'>
          <i className='fi fi-rr-file-edit'></i>
          <p>write</p>
         </Link>


         <Link to={`/user/${username}`} className='link pl-8 py-4'>profile</Link>
         <Link to="/dashboard/blogs" className='link pl-8 py-4'>Dashboard</Link>      
         <Link to="/settings/edit-profile" className='link pl-8 py-4'>profile</Link>
         <span className='absolute border-t border-grey w-[100%]'>
         </span>


         <button
         onClick={signoutUser} 
         className='text-left p-4 hover:bg-grey w-full pl-8 py-4'>
          <h1 className='font-bold text-xl mg-1'>sign out</h1>
          <p className='text-dark '>@{username}</p>
         </button>

      </div>

    </AnimationWrapper>
  )
}

export default UserNavigation