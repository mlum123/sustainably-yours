// HomeCarousel component displays carousel of 3 images with text on home page
// shown if user is not logged in

import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const items = [
  {
    id: 1,
    src: "/img/francois-le-nguyen-unsplash.jpg",
    altText:
      "The average American throws away about 70 pounds of clothing each year.",
    caption:
      "The average American throws away about 70 pounds of clothing each year.",
  },
  {
    id: 2,
    src: "/img/clark-street-mercantile-unsplash.jpg",
    altText:
      "The fashion industry is responsible for 10% of global CO2 emissions each year.",
    caption:
      "The fashion industry is responsible for 10% of global CO2 emissions each year.",
  },
  {
    id: 3,
    src: "/img/marcin-jozwiak-unsplash.jpg",
    altText:
      "By 2050, the fashion industry will use up a quarter of the world’s carbon budget.",
    caption:
      "By 2050, the fashion industry will use up a quarter of the world’s carbon budget.",
  },
];

class HomeCarousel extends Component {
  state = {
    activeIndex: 0,
    animating: false,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  next = () => {
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;

    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;

    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = (newIndex) => {
    if (this.state.animating) return;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const slides = items.map((item) => {
      return (
        <CarouselItem key={item.id}>
          <img src={item.src} alt={item.altText} width="100%" />
          <CarouselCaption captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return !this.props.isAuthenticated ? (
      <Row>
        <Col xs="10">
          <Carousel
            activeIndex={this.state.activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators
              items={items}
              activeIndex={this.state.activeIndex}
              onClickHandler={this.goToIndex}
            />
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={this.previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={this.next}
            />
          </Carousel>
        </Col>
        <Col xs="2" style={{ textAlign: "right" }}>
          <h2>
            <span className="highlight">say no</span>
            <br></br> to <br></br>fast fashion
          </h2>
          <br></br>
          <h5>join our sustainable community today</h5>
        </Col>
      </Row>
    ) : (
      ""
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(HomeCarousel);
