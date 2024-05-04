import React from 'react'
import logo from '../assets/img/logo.png'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='flex justify-between items-center shadow-lg '>
      <div className='w-10'>
        <img src={logo} alt="" />
      </div>

      <div className='flex items-center gap-5 md:2'>
        <CiSearch className='text-xl'/>
        <Link to='/signup' className='bg-black text-white p-2 rounded-md '>
          Sign up
        </Link>
        <Link to='/signin' className='bg-black text-white p-2 rounded-md hidden sm:flex'>
          Sign in
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
