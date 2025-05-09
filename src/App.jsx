import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from './component/NavBar.jsx'
import Restration from "./page/Restration.jsx";
import Login from "./page/Login.jsx";
import {Home} from "./page/Home.jsx";
import {CreateTask} from "./page/CreateTask.jsx";
import {TaskPage} from "./page/TaskPage.jsx";
import {TaskView} from "./page/TaskView.jsx";

function App() {
    return (
        <Router>
            {location.pathname !== '/home' && <NavBar/>}
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/registration" element={<Restration/>}/>
                <Route path="/create-task" element={<CreateTask/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/task" element={<TaskPage/>}/>
                <Route path="task/tasks/:id" element={<TaskView/>}/>
            </Routes>
        </Router>
    )
}

export default App
