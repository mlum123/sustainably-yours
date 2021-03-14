// Email Modal component with the modal itself, and button for opening modal
// Shows full email with sender name + email address, subject, message
// Shows form to reply to email, uses Google module to send email

import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import Google from "../Google";

class EmailModal extends React.Component {
  state = {
    modal: false,
    to: this.props.email,
    subject: "subject",
    message: "type your email here!",
  };

  // toggle modal
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  // when any form input changes, re-set its state to new value
  // so that we can submit the state values when we click submit button, calling onSubmitForm function
  handleChange = (event) => {
    let { name, value } = event.target;

    this.setState({ [name]: value });
  };

  // use Google module to send email
  onSubmitForm = (e) => {
    e.preventDefault();

    Google.sendEmail(this.state.to, this.state.subject, this.state.message);

    // close modal
    this.toggle();
  };

  render() {
    return (
      <>
        <i className="fas fa-envelope" onClick={this.toggle}></i>
        <Modal
          className="custom-modal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Contact Seller</ModalHeader>
          <ModalBody>
            <Form className="send-email-form">
              <FormGroup>
                <Label for="to">to:</Label>
                <Input
                  type="text"
                  name="to"
                  placeholder={this.state.to}
                  id="to"
                  onChange={this.handleChange}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="subject">subject:</Label>
                <Input
                  type="text"
                  name="subject"
                  placeholder={this.state.subject}
                  id="subject"
                  onChange={this.handleChange}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="message">email:</Label>
                <Input
                  type="textarea"
                  name="message"
                  placeholder={this.state.message}
                  id="message"
                  onChange={this.handleChange}
                ></Input>
              </FormGroup>
              <Button class="custom-btn" onClick={this.onSubmitForm}>
                send
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default EmailModal;
