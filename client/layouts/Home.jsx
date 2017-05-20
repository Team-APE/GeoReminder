import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Card, Container, Grid, Form, Button } from 'semantic-ui-react'
import axios from 'axios'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    };
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }


  handleOnChange(fieldType, e) {
    let obj = {}
    obj[fieldType] = e.target.value
    this.setState(Object.assign(this.state, obj))
  }
  handleOnClick(buttonType, e) {
    e.preventDefault()
    let that = this;
    if (buttonType === 'signup') {
      axios.post('/api/users', {
        userName: this.state.username,
        password: this.state.password
      }).then(function(response) {
        if (response.data.success) {
          that.setState({
            redirect: '/main'
          })
        } else {
          alert(response.data.message)
        //TODO: MAKE ERROR MESSAGE!
        }
        console.log(response);
      })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      axios.post('/api/auth/login', {
        userName: this.state.username,
        password: this.state.password
      }).then(function(response) {
        console.log(response.data)
        if (response.data.success) {
          that.setState({
            redirect: '/main'
          })
        } else {
          alert(response.data.message)
        //TODO: MAKE ERROR MESSAGE!
        }
        console.log(response);
      })
        .catch(function(error) {
          console.log(error);
        });
    }

    console.log(buttonType)

  }


  render() {
    if (this.state.redirect) return <Redirect push to={this.state.redirect}/>
    return (
      <Grid centered verticalAlign="middle">
         <Grid.Column textAlign="center">
      <CardExampleCard handleOnChange={this.handleOnChange} handleOnClick={this.handleOnClick}/>
        </Grid.Column>
      </Grid>
    )
  }
}
const CardExampleCard = (props) => (
  <Card className="centered">
    <Card.Content>
      <Card.Header>
        Welcome to GeoReminder
      </Card.Header>
      <Form>
   <Form.Field>
     <label>Username</label>
     <input placeholder='Username' onChange={(e) => props.handleOnChange('username', e)} />
   </Form.Field>
   <Form.Field>
     <label>Password</label>
     <input placeholder='Password' onChange={(e) => props.handleOnChange('password', e)} />
   </Form.Field>
   <Button   onClick={(e) => props.handleOnClick('signup', e)}>Sign Up</Button>
   <Button   onClick={(e) => props.handleOnClick('login', e)}>Log In</Button>
 </Form>
    </Card.Content>
  </Card>
)

export default Home
