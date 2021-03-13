import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
    type: "Dresses",
    price: "",
    condition: "Never Worn",
    origPrice: "",
    brand: "",
    shipping: false,
    pickup: false,
    notes: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      type: this.state.type,
      price: this.state.price,
      condition: this.state.condition,
      origPrice: this.state.origPrice,
      brand: this.state.brand,
      shipping: this.state.shipping === "Yes",
      pickup: this.state.pickup === "Yes",
      notes: this.state.notes,
      userId: this.props.auth.user.id,
      userName: this.props.auth.user.name,
      userEmail: this.props.auth.user.email,
      userPhone: this.props.auth.user.phone,
      userCity: this.props.auth.user.city,
      userState: this.props.auth.user.state,
    };

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          ""
        )}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="custom-modal"
        >
          <ModalHeader toggle={this.toggle}>Add Item for Sale</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Item name"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  onChange={this.onChange}
                >
                  <option>Dresses</option>
                  <option>Tops</option>
                  <option>Shirts and Blouses</option>
                  <option>Pants</option>
                  <option>Jeans</option>
                  <option>Cardigans and Sweaters</option>
                  <option>Hoodies and Sweatshirts</option>
                  <option>Blazers</option>
                  <option>Jackets and Coats</option>
                  <option>Shoes</option>
                  <option>Sportswear</option>
                  <option>Jumpsuits and Rompers</option>
                  <option>Skirts</option>
                  <option>Shorts</option>
                  <option>Accessories</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Your selling price"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="condition">Condition</Label>
                <Input
                  type="select"
                  name="condition"
                  id="condition"
                  onChange={this.onChange}
                >
                  <option>Never Worn</option>
                  <option>Like New </option>
                  <option>Good </option>
                  <option>Slight Wear </option>
                  <option>Very Worn </option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="origPrice">Original Price</Label>
                <Input
                  type="text"
                  name="origPrice"
                  id="origPrice"
                  placeholder="Original price"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="brand">Brand</Label>
                <Input
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="Brand name"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="shipping">Shipping</Label>
                <Input
                  type="select"
                  name="shipping"
                  id="shipping"
                  onChange={this.onChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="pickup">Pick Up</Label>
                <Input
                  type="select"
                  name="pickup"
                  id="pickup"
                  onChange={this.onChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="notes">Notes</Label>
                <Input
                  type="text"
                  name="notes"
                  id="notes"
                  placeholder="Add notes (ex: shipping fee, etc.)"
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button
                style={{ marginTop: "2rem" }}
                block
                className="custom-btn"
              >
                Add Item
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
