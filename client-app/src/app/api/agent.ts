import axios, { AxiosError ,AxiosResponse} from "axios";

import { toast } from "react-toastify";
import { history } from "../..";
import { Activity } from "../models/activity";
import { store } from "../stores/store";


const sleep=(delay:number)=>{
    return new Promise((resolve)=>{
         setTimeout(resolve,delay)  
    })
}

axios.defaults.baseURL='http://localhost:5000/api';

// axios.interceptors.response.use(response=>{
//     return sleep(1000).then(()=>{
//         return response;
//     }).catch((error)=>{
//         console.log(error);
//         return Promise.reject(error);    
//     })
    
// })

// axios.interceptors.response.use(async response=>{
//          try {
//              await sleep(1000)
//              return response;
//          }catch(error){
//              console.log(error);
//              return Promise.reject(error);    
//         }
        
//     }
// )


axios.interceptors.response.use(async response=>
    {
        await sleep(1000);
        return response;
    },(error:AxiosError)=>{
        const{data,status,config}=error.response!;
        
        
        switch(status){
            case 400:   
            if(typeof data === 'string'){
                toast.error(data);
            }
             if(typeof data === 'object'){
              console.log('xxxxxxxxxxxxxxx')
              console.log(config.headers);
            }

            //    if(config.method ==='get' && data.errors.hasOwnProperty('id')){
            //        history.push('/not-found');
            //    }

        //    console.log("dönen data degeri:",data[errors])
           
            // console.log(data)
            // console.log("**************************")
            // console.log("dönen status degeri:",status)
         //   console.log("dönen status degeri:")
           
                   
           /*     if(data.errors)
               {
                     const modalStateErrors=[];
                    for(const key in data.errors){
                     if(data.errors[key]){
                         modalStateErrors.push(data.errors[key])
                    
                     }
                    }
                throw modalStateErrors.flat();
                }
             else{
                toast.error(data);
             } */
                
                break;
             case 401:
                toast.error('unauthorized')
                break;         
            case 404:
               history.push('/not-found');
                break;  
            case 500:
               store.commonStore.setServerError(data);   
               history.push('/server-error')
                break;      
        }
        return Promise.reject(error);
    }
    )


const responseBody=<T>(response:AxiosResponse<T>)=>response.data;

const requests={
    get:<T>(url:string)=>axios.get<T>(url).then(responseBody),
    post:(url:string,body: {})=>axios.post(url,body).then(responseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(responseBody),
    del:<T>(url:string)=>axios.delete<T>(url).then(responseBody)
}

const Activities={
    list:()=>requests.get<Activity[]>('/activities'),
    details:(id:string)=>requests.get<Activity>(`/activities/${id}`),
    create:(activity:Activity)=>requests.post('/activities',activity),
    update:(activity:Activity)=>requests.put(`/activities/${activity.id}`,activity),
    delete:(id:string)=>requests.del<void>(`/activities/${id}`)
}

const agent={
    Activities
}

export default agent;