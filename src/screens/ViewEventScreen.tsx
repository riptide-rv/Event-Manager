import { EventEntity } from "@/types/EventType";
import { SubEventEntity } from "@/types/SubEventEntity";
import {  doc,  getDoc, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSubEvents } from "./EventScreen";
import { CalendarIcon } from "lucide-react";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";



const db = getFirestore();
export function ViewEventScreen(){

    const [event,setEvent] = useState<EventEntity>();
    const [subEvents,setSubEvents] = useState<SubEventEntity[]>();
    
    let { eventId } = useParams();
    fetchEvent(eventId||"").then((event)=>{
        setEvent(event);
    });
     
    fetchSubEvents(eventId||"").then((subEvents)=>{
        setSubEvents(subEvents);
    })
    return(
        <>
        <div className="border-b-2 pb-5">
            <div className="flex grow flex-col justify-center p-10 border-b-2 ">
                <div className="flex justify-center grow mb-1.5 text-5xl">{event?.eventName}</div>
                <div className="flex grow justify-center text-gray-400 text-lg">
                    <div className="flex h-full  items-center"><CalendarIcon size={"19px"} className="flex mt-1 mr-2"/></div>{event?.startDate.toDateString().slice(3,)} { (event?.startDate.toDateString()!=event?.endDate.toDateString())?"- "+ event?.endDate.toDateString().slice(3,):""}
                    </div>
            </div>
            
           <SubListScreen subEvents={subEvents||[]}/>
           
        </div>
        </>
    )

}



async function fetchEvent(eventId:String) {
    console.log("fetchEvent single called");
    const q = doc(db, "events/"+eventId);
    const eventSnapshot = await getDoc(q);
    if(eventSnapshot.exists()){
        return {...eventSnapshot.data(),
        startDate: eventSnapshot.data().startDate.toDate(),
        endDate: eventSnapshot.data().endDate.toDate()
    } as EventEntity;
    }
    else{
        console.log("No such document!");
    }
    
    
  }


  export function SubListScreen(props:{subEvents:SubEventEntity[]}){
    return(
        <div className="flex grow mt-5 mr-2"> 
        <Box sx={{flex:1}}>
             <Grid2 container  spacing={2} >
        {
         props.subEvents?.map((subEvent,index)=>(

             <> <Grid2  xs={4.5} md={4}>
             <div id={index.toString()} className="flex justify-center items-center rounded-xl bg-card md:ml-10 ml-3 bg-opacity-50 grow h-full ">
                 <div className="p-3  flex-col">
                    <span className="flex text-lg md:text-2xl">{subEvent.subEventDate.toDateString().slice(3,10)}</span> 
                    <span className="flex text-sm md:text-lg text-primary">{subEvent.subEventStartTime+" - "+subEvent.subEventEndTime}</span>
                 </div>
             </div>
         </Grid2> 
         <Grid2 xs={7.5} md={8}>
             <div className="flex grow md:min-h-[150px]  md:text-3xl  text-xl  p-2 h-full flex-col">
                 <div className="flex">{subEvent.subEventName}</div>
                 <div className="flex md:text-lg text-sm text-primary">{subEvent.subEventDescription}</div>   
             </div>
         </Grid2></>
         ))
        } 
         </Grid2>
        </Box>
        </div>
    )

  }