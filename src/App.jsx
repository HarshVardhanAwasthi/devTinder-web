import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Connections from "./components/Connection";
import Requests from "./components/Requests";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Chat  from "./components/Chat"
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body/>}>
              <Route path="/" element={<Feed/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/Connections" element={<Connections/>}/>
              <Route path="/requests" element={<Requests/>}/>
              <Route path="/chat/:targetUserId"  element={<Chat/>} />
            </Route>
          </Routes>
        </BrowserRouter>
        {/* <h1 className="underline text-3xl font-bold">Hello World</h1>   */}
      </Provider>
    </>
  )
}

export default App
