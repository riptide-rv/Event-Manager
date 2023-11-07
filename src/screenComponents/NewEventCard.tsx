import { EventEntity } from "@/types/EventType";
import { SubEventEntity } from "@/types/SubEventEntity";
import { useState } from "react";
import { Button } from "../ui/button";
import { Box, Grid, Input } from "@mui/material";
import { Label } from "../ui/label";
import { addDoc, collection, getFirestore } from "firebase/firestore";

interface NewEventCard {
    onCancelClick: ()=>void
    setSubEvents: React.Dispatch<React.SetStateAction<SubEventEntity[]>>
    event: EventEntity
    subEvents: SubEventEntity[]
  }
  
  const db =  getFirestore();

const subEventsRef = collection(db, "subEvents");
  
  export function NewEventCard(props:NewEventCard){

    const [listE,setListE] = useState<SubEventEntity[]>(props.subEvents);

  
    const [name,setName] = useState("");
    const handleChangeName = (event:React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
  
      console.log('value is:', event.target.value);
    };
  
    const [description,setDescription] = useState("");
    const handleChangeDesc = (event:React.ChangeEvent<HTMLInputElement>) =>{
      setDescription(event.target.value);
    }
    const [start,setStart] = useState("");
    const handleChangeStart = (event:React.ChangeEvent<HTMLInputElement>) => {
      setStart(event.target.value);
  
      console.log('value is:', event.target.value);
    };
  
    const [end,setEnd] = useState("");
    const handleChangeEnd= (event:React.ChangeEvent<HTMLInputElement>) =>{
      setEnd(event.target.value);
    }
  
    function handleSubmit (){
      const newSub: SubEventEntity = {
        subEventId: "",
        subEventName: name,
        subEventDescription: description,
        subEventStartTime: start,
        subEventEndTime: end,
        subEventDate: new Date(),
       
        eventId: props.event.id
      } 
      
      
      addDoc(subEventsRef, {
       
        subEventName: name,
        subEventDescription: description,
        subEventStartTime: start,
        subEventEndTime: end,
        subEventDate: new Date(),
       
        eventId: props.event.id
      } ).then((docRef) => {
        newSub.subEventId = docRef.id
        setListE([...listE,newSub])
        console.log("not hit")
        console.log(newSub)
      })
      
      props.onCancelClick()
    //  console.log(newSub)
      console.log(props.subEvents)
      
  
    }
  
    return(
      <>
      <Button className="absolute top-0 right-0" onClick={props.onCancelClick} >Cancel</Button>
    <div className="flex grow p-5 xs:p-3 h-full pt-3 relative mt-5  text-[12pr-3 border-b-2">
      
      
  <Box  sx={{ flexGrow: 1 }}>
    
  <Grid container  spacing={2} >
    <Grid xs={12} sm={4}>
        
    <div className="flex grow  mb-2 items-center h-full">
    <Label  htmlFor="new_sub_event_name">Name</Label>
              </div></Grid><Grid xs={12} sm={8}>
                <Input onChange={handleChangeName} className="w-full" id="new_sub_event_name" /></Grid>
    <Grid xs={12} sm={4}>
    <div className="flex grow  mb-2 items-center h-full">
      <Label  htmlFor="new_sub_event_description">Description</Label></div></Grid>
      <Grid xs={12} sm={8}><Input onChange={handleChangeDesc} className="w-full mb-4 mt-4" id="new_sub_event_description" /></Grid>
  </Grid>
  
  
  <Grid container  spacing={2} >
    <Grid xs={12} sm={2}>
    <div className="flex grow  mb-2 items-center h-full">
    <Label  htmlFor="new_sub_event_startDate">Start Date</Label>
              </div></Grid>
    <Grid xs={12} sm={4}><Input onChange={handleChangeStart} type="time" className="w-full bg-secondary" id="new_sub_event_startDate" /></Grid>
    <Grid xs={12} sm={2}>
    <div className="flex grow  mb-2 items-center h-full">
      <Label  htmlFor="new_sub_event_endDate">End Date</Label></div></Grid>
      <Grid xs={12} sm={4}><input onChange={handleChangeEnd} className="w-full bg-secondary" type="time" id="new_sub_event_endDate" /></Grid>
  </Grid>
  <div className="flex grow pt-4 justify-end"><Button onClick={handleSubmit} >Submit</Button></div>
  
  
  </Box>
  </div>
  </>)
  }