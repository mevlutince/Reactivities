using System.Collections.Generic;
using Domain;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Persistance;
using Microsoft.EntityFrameworkCore;
using System;
using MediatR;
using Application.Activities;
using System.Threading;

namespace API.Controllers
{
    public class ActivitiesController:BaseApiController
    {
       

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivity()
        {
            var result =await Mediator.Send(new List.Query());
            return HandleResult(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id){
           var result = await Mediator.Send(new Detail.Query{Id=id});
           return HandleResult(result);
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Activity=activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id,Activity activity)
        {
            activity.ID=id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity=activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivitiy(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id=id} ));
        }

    }
}