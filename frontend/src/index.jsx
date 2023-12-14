import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Favourite from "./components/favourite/Favourite";
import Search from "./components/search/Search";

const Home = () => <div>Home Component</div>;
const NoMatch = () => <div>404 Components not found</div>;

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <ul style={{ listStyle: "none", display: "flex", gap: "10px" }}>
                <li>
                  <Link to="/" style={{ fontSize: "20px" }}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/search" style={{ fontSize: "20px" }}>
                    Location Search
                  </Link>
                </li>
                <li>
                  <Link to="/favourite" style={{ fontSize: "20px" }}>
                    Favourite
                  </Link>
                </li>
              </ul>
            </div>
            <button className="logOut">Log out</button>
          </div>

          <hr />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App name="CUHK pictures" />);
