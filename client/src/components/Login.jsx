import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

    const [state, setState] = useState('Sign up');
    const {showLogin,setShowLogin,backendUrl,setToken,setUser} = useContext(AppContext);

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        try{

            let response;
            if(state ==='Login'){
                response = await axios.post(backendUrl + '/api/v1/user/login',{email,password})
            }else{
                response = await axios.post(backendUrl+'/api/v1/user/register',{name,email,password})
            }

            if(response){
                setToken(response.data.token);
                setUser(response.data.name);
                localStorage.setItem('token',response.data.token)
                setShowLogin(false);
                toast.success(`${state} successful!`);
            }else{
                toast.error(data.message)
            }
        }catch(e){
            toast.error('An error occurred. Please try again.');
        }
    }

    useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return()=>{
            document.body.style.overflow = 'unset';
        }
    },[])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>

        <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500' >
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>

            {state !== 'Login' && <div className='border px-5 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.profile_icon} alt="" className='h-6'/>
                <input onChange={(e)=>setName(e.target.value)} value={name} className='outline-none text-sm' type="text" placeholder='Full Name' required/>

            </div>}

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-3'>
                <img src={assets.email_icon} alt=""/>
                <input onChange={(e)=>setEmail(e.target.value)} value = {email} className='outline-none text-sm' type="text" placeholder='Email id' required/>

            </div>

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-3'>
                <img src={assets.lock_icon} alt=""/>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='outline-none text-sm' type="password" placeholder='Password' required/>
            </div>

            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot Password</p>

            <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'Login' : 'Create account'}</button>
            

            {
                state==='Login' ?  <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>{setState('Signup')}}>Sign up</span></p>
                :

                <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>{setState('Login')}}>Login</span></p>
            }


            <img src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' onClick={()=>{setShowLogin(false)}}/>
        </form>
    </div>
  )
}

export default Login