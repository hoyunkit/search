import React, { useState, useEffect } from "react";
import "./about.css";

const Event = () => {
    const [priceLimit, setPriceLimit] = useState(0);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/events?price=${priceLimit}`)
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error:', error));
        console.log(priceLimit);
    }, [priceLimit]);

    return (
        <div className="container">
          <div className="title">
            <b>
              Events whose Price under a Specific Number&nbsp;
            </b>
          </div>
          <div className="separator"></div>
          <div className="keyword_bx">
            <div className="search_box">Enter number:</div>
            <div>
                <input type="number" value={priceLimit} onChange={e => setPriceLimit(e.target.value)} />
            </div>
          </div>
          <div className="result_bx">
            <table className="result-table">
            <thead>
            <tr>
              <th>Event ID</th>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>
            <tbody>
                {events.map((event, index) => (
                    <tr key={index}>
                        <td>{event.eventId}</td>
                        <td>{event.title}</td>
                        <td>{event.price}</td>
                    </tr>
                ))}
            </tbody>
            </table>
          </div>
        </div>
    );
};

export default Event;
