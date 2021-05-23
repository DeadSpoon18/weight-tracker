import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WeightCard from "../components/WeightCard";
import { db } from "../firebase";

const HomeScreen = ({ history }) => {
  const [weight, setWeight] = useState("");
  const [allWeight, setAllWeight] = useState([]);
  

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
    getAllWeight();
  }, [history, userInfo]);

  // adding data to firestore
  const weightHandleChange = async (e) => {
    e.preventDefault();
    await db.collection("weights").add({
      weight,
      userId: userInfo.uid,
      timestamp: new Date(),
    });
    setWeight("");
  };

  // getting all data
  const getAllWeight = async () => {
    try {
      db.collection("weights")
        .orderBy("timestamp", "desc")
        .onSnapshot(function (querySnapshot) {
          setAllWeight(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              weight: doc.data().weight,
              userId: doc.data().userId,
              timestamp: doc.data().timestamp,
            }))
          );
        });
    } catch (error) {}
  };

  const filteredWeights = allWeight.filter((w) => w.userId === userInfo.uid);

  return (
    <div>
      <form onSubmit={weightHandleChange}>
        <input
          name="weight"
          onChange={(e) => setWeight(e.target.value)}
          value={weight}
          placeholder="Enter Weight (Kg)"
          type="number"
          min="0"
        />
        <button><i className="fas fa-plus"></i></button>
      </form>

      {filteredWeights.length > 0 ? (
        filteredWeights.map((w) => (
          <WeightCard
            weight={w.weight}
            key={w.id}
            id={w.id}
            timestamp={w.timestamp}
          />
        ))
      ) : (
        <h2 className="no-weights">Add weight in your list</h2>
      )}
      
    </div>
  );
};

export default HomeScreen;
