import React, {Component} from "react"
import Nav from "../../containers/Nav/Nav"

export default class Layout extends Component {
  render() {
    return(
      <div>
        <main>
          <Nav/>
          {this.props.children}
        </main>
      </div>
    )
  }

}