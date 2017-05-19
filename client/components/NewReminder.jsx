import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Image, Modal, Menu, Form} from 'semantic-ui-react'

class ModalModalExample extends Component {
  render() {
    return (  
    <Modal trigger={<Menu.Item as='a' name='new' />}>
    <Modal.Header>Create a new reminder</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Fill out the fields</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
      </Modal.Description>
      <Form onSubmit= {this.props.handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input placeholder='Title' value={this.props.data.title} onChange={(event) => this.props.handleChange(event, 'title')} />
        </Form.Field>       
        <Form.Field>
          <label>Address</label>
          <input placeholder='Address' value={this.props.data.address} onChange={(event) => this.props.handleChange(event, 'address')} />
        </Form.Field>
         <Form.Field>
          <label>Description</label>
          <input placeholder='Description' value={this.props.data.note} onChange={(event) => this.props.handleChange(event, 'note')} />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </Modal.Content>
  </Modal>
  )
  }

}

export default ModalModalExample
