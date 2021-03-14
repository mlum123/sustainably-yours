import React, { Component } from "react";
import {
  Container,
  CardGroup,
  Card,
  CardBody,
  CardImg,
  Badge,
  Form,
  Input,
  Row,
  Col,
  Button,
} from "reactstrap";
import TextModal from "./TextModal";
import EmailModal from "./EmailModal";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import Google from "../Google";

class ClothingList extends Component {
  state = {
    search: "",
    gender: "Gender",
    type: "Type",
    price: "Price",
    condition: "Condition",
    googleSignedIn: false,
  };

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    this.props.getItems();
    Google.handleClientLoad();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clearFilters = () => {
    this.setState({
      search: "",
      gender: "Gender",
      type: "Type",
      price: "Price",
      condition: "Condition",
    });
  };

  // Google sign in button click event handler
  onHandleGoogleAuthClick = () => {
    Google.handleAuthClick();
    this.setState({ googleSignedIn: Google.signedIn });
  };

  // Google sign out button click event handler
  // reset state contacts, emails, events to be empty
  onHandleGoogleSignoutClick = () => {
    Google.handleSignoutClick();
    this.setState({
      googleSignedIn: Google.signedIn,
    });
  };

  render() {
    // authButton and signOutButton use Google module to handle sign in and sign out clicks
    // only display authButton (sign in) if user isn't signed in yet
    // only display signOutButton if user is signed in with Google
    let googleAuthButton = (
      <Button
        color="light"
        className="custom-btn-2"
        onClick={this.onHandleGoogleAuthClick}
      >
        sign in with google to contact sellers
      </Button>
    );
    let googleSignOutButton = (
      <Button
        color="light"
        className="custom-btn-2"
        onClick={this.onHandleGoogleSignoutClick}
      >
        sign out
      </Button>
    );

    let { items } = this.props.item;

    // only get items that don't belong to current user
    if (this.props.isAuthenticated) {
      items = items.filter((item) => item.userId !== this.props.auth.user.id);
    }

    // filter by search term, gender, type, price, condition, etc.
    items =
      this.state.search !== ""
        ? items.filter((item) =>
            item.name.toLowerCase().includes(this.state.search.toLowerCase())
          )
        : items;

    items =
      this.state.gender !== "Gender"
        ? items.filter((item) => item.gender === this.state.gender)
        : items;

    items =
      this.state.type !== "Type"
        ? items.filter((item) => item.type === this.state.type)
        : items;

    items =
      this.state.price !== "Price"
        ? items.filter((item) => {
            let itemPrice = parseInt(item.price.substring(1));
            if (this.state.price === "Under $10") {
              return itemPrice < 10;
            } else if (this.state.price === "Under $20") {
              return itemPrice < 20;
            }
            return itemPrice < 30;
          })
        : items;

    items =
      this.state.condition !== "Condition"
        ? items.filter((item) => item.condition === this.state.condition)
        : items;

    return this.props.isAuthenticated ? (
      <Container>
        <h4>
          <strong>check out what's on sale!</strong>
        </h4>
        <Row style={{ marginLeft: 0, marginRight: "1rem" }}>
          <Input
            type="text"
            name="search"
            id="search"
            onChange={this.onChange}
            placeholder="search..."
          />
        </Row>
        <br></br>
        <Form>
          <Row style={{ marginRight: 0 }}>
            <Col xs="3">
              <h5>filter by...</h5>
            </Col>
            <Col xs="2">
              <Input
                type="select"
                name="gender"
                id="gender"
                onChange={this.onChange}
              >
                <option>Gender</option>
                <option>Women</option>
                <option>Men</option>
                <option>Unisex</option>
              </Input>
            </Col>
            <Col xs="2">
              <Input
                type="select"
                name="type"
                id="type"
                onChange={this.onChange}
              >
                <option>Type</option>
                <option>Dresses</option>
                <option>Tops</option>
                <option>Blouses</option>
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
            </Col>
            <Col xs="2">
              <Input
                type="select"
                name="price"
                id="price"
                onChange={this.onChange}
              >
                <option>Price</option>
                <option>Under $10</option>
                <option>Under $20</option>
                <option>Under $30</option>
              </Input>
            </Col>
            <Col xs="2">
              <Input
                type="select"
                name="condition"
                id="condition"
                onChange={this.onChange}
              >
                <option>Condition</option>
                <option>Never Worn</option>
                <option>Like New </option>
                <option>Good </option>
                <option>Slight Wear </option>
                <option>Very Worn </option>
              </Input>
            </Col>
            <Col xs="1">
              <Button onClick={this.clearFilters} className="custom-btn">
                clear
              </Button>
            </Col>
          </Row>
        </Form>
        <br></br>
        <Row>
          <Col>
            {!this.state.googleSignedIn ? googleAuthButton : null}
            {this.state.googleSignedIn ? googleSignOutButton : null}
          </Col>
        </Row>
        <CardGroup className="card-group">
          {items.map((item) => (
            <Card key={item._id} className="card">
              <CardImg src={item.image} className="card-img"></CardImg>
              <CardBody>
                <strong>
                  {item.brand} {item.name} | {item.price}
                </strong>
                <br></br>
                <Badge color="info">{item.condition}</Badge>{" "}
                {item.shipping === true ? (
                  <Badge color="warning">Shipping</Badge>
                ) : (
                  ""
                )}{" "}
                {item.pickup === true ? (
                  <Badge color="warning">Pick Up</Badge>
                ) : (
                  ""
                )}{" "}
                <br></br>
                <br></br>
                <em>Original Price: {item.origPrice}</em>
                <br></br>
                <em>Seller's Note: {item.notes}</em>
                <br></br>
                <em>
                  <TextModal phone={item.userPhone} /> (
                  {item.userPhone.substring(0, 3)}){" "}
                  {item.userPhone.substring(3, 6)}-{item.userPhone.substring(6)}{" "}
                </em>
                <br></br>
                <em>
                  <EmailModal email={item.userEmail} /> {item.userEmail}
                </em>
                <br></br>
                <em>
                  {item.userCity}, {item.userState}
                </em>
                <br></br>
              </CardBody>
            </Card>
          ))}
        </CardGroup>
      </Container>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ClothingList);
