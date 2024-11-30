import { createContext, useState , useEffect} from "react";
import React from 'react'
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

function AppContextProvider({children}){
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const[credit, setCredit] = useState(false);

    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const loadCreditsData = async()=>{
        try{
            const {data} = await axios.get(backendUrl+'/api/v1/user/credits',{
                headers:{token}
            })
            if(data){
                setCredit(data.credits)
                setUser(data.name)
            }
        }catch(e){
            console.log(e);
            toast.error(e.message);
        }
    }

    const generateImage = async(prompt)=>{

        try{

            const{data} = await axios.post(backendUrl+'/api/v1/image/generateImage',{prompt},{
                headers:{token}
            })
            console.log(data);
            if(data.success){
                loadCreditsData();
                return data.resultImage;
            }else{
                toast.error(data.message);
                loadCreditsData();
                if(data.creditBalance===0){
                    navigate('/buy');
                }
            }
        }catch(e){
            console.log(e);
            toast.error(e.message);    
        }
    }

    const logOut = async()=>{
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    }
    useEffect(()=>{
        if(token){
            loadCreditsData();
        }
    },[token])


    return(
        <AppContext.Provider value={{user,setUser,showLogin,setShowLogin,backendUrl,token,setToken,credit,loadCreditsData,logOut,generateImage}}>
            {children}
        </AppContext.Provider>
    )
} 


export default AppContextProvider;