import AddCircle from "@mui/icons-material/AddCircle"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { newSubEventFormSchema } from "@/validators/formvalidators"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"

import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { format } from "date-fns"
import { getFirestore, addDoc, collection } from "firebase/firestore"
import { EventEntity } from "@/types/EventType"
import { DialogClose } from "@radix-ui/react-dialog"
import '@/global.css'
const db = getFirestore();
const subEventsRef = collection(db, "subEvents");

export function SubEventCreateDialog(props: {event: EventEntity}) {

    const form= useForm<z.infer<typeof newSubEventFormSchema>>({
        resolver: zodResolver(newSubEventFormSchema),
        defaultValues: {
          subEventName: "",
          subEventDescription: "",
          subEventDate: new Date(),
          subEventStartTime: new Date().getTime().toLocaleString(),
          subEventEndTime: new Date().getTime().toLocaleString(), 
         
          },
      })
      function onSubmit(values: z.infer<typeof newSubEventFormSchema>) {
    
        
        addDoc(subEventsRef, {
            ...values,
            eventId: props.event.id,
        });
        form.reset();


        // Do something with the form values.
        // ✅ This will be type-safe and validated.
      }    
   
   return(
   <Dialog>  
    <DialogTrigger asChild>

  
  <Button type="button" id="hover-add-icon" variant="outline" className=" max-w-[30px] max-h-[30px] flex p-0  group rounded-3xl">
  
     <AddCircle sx={ {fontSize:"30px"} }   />
     
    </Button>
 
</DialogTrigger>

<DialogContent className="sm:max-w-[425px] max-w-[390px] sm:m-5 ">
  <DialogHeader>
    <DialogTitle className="text-3xl">Create New SubEvent</DialogTitle>
    <DialogDescription>
     Enter details of SubEvent. Click submit when you're done to save the sub-event.
    </DialogDescription>
  </DialogHeader>
  <div className="grid gap-4 pt-4">
  <Form  {...form} >
<form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-3">
  <FormField
    control={form.control}
    name="subEventName"
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
    name="subEventDescription"
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
    name="subEventDate"
    render={({ field }) => (
      <FormItem>
       <div className="flex-grow flex-col sm:flex-row justify-end flex">
        <FormLabel  className="text-[16px] items-center flex grow-[1]">Date</FormLabel>
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
                  format(field.value,"PPP")
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
    name="subEventStartTime"
    render={({ field }) => (
      <FormItem className="flex">
        <FormLabel className="text-[16px] items-center flex grow-[1]">
            <div className="flex pt-2" >Start Time</div>
            </FormLabel><FormControl>
            <input type="time"  className="inline bg-background border border-border pl-2 p-1 h-full w-auto flex grow-[4]" placeholder="description" {...field} />
        </FormControl>
        
        
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="subEventEndTime"
    render={({ field }) => (
      <FormItem className="flex">
        <FormLabel className="text-[16px] pr-2  items-center flex grow-[1]">
            <div className="flex pt-2" >End Time</div>
            </FormLabel><FormControl>
          <input type="time"  className="inline bg-background border border-border pl-2 p-1 h-full w-auto flex grow-[4]" placeholder="description" {...field} />
        </FormControl>
        
        
        <FormMessage />
      </FormItem>
    )}
  />
  <DialogClose asChild>
  <div className="flex-grow flex justify-end">
  <Button type="submit" className="r-3">Submit</Button>
  </div>
  </DialogClose>
</form>
</Form> 
  </div>
 
</DialogContent>
</Dialog>
)

}