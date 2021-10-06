import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashBoard from "../../features/activities/dashborad/ActivityDashBoard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router";
import HomePage from "../../features/activities/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
  const location = useLocation();
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={ActivityDashBoard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);

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

// function handleCreateOrEditActivity(activity:Activity){
//   setSubmitting(true);
//   if(activity.id ){
//     agent.Activities.update(activity).then(()=>{
//       setActivities([...activities.filter(x=>x.id !== activity.id),activity])
//       setselectedActivity(activity);
//       setEditMode(false);
//       setSubmitting(false);
//     })
//   }else{
//     activity.id=uuid();
//     agent.Activities.create(activity).then(()=>{
//       setActivities([...activities,activity])
//       setselectedActivity(activity);
//       setEditMode(false);
//       setSubmitting(false);
//     })
//     setEditMode(false);
//     setselectedActivity(activity)
//   }
// }

// function handleDeleteActivity(id:string){
//   setSubmitting(true);
//   agent.Activities.delete(id).then(()=>{
//     setActivities([...activities.filter(x=>x.id !== id)]);
//     setSubmitting(false);
//   })
// }
