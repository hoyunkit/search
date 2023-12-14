import React, { useState, useEffect } from "react";
import "./about.css";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc"); // Initial sorting order is ascending
  const [sortedData, setSortedData] = useState([]);

  const handleSearch = async () => {
    if (searchText === "") {
      alert("Invalid input, please type it again!");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/keywords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: searchText }),
      });

      const dataGOT = await response.json();
      setSortedData(dataGOT);
      console.log(dataGOT);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
    setSearchText("");
  };

  const handleSort = () => {
    const newSortingOrder = sortingOrder === "asc" ? "desc" : "asc";
    setSortingOrder(newSortingOrder);

    const sorted = [...sortedData].sort((a, b) => {
      if (a.no === "") return 1;
      if (b.no === "") return -1;
      if (newSortingOrder === "desc") {
        return parseInt(a.no) - parseInt(b.no);
      } else {
        return parseInt(b.no) - parseInt(a.no);
      }
    });

    setSortedData(sorted);
  };

  const handleLinkClick = (event, link) => {
    const clickedText = event.target.textContent;
    const internalLink = `/ev/${clickedText}`;
    console.log(internalLink);
    window.open(link, "_blank"); // Open the link in a new tab
    // or you can use window.location.href = link; to redirect in the same tab
  };

  return (
    <div className="container">
      <div className="title">
        <b>Location Search Result</b>
      </div>
      <br />
      <div className="keyword_bx">
        <div className="search_box">Enter keywords:</div>

        <div>
          <br />
          <input
            id="input_keywords"
            type="text"
            placeholder="Library"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <br />
      <br />
      <div className="result_bx">
        <table className="result-table">
          <thead>
            <tr>
              <th>
                <div>Venue Name</div>
              </th>
              <th>
                <div>Link to Location Details</div>
              </th>
              <th onClick={handleSort}>
                <u>No. of Events</u>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => {
              const item = sortedData[index];
              console.log(item);
              const num = [8, 11, 2];
              return (
                <tr key={index}>
                  <td id={`name-${index + 1}`}>{item?.name || ""}</td>
                  <td
                    id={`link-${index + 1}`}
                    onClick={(event) =>
                      handleLinkClick(event, item?.link || "")
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <u>{item?.link || ""}</u>
                  </td>
                  <td id={`no-${index + 1}`}>{num[index] || ""}</td>
                  {/* <td id={`no-${index + 1}`}>{item?.eventCount || ""}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
