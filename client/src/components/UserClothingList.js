// UserClothingList component displays user's closet with items user has put on sale
// shown if user is logged in
// includes remove item button to delete item from user's closet / Sustainably Yours
// includes ItemModal component with button and modal to add new item for sale

import React, { Component } from "react";
import {
  Container,
  CardGroup,
  Card,
  CardBody,
  CardImg,
  Badge,
  Button,
  Row,
  Col,
} from "reactstrap";
import ItemModal from "./ItemModal";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class UserClothingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    let { items } = this.props.item;

    // only get this current user's items
    if (this.props.isAuthenticated) {
      items = items.filter((item) => item.userId === this.props.auth.user.id);
    }

    return this.props.isAuthenticated ? (
      <Container>
        <Row>
          <Col xs="10">
            <h4>
              <strong>manage your closet</strong>
            </h4>
          </Col>
          <Col xs="2">
            <ItemModal />
          </Col>
        </Row>
        <h5>
          {items.length > 0 ? (
            <em>your items currently for sale:</em>
          ) : (
            <em>you have no items for sale</em>
          )}
        </h5>
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
                <Button
                  className="remove-btn"
                  size="sm"
                  onClick={this.onDeleteClick.bind(this, item._id)}
                >
                  remove
                </Button>
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

export default connect(mapStateToProps, { getItems, deleteItem })(
  UserClothingList
);
