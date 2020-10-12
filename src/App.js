import React from 'react';
import {Route, Switch} from "react-router-dom"
import Layout from "./hoc/Layout/Layout"
import Quiz from "./containers/Quiz/Quiz"
import QuizList from "./containers/QuizList/QuizList"
import QuizCreator from "./containers/QuizCreator/QuizCreator"
import Auth from "./containers/Auth/Auth"
import './App.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={'/quiz'} component={Quiz}/>
        <Route path={'/quiz-creator'} component={QuizCreator}/>
        <Route path={'/quiz/:id'} component={Quiz}/>
        <Route path={'/auth'} component={Auth}/>
        <Route path={'/'} component={QuizList}/>
      </Switch>
    </Layout>
  );
}

export default App;
