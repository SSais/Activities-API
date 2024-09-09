import activities from "../activities/activities.json" with {type : "json" };

export async function getActivities (){
    return activities
};

export async function createActivities(userInput){
    activities.push(userInput);
    return activities;
}

export async function replaceActivity(requestId , newActivity) {
        const index = activities.findIndex(({ id }) => id === requestId);
        console.log(index, newActivity);
        if (index === -1) {
            throw new Error(`No activity with ID ${requestId} found.`);
          }
        activities[index] = newActivity;
        return activities;
      }


export async function deleteActivity(requestId){
     const index = activities.findIndex(({id})=> id === requestId);
     console.log(index);
     if (index === -1) {
      throw new Error(`No activity with ID ${requestId} found.`);
    }
    const activityToBeDeleted = activities[index];
    activities.splice(index, 1);
    return activityToBeDeleted;
  
}



//I want to delete one activity id
//I will find the requested Id to specify the block/object that I want to delete.
//Find the index which finds the matching block and prints it
//then delete the object block of that id