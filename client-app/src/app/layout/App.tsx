import React, { Fragment, useEffect, useState } from 'react';
import {  Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashborad/ActivityDashBoard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {activityStore}=useStore();

  const [activities,setActivities]=useState<Activity[]>([]);
  const [selectedActivity,setselectedActivity]=useState<Activity | undefined>(undefined);
  const [editMode,setEditMode]=useState(false);

  const [submitting,setSubmitting]=useState(false);



  useEffect(()=>{
  //  // axios.get<Activity[]>('http://localhost:5000/api/activities').then(response=>{    
  //   //setActivities(response.data);
  //   agent.Activities.list().then(response=>{
  //     const activities:Activity[]=[];
  //     response.forEach(activity=>{
  //       activity.date=activity.date.split('T')[0];
  //       activities.push(activity);
  //     })
  //     setActivities(activities);
  //     setLoading(false);
  //   })

   activityStore.loadActivities();
   },[activityStore])

  // function handleSelectActivity(id:string){
  //   setselectedActivity(activities.find(x=>x.id === id))
  // }

  // function handleCancelSelectActivity(){
  //   setselectedActivity(undefined);
  // }

  // function handleFormOpen(id?:string){
  //   id ? handleSelectActivity(id):handleCancelSelectActivity();
  //   setEditMode(true);
  // }

  // function handleFormClose(){
  //   setEditMode(false);
  // }

  function handleCreateOrEditActivity(activity:Activity){
    setSubmitting(true);
    if(activity.id ){
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x=>x.id !== activity.id),activity])
        setselectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }else{
      activity.id=uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities,activity])
        setselectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
      setEditMode(false);
      setselectedActivity(activity)
    }
  }

  function handleDeleteActivity(id:string){
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x=>x.id !== id)]);
      setSubmitting(false);
    })
  }

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>
  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>

        <ActivityDashBoard 
        activities={activityStore.activities} 
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
