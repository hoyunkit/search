import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Nav from "./components/navbar/Nav";
import Print from "./components/print/Print";
import Search from "./components/search/Search";
const Home = () => <div>Home Component</div>;
const App = () => {
  const [activeComponent, setActiveComponent] = useState("Home");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <Home />;
      case "Print":
        return <Print />;
      case "Search":
        return <Search />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Nav setActiveComponent={setActiveComponent} />
      {renderComponent()}
    </div>
  );
};

export default App;

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App name="CUHK pictures" />);
