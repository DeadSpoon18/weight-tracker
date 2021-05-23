import React from "react";
import { db } from "../firebase";
import moment from "moment"

const WeightCard = ({ weight, id, timestamp }) => {
  const deleteWeightHandler = () => {
    db.collection("weights").doc(id).delete();
  };
 
  return (
    <div className="note">
      <h1>{weight} Kg</h1>
       <p>{moment(timestamp.toDate()).calendar()}</p>  
      <button onClick={deleteWeightHandler}><i className="fas fa-trash"></i></button>
    </div>
  );
};

export default WeightCard;
