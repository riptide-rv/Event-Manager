import React, { useState } from 'react';
import SplashScreen from './components/screens/SplashScreen';

import HomeScreen from './components/screens/HomeScreen';
import { EventData } from './types';
import EventDetailsScreen from './components/screens/EventScreen';
import { LoginScreen } from './components/screens/LoginScreen';



const App: React.FC = () => {
  const [showHome, setShowHome] = useState(false);
  
  
  

  const [events, setEvents] = useState<EventData[]>([]);
 
  const [showEventDetails, setShowEventDetails] = useState(false);

  const handleCreateEvent = (event: EventData) => {
    setEvents([...events, event]);
    setShowEventDetails(false); // Hide event details screen after saving event
  };


  const handleButtonClick = () => {
    setShowHome(true);
  };
  
  

  return (
    
   
    <div className="App">
      
    {!showHome ? (
      <SplashScreen onButtonClick={handleButtonClick} />
    ) : events.length === 0 ? (
      <LoginScreen />
    ) : (
      <HomeScreen events={events} onCreateEvent={() => setShowEventDetails(true)} />
    )}
    {showEventDetails && <EventDetailsScreen onSaveEvent={handleCreateEvent} />}
 

  </div>
  

  );
};

export default App;


