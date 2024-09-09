//package imports
import express from "express";
import helmet from "helmet";
import uuid4 from "uuid4";

//imports from function.js file
//We have specificed these to follow applicable REST conventions
import {
  getActivities,
  createActivities,
  replaceActivity,
  deleteActivity,
} from "./functions/functions.js";

//server parameters
const app = express();
const port = 3000;

//middleware
app.use(helmet());

app.use(express.json());

//homescreen- should return "Hello world"
app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

//This function gets us a list of all the activities in our activities.json file
app.get("/activities", async (req, res) => {
  try {
    const activity = await getActivities();
    res.status(200).json({
      success: true,
      payload: activity,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      payload: "Internal server error",
   });
  }
});

// This function will create a new activity value in our object keys pairs.
app.post("/activities", async (req, res) => {
  try {
    //if any of these conditions are true then we don't want to continue
    if (
      Object.keys(req.body).length === 0 ||
      !("activity_type" in req.body) ||
      !("activity_duration" in req.body)
    ) {
      res.status(400).json({
        success: false,
        payload: "You did not enter in the correct object:keys, please enter keys as activity_type and activity_duration",
      });
    } else {
      const completedActivities = {
        ...req.body,
        id: uuid4(),
        activity_submitted: Date.now(),
      };
      const activity = await createActivities(completedActivities);
      res.status(200).json({
        success: true,
        payload: activity,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      payload: "Oops, internal server error",
   });
  }
});

//This function replaces given activity value by updating the json data.
app.put("/activities", async (req, res) => {
  try {
    const userInput = req.body.id;
    const newActivity = await replaceActivity(userInput, req.body);
    res.status(201).json({
      success: true,
      payload: newActivity,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      payload: {error: err.message},
   });
  }
});

//This function deletes the code block of an id in the activities.json file array
app.delete("/activities/:id", async (req, res) => {
  try{const deletedActivity = await deleteActivity (req.params.id) 
    res.status(200).json({
       success: true,
       payload: deletedActivity,
    });
  }
  catch (err) {
    res.status(400).json({
      success: false,
      payload: {error: err.message},
   });
  }
} );



// port is constantly listening for 3000 whilst being in global scope

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
