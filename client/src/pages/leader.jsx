import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { SocketContext } from "../contexts/appSocket";

export default function Leader() {
    const socket = useContext(SocketContext);
    const [leader, setLeader] = useState([]);

    useEffect(() => {
        socket?.on("showLeaderBoard:broadcast", (leaderBoard) => {
            console.log(leaderBoard, "ini leaderboard ==== II");

            setLeader(leaderBoard);
        });
    }, [leader])
console.log(leader, "===== ini leader");

    return (
        <>
            <h1>Leader Board</h1>
            {leader?.length === 0 ? (
                <h1>Loading...</h1>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Score</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leader?.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{user.username}</td>
                                        <td>{user.score}</td>
                                        <td>{new Date().toLocaleDateString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}