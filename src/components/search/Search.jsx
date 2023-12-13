import React, { useState } from "react";
import "./about.css";

const data = [
  {
    name: "3Name",
    link: "Yuen-Chau-Kok",
    no: "3",
  },
  {
    name: "Random",
    link: "https://www.google.com/",
    no: "9999",
  },
  {
    name: "1Name",
    link: "https://www.facebook.com/",
    no: "1",
  },
  {
    name: "2Name",
    link: "2Link",
    no: "2",
  },
];
const dataSize = JSON.parse(JSON.stringify(data)).length;

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc"); // Initial sorting order is ascending
  const [sortedData, setSortedData] = useState(data);

  const handleSearch = () => {
    if (searchText === "") {
      alert("Invalid input, please type it again!");
    }
    console.log(searchText);
    setSearchText("");
  };

  const handleSort = () => {
    const newSortingOrder = sortingOrder === "asc" ? "desc" : "asc";
    setSortingOrder(newSortingOrder);

    const sorted = [...data].sort((a, b) => {
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
    var clickedText = event.target.textContent;
    // console.log("Clicked Text:", clickedText);
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
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                <td id={`name-${index + 1}`}>
                  {index < dataSize ? sortedData[index].name : ""}
                </td>
                <td
                  id={`link-${index + 1}`}
                  onClick={(event) =>
                    handleLinkClick(
                      event,
                      index < dataSize ? sortedData[index].link : ""
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <u>{index < dataSize ? sortedData[index].link : ""}</u>
                </td>
                <td id={`no-${index + 1}`}>
                  {index < dataSize ? sortedData[index].no : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
