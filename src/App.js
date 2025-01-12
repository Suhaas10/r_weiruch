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
import UseCallback from "./UseCallback";
import Hooks from "./Hooks";
import ReactMemo from "./Reactmemo";
import UseMemo from "./UseMemo";
import ReactMapsPolygon from "./ReactMapsPolygon";

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
          <Route path="usecallback" element={<UseCallback />} />
          <Route path="reactmemo" element={<ReactMemo />} />
          <Route path="usememo" element={<UseMemo />} />
          <Route path="reactmaps" element={<ReactMapsPolygon />} />

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
    margin: "20px",
    backgroundColor: isActive ? "red" : "lightgray",
    padding: "5px"
  });
  return (
    <div>
      <nav
        style={{
          backgroundColor: "cyan",
          padding: "10px",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
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
        <NavLink to="/usecallback" style={style}>
          useCallback
        </NavLink>
        <NavLink to="/reactmemo" style={style}>
          React Memo
        </NavLink>
        <NavLink to="/usememo" style={style}>
          useMemo
        </NavLink>
        <NavLink to="/reactmaps" style={style}>
          React Maps
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
