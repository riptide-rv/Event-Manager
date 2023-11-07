import React, { useState } from 'react';

import '@/global.css'




import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


import { Link, Outlet } from 'react-router-dom';


import ListAltIcon from '@mui/icons-material/ListAlt';

import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearIcon from '@mui/icons-material/Clear';




const firebaseConfig = {
  // apiKey: "AIzaSyAkH9WiG08Lm84MDJITL0x5rc2X8WO3A7g",
  // authDomain: "event-manager-f1350.firebaseapp.com",
  // projectId: "event-manager-f1350",
  // storageBucket: "event-manager-f1350.appspot.com",
  // messagingSenderId: "426731898798",
  // appId: "1:426731898798:web:078c28ab64ee5cb2aaaa3f",
  // measurementId: "G-S8VCJC5VHQ"
  apiKey: "AIzaSyBpwB2BeRuKfCx2_YWMXSkuxfuO3BE6TM4",
  authDomain: "event-manage-61bbf.firebaseapp.com",
  projectId: "event-manage-61bbf",
  storageBucket: "event-manage-61bbf.appspot.com",
  messagingSenderId: "448780147580",
  appId: "1:448780147580:web:a52fc0d7ccce1856eca2f9",
  measurementId: "G-KH8WC96N7W"
};


export const app = initializeApp(firebaseConfig)
getAuth(app);
getFirestore(app);


const App: React.FC = () => {
  
  
  

  const [open, setOpen] = useState(false);
    const Menus = [
      
      { title: "Events", src: "Chat", link:"/one", icon: <ListAltIcon/>},
       
      { title: "Profile", src: "Search", link:"/two", icon:<PersonIcon  /> },
      

    ];
    return (

        <div className='nonscroll'>
        <div className="flex h-screen overflow-hidden">
        <div
          className={` ${
            open ? "w-72" : "w-16 sm:w-20"
          } bg-card  p-3 sm:p-5  pt-8 relative duration-300 flex-shrink-0`}
        >
          
          
            {!open && <ArrowForwardIcon
                     className={`absolute cursor-pointer right-4 sm:r-6 duration-100 ease-in-out top-9 w-7  rounded-full `}
            onClick={() => setOpen(!open)}
            color="primary"
            />}
             {open && <ClearIcon
            className={`absolute  cursor-pointer right-6 duration-100 top-9 w-7  rounded-full `}
            onClick={() => setOpen(!open)}
            color='primary'
            />}
          
          <div className="flex gap-x-4 items-center pt-7 border-1 ">
            {/* <img
              src="./src/assets/logo.png"
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            /> */}

          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <Link to = {`${Menu.link}`}>
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-secondary text-gray-300 text-sm items-center gap-x-4 
                mt-2 `}
              >
                {Menu.icon}
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex flex-grow justify-center h-screen">
          <Outlet/>
        </div>  
      </div>
      </div>
    );
};

export default App;


