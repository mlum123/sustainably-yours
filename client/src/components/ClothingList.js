import React, { Component } from "react";
import {
  Container,
  CardGroup,
  Card,
  CardBody,
  CardImg,
  Badge,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ClothingList extends Component {
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
    const { items } = this.props.item;
    return this.props.isAuthenticated ? (
      <Container>
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
                {item.shipping === true ? (
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
                <em>Contact: {item.userEmail}</em>
                <br></br>
                <em>
                  {item.userCity}, {item.userState}
                </em>
                <br></br>
                {this.props.auth.user.id === item.userId ? (
                  <Button
                    className="remove-btn"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, item._id)}
                  >
                    remove
                  </Button>
                ) : (
                  ""
                )}
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
