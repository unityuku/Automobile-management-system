import logo from './logo.svg';
import './App.css';
import { Button, message } from 'antd'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import admin from './pagegs/admin/admin'
import Login from './pagegs/login/login'
import Home from './pagegs/home/home'
function App() {

  return (



    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/home' component={Home} />

      </Switch>


    </BrowserRouter>


  );
}

export default App;
