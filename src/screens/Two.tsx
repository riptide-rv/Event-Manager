


import '@/global.css'
import { getAuth } from 'firebase/auth';
import { Button } from '../ui/button';


export function Two(){
    return (
        <>  
           <div className="flex items-center" >
               
                <Button onClick={()=>{
                    localStorage.removeItem('userId');
                    getAuth().signOut();
                }}>Log Out</Button>
            </div>
        </>
    );
}