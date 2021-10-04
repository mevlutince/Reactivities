import React, { Fragment, useEffect, useState } from 'react';


import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashborad/ActivityDashBoard';

function App() {

  const [activities,setActivities]=useState<Activity[]>([]);
  const [selectedActivity,setselectedActivity]=useState<Activity | undefined>(undefined);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response=>{
    
    setActivities(response.data);
    })
  },[])

  function handleSelectActivity(id:string){
    setselectedActivity(activities.find(x=>x.id === id))
  }

  function handleCancelSelectActivity(){
    setselectedActivity(undefined);
  }
  return (
    <>
      <NavBar/>
      <Container style={{marginTop:'7em'}}>
        <ActivityDashBoard activities={activities} 
        selectedActivity={selectedActivity} 
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        />
      </Container>
    </>
  );
}

export default App;
