
import {
  Dialog,
  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog"



import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { newEventFormSchema } from "@/validators/formvalidators";

import { Button } from "@/ui/button"
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form"
import { Input } from "@/ui/input"


import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"

import { Calendar } from "@/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/popover"
import { ScrollArea, ScrollBar } from "@/ui/scroll-area"


import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  query,
  where,
  doc,
  orderBy,
  
} from "firebase/firestore";
import { EventEntity } from "@/types/EventType";

import { EventCard } from "../screenComponents/EventCard";

import { SubEventEntity } from "@/types/SubEventEntity";

import { NewEventCard } from "../screenComponents/NewEventCard";
import { SubEventCreateDialog } from "./SubEventCreateDialog";
import { SubListScreen } from "./ViewEventScreen";
 

 


const db =  getFirestore();
const eventsRef = collection(db, "events");
const subEventsRef = collection(db, "subEvents");

interface EventCreateDialogProps {
  events: EventEntity[];
  setEvents: React.Dispatch<React.SetStateAction<EventEntity[]>>;
  onEdit: (index:number) =>void;
  // other props...
}

export function EventCreateDialog(props: EventCreateDialogProps) {
  const events = props.events;
  useEffect(() => {
    fetchEvents().then((eventsArray) => {
      console.log("bb");
      props.setEvents(eventsArray);
    });
  }, []);
  console.log(events +"asdasd");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleIconHover = () => {

    setIsInputVisible(!isInputVisible);
    // const input = document.getElementById('hover-add-icon') as HTMLInputElement;
    //  input.classList.toggle('hidden');
  };
  const form= useForm<z.infer<typeof newEventFormSchema>>({
    resolver: zodResolver(newEventFormSchema),
    defaultValues: {
      eventName: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date().toLocaleTimeString(),
      endTime: new Date().toLocaleTimeString(), 
     
      },
  })
  function onSubmit(values: z.infer<typeof newEventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    
   addDoc(eventsRef,{
    ...values,
    userId: localStorage.getItem('userId')||""  
  }).then((docRef)=>{
    const newEvent: EventEntity = {
      id: docRef.id,
      eventName: values.eventName,
      description: values.description,
      startDate: values.startDate,
      endDate: values.endDate,
      startTime: values.startTime,
      endTime: values.endTime,
      userId: localStorage.getItem('userId')||""
    }
    
    props.setEvents(preEvents => [...preEvents, newEvent]);
    form.reset();
  })
    console.log(events)
  }
 
  return (
    <>
    <div className="flex pb-20 flex-col grow">
    <div className="flex grow-[1] p-6">
    <h1>Event Details</h1>    
   
    </div >
    
    
    <div className="flex h-full p-1 sm:p-3 pb-10 sm:m-5 mb-15 ">
    <ScrollArea className="w-full flex flex-col gap-y-4  sm:outline-2 sm:outline outline-secondary rounded ">
      <div className="p-1">
    {events.map((event, index) => (
      
      <EventCard  event={event} index={index} onEditClick={()=>
        props.onEdit(index)
      
      }
        />
    ))}
    </div>
    <ScrollBar orientation="vertical" />
</ScrollArea>
    </div>
    </div>
    
    <Dialog >  
          <DialogTrigger asChild>
      
        
        <Button type="button" id="hover-add-icon" variant="outline" className=" absolute bottom-5 right-5 p-0  group rounded-3xl"
        onMouseEnter={handleIconHover}
        onMouseLeave={handleIconHover}
        >
        <AddCircleIcon sx={{ fontSize: 40 }}  className=""/>
         <div 
          className=
          {` transition-all duration-500 ease-in-out   ${
            isInputVisible ? 'opacity-100 translate-x-0 pr-4 pl-2 pb-0.5' : 'opacity-0 translate-x-2 w-0 '
          } `}>
            <div className={`${isInputVisible?'':'hidden'}`}>
           New Event
           </div></div>
          </Button>
       
      </DialogTrigger>
    
      <DialogContent className="sm:max-w-[425px] max-w-[390px] sm:m-5 ">
        <DialogHeader>
          <DialogTitle className="text-3xl">Create New Event</DialogTitle>
          <DialogDescription>
           Enter details of new Event. Click submit when you're done to save the event.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-4">
        <Form  {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-3">
        <FormField
          control={form.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px]">Event Name</FormLabel>
              <FormControl>
                <Input placeholder="event name" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="pb-5">
              <FormLabel className="text-[16px]">Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
             <div className="flex-grow flex-col sm:flex-row justify-end flex">
              <FormLabel  className="text-[16px] items-center flex grow-[1]">Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button 
                      variant={"outline"}
                      className={cn(
                        "grow-[2] pl-3 text-left font-normal max-width-3/4",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              </div>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <div className="flex-grow flex-col sm:flex-row justify-end flex">
              <FormLabel className="text-[16px] items-center pr-1.5 flex grow-[1]"><span>End Date</span></FormLabel>
              <Popover>
                <PopoverTrigger asChild >
                  <FormControl>
                    <Button 
                      variant={"outline"}
                      className={cn(
                        "grow-[2] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span >Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              </div>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex-grow flex justify-end">
        <Button type="submit" className="r-3">Submit</Button>
        </div>
      </form>
    </Form>
        </div>
       
      </DialogContent>
    </Dialog>
   
    </>
  );
}





export function EventScreen() {
  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setOpen(true);
  }
  const [events, setEvents] = useState<EventEntity[]>([]);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  return(
   !open?
   <EventCreateDialog events={events} setEvents={setEvents} onEdit={handleEditClick}/>:
   (
    <EventEditScreen event={events[editIndex]} index={editIndex} onClick={()=>{setOpen(false)}} />
   )

   
  )

}
interface EventEditScreenProps {
  index:number;
  event: EventEntity;
  onClick: () => void;

}

export function EventEditScreen(props:EventEditScreenProps) {

  const [subEvents, setSubEvents] = useState<SubEventEntity[]>([]);
  useEffect(() => {
    console.log("useEffect called");
    fetchSubEvents(props.event.id).then((subEventsArray) => {
      setSubEvents(subEventsArray);
    });
  },[])
  
  
  
  
  

  const [newSubShow, setNewSubShow] = useState(true);
  const [startDate, setStartDate] = useState<Date>(props.event.startDate);
  const [endDate, setEndDate] = useState<Date>(props.event.endDate);
  const [eventName, setEventName] = useState<string>();
  const [description, setDescription] = useState<string>();

  function handleSaveClick(){
    const eventRef = doc(db, "events/"+props.event.id);
    const upEvent = props.event;
    upEvent.eventName = eventName||props.event.eventName;
    upEvent.description = description||props.event.description;
    upEvent.startDate = startDate||props.event.startDate;
    upEvent.endDate = endDate||props.event.endDate;

    setDoc(eventRef, upEvent).then(()=>{
        console.log("Document successfully updated!");
       props.onClick();
    
    })
  }



  

  return (
  <div className="flex grow h-screen flex-col">
    <div className="flex border-b-2 min-w-[full] justify-between">
    <div className="p-4 sm:text-[24px] text-[20px] "><h1>Edit Event</h1></div>
  <div>
  <Button className="rounded bg-green-700 hover:bg-green-400 text-white text-[12px] sm:text-[16px]" onClick={handleSaveClick} >Save</Button>
    <Button className="m-3 rounded text-white bg-gray-700 hover:bg-red-400 text-[12px] sm:text-[16px]" onClick={props.onClick}>Discard</Button>
    
    </div>
    </div>
    <div className="flex justify-between border-b-2 grow-[1] flex-col sm:flex-row p-3 sm:p-5">

      <div className="flex grow flex-col">
      <Input name="edit_event_name" defaultValue={props.event.eventName} onChange={(e)=>setEventName(e.target.value)} className="border-none text-[20px] sm:text-[22px] max-w-3/5" />
      <div className="h-[13px]"></div>
      <Input name="edit_event_description" defaultValue={props.event.description} onChange={(e)=>setDescription(e.target.value)} className="border-none text-[12px] text-primary sm:text-[14px] max-w-3/5" />
      </div>
      <div className="flex-col m-3  mt-0 sm:ml-20 ">
        <div>
        <h1 >Start Date</h1>
        <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            
            selected={startDate}
            onSelect={()=>setStartDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <h1 className="pt-3" >End Date</h1>
        <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={()=>setEndDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      </div>
      </div>
    </div>
    
    <div className="flex grow-[8]">
      <ScrollArea className="flex grow h-full p-0 sm:p-0">
        <div className="flex grow">
        
        {newSubShow?
        <SubListScreen subEvents={subEvents}/>:
               
        <>
         <NewEventCard onCancelClick={()=>{setNewSubShow(true)}} setSubEvents={setSubEvents} event={props.event} subEvents={subEvents}/>
        </>           
        
        }</div>
        <div>
          
         {newSubShow?
         <div className="flex justify-center grow">
          <div className="flex justify-center  flex-col mt-1">
        <SubEventCreateDialog event={props.event}/>
          </div>
         </div>
          
       
        :<></>
         }

        
        </div>
      </ScrollArea>
    </div>



  </div>
  )

}





async function fetchEvents() {

  console.log("fetch events called" )
  const q = query(eventsRef,where("userId","==",localStorage.getItem('userId')));
  const eventSnapshot = await getDocs(q);
  const eventsArray: EventEntity[] = eventSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id, 
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
    } as EventEntity;
  });
  return eventsArray;
}

 export async function fetchSubEvents(eventId:String) {

  console.log("fetch sub events called")
  const q = query(subEventsRef,where("eventId","==",eventId),orderBy("subEventDate"),orderBy("subEventStartTime"));
  const eventSnapshot = await getDocs(q);
  const subEventsArray: SubEventEntity[] = eventSnapshot.docs.map(
      doc => {
      const data = doc.data();
      return{
        ...data,
        subEventId: doc.id,
        subEventDate: data.subEventDate.toDate(),

      } as SubEventEntity;

    }
  );
  return subEventsArray;
  
}