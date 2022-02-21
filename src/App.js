import "./App.css";
import DataFetchReducer from "./DataFetchReducer";
import ErrorBoundary from "./ErrorBoundary";
import { Link, Routes, Route, Outlet, NavLink } from "react-router-dom";

function App() {
  const usersList = [
    {
      id: 1,
      name: "Suhaas",
    },
    {
      id: 2,
      name: "Jainam",
    },
  ];
  return (
    <div className="App">
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
            path="home"
            element={
              <ErrorBoundary>
                <DataFetchReducer />
              </ErrorBoundary>
            }
          />
          <Route path="users" element={<Users users={usersList} />} />
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

const Layout = (children) => {
  const style = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
  });
  return (
    <>
      <nav>
        <NavLink to="/home" style={style}>
          Home
        </NavLink>
        <NavLink to="/users" style={style}>
          About
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

const Users = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
