import React,{Component} from "react"
import "./Auth.scss"
import Input from "../../components/UI/Input/Input"

function validateEmail(email) {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMsg: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMsg: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }
  loginHandler =()=> {

  }
  registerHandler =()=> {

  }
  submitHandler = event => {
    event.preventDefault()
  }
  validateControl(value, validation ){
    if(!validation){
      return true
    }
    let isValid = true
    if (validation.required){
      isValid = value.trim() !== '' && isValid
    }
    if (validation.email){
      isValid = validateEmail(value) && isValid
    }
    if (validation.minLength){
      isValid = value.length >= validation.minLength && isValid
    }
     return isValid
  }

  onChangeHandler(e,controlName) {

    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = e.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control
    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
    this.setState({
        formControls,
        isFormValid
    }
    )
}
  renderInput (){
    return  Object.keys(this.state.formControls).map((controlName,index) => {
      const control = this.state.formControls[controlName]
        return (
          <Input
            key={controlName + index}
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMsg={control.errorMsg}
            onChange={(e)=> {
              this.onChangeHandler(e, controlName)
            }}
          />
        )
    })
  }

    render(){
        return(
          <div className={'Auth'}>
            <div>
              <h1>Авторизация</h1>
              <form onSubmit={this.submitHandler} className={'AuthForm'}>
                {this.renderInput()}
                <button style={{padding : '10px 20px',
                  fontSize: '17px',
                  background: 'green',
                  color: '#fff',
                  cursor: 'pointer',
                  }}
                  disabled={!this.state.isFormValid}
                  type={'success'}
                  onClick={this.loginHandler}>Войти</button>
                <button style={{padding : '10px 20px',
                  fontSize: '17px',
                  background: 'orange',
                  color: '#fff',
                  cursor: 'pointer',
                  }}
                  disabled={!this.state.isFormValid}
                  onClick={this.registerHandler}>Зарегестрироваться</button>
              </form>
            </div>

          </div>

        )
    }
}