import { useEffect, useState, useContext } from "react";
import data from "../data/flags.json";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../contexts/appSocket";
export default function Room() {
  const [answer, setAnswer] = useState("");
  const [dataPerItem, setDataPerItem] = useState([]);
  const [change, setChange] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  // console.log(data, "ini data json =======");

  // console.log(dataMap[0], "ini data maping json =======");

  useEffect(() => {
    console.log(dataPerItem, "ini data per item =====");
    let dataMap = data.map((item) => {
      return item;
    });

    let dataRandom = dataMap[Math.floor(Math.random() * dataMap.length)];
    setDataPerItem(dataRandom);
    localStorage.setItem("score", score);
    console.log(score, "ini score");
    console.log(answer.toUpperCase(), "ini answer");

    console.log(change, "ini change");

    
    if (change === 3) {
        console.log("masuk ke emit");
        socket.emit("leaderBoard:broadcast", {
            
            
            username: localStorage.getItem("username"),
            score
        })
        console.log("masuk ke emit");
        navigate("/leader");
    }
  }, [change]);


    const handleAnswer = (e) => {
        e.preventDefault();
        
        if (answer.toUpperCase() === dataPerItem.name || answer.toUpperCase() === dataPerItem.commonName) {
            setScore(score + 10);
        }

        setChange(change + 1);

        setAnswer("");
    };

  return (
    <>

      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={dataPerItem.imageUrl} alt="flag" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{dataPerItem.hint}</h2>
          <p>fill the correct answer</p>
          <form onSubmit={handleAnswer}>
            <div className="card-actions">
              <input
                type="text"
                placeholder="type here"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}></input>
            </div>
            <div>
              <button className="btn bg-sky-700 text-white" type="submit">
                Answer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
