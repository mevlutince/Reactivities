import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, FormField, Label, Segment,Header } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid} from 'uuid';
import { Link } from "react-router-dom";
import { Formik ,Form,Field, ErrorMessage } from "formik";
import { values } from "mobx";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/MyText";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/form/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";

export default observer( function ActivityForm(){
    const history=useHistory();
    const {activityStore}=useStore();
    const{createActivity,updateActivity,loading,loadActivity,loadingInitial}=activityStore;
    const {id} =useParams<{id: string}>();
  
    const [activity,setActivity]=useState<Activity>({
        id:'',
        title:'',
        category:'',
        description:'',
        date:null,
        city:'',
        venue:''
    });

    const validationSchma=Yup.object({
        title: Yup.string().required('the activity title is required'),
        description: Yup.string().required('the activity descriotion is required'),
        category: Yup.string().required('the activity category is required'),
        date: Yup.string().required('the activity date is required').nullable(),
        city: Yup.string().required('the activity city is required'),
        venue: Yup.string().required('the activity venue is required'),
    });
    useEffect(()=>{
        if(id) loadActivity(id).then(activity=>setActivity(activity!));
    },[id,loadActivity]);

   
    function handleFormSubmit(activity:Activity){
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

 /*
    function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name,value}=event.target;
        setActivity({...activity,[name]:value})
    }
*/

    if(loadingInitial) return <LoadingComponent content='Loading activity ...' />
    return(
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik 
                validationSchema={validationSchma}
                enableReinitialize 
                initialValues={activity} 
                onSubmit={values=> handleFormSubmit(values)}>
                    {({handleSubmit , isValid,isSubmitting,dirty})=>(
                       <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                         
                       <MyTextInput placeholder="Title" name='title' />                                                  
                       <MyTextArea placeholder="Description" name='description' row={2}/>
                       <MySelectInput options={categoryOptions} placeholder="Category" name='category'  />
                       <MyDateInput 
                            placeholderText="Date" 
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM dd yyyy h:mm aa' />
                            <Header content='Location Details' sub color='teal' />
                       <MyTextInput placeholder="City" name='city' />
                       <MyTextInput placeholder="Venue" name='venue' />
                       <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' positive type='submit' content='Submit' />            
                       <Button as={Link} to='/activities' floated='right'  type='button' content='Cancel' />            
                   </Form>
                )}
            </Formik>
         
        </Segment>
    )
}
)