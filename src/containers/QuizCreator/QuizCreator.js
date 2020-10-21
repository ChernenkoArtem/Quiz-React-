import React,{Component} from "react"
import "./QuizCreator.scss"
import Input from "../../components/UI/Input/Input"
import {createControl, validate, validateForm} from "../../form/fornFramework"
import Select from "../../components/UI/Select/Select"
import axios from "axios"

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMsg: 'Значение не может быть пустым',
        id: number
    }, {required: true})
}
function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMsg: 'Вопрос не может быть пустым',
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2) ,
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}
export default class QuizCreator extends Component {
    state = {
        quiz : [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }
    submitHandler(e){
        e.preventDefault()
    }
    addQuestionHandler = (e) => {
      e.preventDefault()

      const quiz = this.state.quiz.concat()
      console.log(quiz)
      const index = quiz.length + 1
      const {question, option1, option2, option3, option4} = this.state.formControls

      const questionItem = {
        question: question.value,
        id: index,
        rightAnswerId: this.state.rightAnswerId,
        answers: [
          {text: option1.value, id: option1.id},
          {text: option2.value, id: option2.id},
          {text: option3.value, id: option3.id},
          {text: option4.value, id: option4.id}
        ]
      }
      quiz.push(questionItem)

      this.setState({
        quiz,
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
      })

    }
    createQuizHandler = async () =>{
        try {
          await axios.post('https://quiz-9b8f2.firebaseio.com/quizes.json',this.state.quiz)

          this.setState({
            quiz: [],
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
          })
        }catch (error){
          console.log(error)
        }
      // axios.post('https://quiz-9b8f2.firebaseio.com/quizes.json',this.state.quiz)
      //   .then( respons =>{
      //     console.log(respons)
      //   })
      //   .catch(error => console.log(error))
    }
    changeHandler (e, controlName) {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = e.target.value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control
        this.setState({
              formControls,
              isFormValid: validateForm(formControls)
            })
    }
    renderControls (){
        return Object.keys(this.state.formControls).map((controlName, index)=>{
            const control = this.state.formControls[controlName]
            return (
              <React.Fragment key={index}>
                  <Input
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMsg={control.errorMsg}
                    onChange={event =>this.changeHandler(event,controlName)}
                  />
                  {index === 0 ? <hr/> : null}
              </React.Fragment>
            )

        })
    }
    selectChangeHandler = e => {
        this.setState({
            rightAnswerId: +e.target.value
        })
    }
    render(){
        const select = <Select
            label={'Выбирите правильный ответ'}
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return(
          <div className={'QuizCreator'}>
              <div>
                  <h1>
                      Создание теста
                  </h1>
                  <form onSubmit={this.submitHandler}>
                      {this.renderControls()}
                      {select}
                      <button
                        onClick={this.addQuestionHandler}
                        disabled={this.state.isFormValid === false}
                      >Добавить вопрос</button>
                      <button
                        onClick={this.createQuizHandler}
                        disabled={this.state.quiz.length === 0}
                      >Создать тест</button>
                  </form>
              </div>
          </div>
        )
    }
}