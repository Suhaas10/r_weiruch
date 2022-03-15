import "./App.css";
import DataFetchReducer from "./DataFetchReducer";
import ErrorBoundary from "./ErrorBoundary";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";
import Stopwatch from "./Stopwatch";
import TimerCounter from "./TimerCounter";
import TodoList from "./TodoList";
import AckoTable from "./AckoTable";
import ChatApp from "./ChatApp";
import ScrumBot from "./ScrumBot";
import Hooks from "./Hooks";

function App() {
  return (
    <div>
      Robin Weiruch playground
      {/* https://www.robinwieruch.de/react-hooks-fetch-data/ */}
      {/* <HackerNewsList /> */}
      {/* <NavigationBar></NavigationBar> */}
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <ErrorBoundary>
                <DataFetchReducer />
              </ErrorBoundary>
            }
          ></Route>
          <Route
            path="algoliahackernews"
            element={
              <ErrorBoundary>
                <DataFetchReducer />
              </ErrorBoundary>
            }
          />
          <Route path="timercounter" element={<TimerCounter />} />
          <Route path="stopwatch" element={<Stopwatch />} />
          <Route path="todolistreact" element={<TodoList />} />
          <Route path="scrumbot" element={<ScrumBot />} />
          <Route path="ackotable" element={<AckoTable />} />
          <Route path="chatapp" element={<ChatApp />} />
          <Route path="hooks" element={<Hooks />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

const NoMatch = () => {
  return <div>Error! Page Not Found 404</div>;
};
// const NavigationBar = () => {
//   return (
//     <nav>
//       <Link to="/home">Home</Link>
//       <Link to="/users">About</Link>
//     </nav>
//   );
// };

//Layout gets isActive from inheritance
const Layout = (children) => {
  const style = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    margin: "50px",
    backgroundColor: isActive ? "red" : "lightgray",
    padding: "5px",
  });
  return (
    <div>
      <nav style={{ backgroundColor: "cyan", padding: "20px" }}>
        <NavLink to="/algoliahackernews" style={style}>
          Algolia Hacker News
        </NavLink>
        <NavLink to="/timercounter" style={style}>
          Timer / Counter
        </NavLink>
        <NavLink to="/stopwatch" style={style}>
          Stopwatch
        </NavLink>
        <NavLink to="/todolistreact" style={style}>
          To do list react porter
        </NavLink>
        <NavLink to="/scrumbot" style={style}>
          scrum BOT
        </NavLink>
        <NavLink to="/ackotable" style={style}>
          Acko Table
        </NavLink>
        <NavLink to="/chatapp" style={style}>
          Chat App
        </NavLink>
        <NavLink to="/hooks" style={style}>
          HOOKS
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
