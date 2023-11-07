import { EventEntity } from "@/types/EventType";
import {
    Dialog,
    DialogContent,
  
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/ui/dialog"
  
  import EditIcon from '@mui/icons-material/Edit';
  import ShareIcon from '@mui/icons-material/Share';


interface EventCardProps {
    event: EventEntity;
    index: number;  
    onEditClick: () => void;
    
  }

  
  export function EventCard(props: EventCardProps) {
    console.log("EventCard");
    console.log(props.event);
    
    const monthNumberToName = (monthNumber: number) => {
      switch (monthNumber+1) {
        case 1: return "Jan";
        case 2: return "Feb";
        case 3: return "Mar";
        case 4: return "Apr";
        case 5: return "May";
        case 6: return "Jun";
        case 7: return "Jul";
        case 8: return "Aug";
        case 9: return "Sep";
        case 10: return "Oct";
        case 11: return "Nov";
        case 12: return "Dec";
      }
    };
    const formatTime = (time: string) => {
      const [hour, minute, rest] = time.split(':');
      const ampm = rest.trim().substring(3,5).toUpperCase();
      return `${hour}:${minute} ${ampm}`;
    };
    const event = props.event;
    return(
  <div key={props.index} className="mx-2 md:mx-5 my-3 sm:my-5 flex flex-row outline outline-1 relative bg-card outline-secondary rounded p-3 hover:outline-primary">
         
         <Dialog >
         <div className="absolute sm:pb-5 sm:pr-2 sm:pt-3 grow top-0  align-center flex-col pt-2 right-0 ">
                <button  onClick={()=>{
                    props.onEditClick();
                }} className="pr-2 flex  color-primary pb-3 sm:pt-1 "><EditIcon sx={{fontSize: 17, color: "grey", fontSizeAdjust: 2}}/></button>
                <DialogTrigger className="pr-2  flex sm:pt-3"><ShareIcon   sx={{ fontSize: 17 ,color:"grey" }}   /></DialogTrigger>
                </div>
  
  <DialogContent className="max-w-[375px] sm:max-w-[800px] sm:m-0">
    <DialogHeader>
      <DialogTitle>please visit host/view/{event.id}</DialogTitle>
      
    </DialogHeader>
  </DialogContent>
</Dialog>


         <div className="flex sm:min-w-[150px] min-w-[90px]  flex-grow md:max-w-[150px]">
            
            
            
          <div className="flex-grow  sm:pt-10 sm:pb-10 items-center  bg-secondary bg-opacity-80 hover:bg-opacity-100  rounded sm:p-5 p-4 ">
            <div className="flex-col items-center  grow">
            <div className="sm:text-3xl text-[15px] h-full flex grow justify-center">
             <h1 className="flex text-white ">{monthNumberToName(event.startDate.getMonth())+" "}{event.startDate.getDate()}</h1> 
              </div>
              <div className="sm:text-xl text-[14px] pt-1 text-white text-opacity-60 justify-center flex grow">
  
                <h1 className="flex">{formatTime(event.startTime)}</h1>
  
              </div>
              </div>
  
          </div>
         </div>
         <div className="flex flex-col grow-[7] p-3 "> 
         <div className="flex text-lg  p-0">{props.event.eventName}</div>
         <div  className="flex text-sm text-primary pb-1">{props.event.description}</div>
         </div>
        </div>
    )
  
  }