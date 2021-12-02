import "./App.css";
require("dotenv").config();
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
