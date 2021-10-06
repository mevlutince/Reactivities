import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";

export default observer( function ActivityForm(){
    const history=useHistory();
    const {activityStore}=useStore();
    const{createActivity,updateActivity,loading,loadActivity,loadingInitial}=activityStore;
    const {id} =useParams<{id: string}>();
  
    const [activity,setActivity]=useState({
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    });

    useEffect(()=>{
        if(id) loadActivity(id).then(activity=>setActivity(activity!));
    },[id,loadActivity]);

    function handleSubmit(){
        if(activity.id.length === 0)
        {
            let newActivity={
                ...activity,
                id:uuid()
            };
            createActivity(newActivity).then(()=> history.push(`/activities/${newActivity}`));
        }else{
            updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`));
        }
    }

    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name,value}=event.target;
        setActivity({...activity,[name]:value})
    }

    if(loadingInitial) return <LoadingComponent content='Loading activity ...' />
    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" name='title' value={activity.title} onChange={handleInputChange} />
                <Form.TextArea placeholder="Description" name='description' value={activity.description} onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder="Category" name='category' value={activity.category} onChange={handleInputChange} />
                <Form.Input type="date" placeholder="Date" name='date' value={activity.date} onChange={handleInputChange} />
                <Form.Input placeholder="City" name='city' value={activity.city} onChange={handleInputChange} />
                <Form.Input placeholder="Venue" name='venue' value={activity.venue} onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />            
                <Button as={Link} to='/activities' floated='right'  type='button' content='Cancel' />            
            </Form>
        </Segment>
    )
}
)