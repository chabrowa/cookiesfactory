import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Button, Row, Grid, Col, ListGroup, ListGroupItem} from 'react-bootstrap'
import './UserPanel.css'
import {getAdverts} from './store';

class UserPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {ads: []}
    props.dispatch(getAdverts()).then((ads) => {
      this.setState({ads})
    })
  }
  render() {
    const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};
    return (
      <div className="UserPanel">
        <Grid>
          <Row className="show-grid">
            <Col xs={3}>
              <div className="well">
                <svg style={{width: '100px'}} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path d="m 50.000002,960.36215 c -23.19596,0 -42,18.804 -42,41.99995 0,8.5923 2.60353,16.5643 7.03125,23.2189 8.24356,-10.1991 20.84289,-16.7188 34.96875,-16.7188 14.12586,0 26.75261,6.5197 34.999996,16.7188 4.42772,-6.6546 7,-14.6266 7,-23.2189 0,-23.19595 -18.804036,-41.99995 -41.999996,-41.99995 z m 0,7.5 c 10.45788,0 19,8.5421 19,19 0,10.45786 -8.54212,18.99995 -19,18.99995 -10.45788,0 -19,-8.54209 -19,-18.99995 0,-10.4579 8.54212,-19 19,-19 z m 0,6 c -7.21524,0 -13,5.7848 -13,13 0,7.2152 5.78476,12.99996 13,12.99996 7.21524,0 13,-5.78476 13,-12.99996 0,-7.2152 -5.78476,-13 -13,-13 z m 0,41.00005 c -12.79451,0 -24.07374,6.1558 -31.1875,15.6562 7.68624,8.5102 18.81713,13.8438 31.1875,13.8438 12.37889,0 23.5007,-5.3547 31.1875,-13.875 -7.11717,-9.4807 -18.40869,-15.625 -31.1875,-15.625 z" fill="#000" stroke="none"/></g></svg>
                <Link to="/createadvert">
                  <Button bsStyle="primary" bsSize="large" block>Add Advert</Button>
                </Link>
                <Button bsSize="large" block>Log Out</Button>
              </div>
            </Col>
            <Col xs={9}>
              <div className="well toTheLeft">
                <div>
                  <h4>My Adverts</h4>
                  <ListGroup>
                    {this.state.ads.map((a) => <ListGroupItem header={a.title} href="#">{a.description}</ListGroupItem>)}
                  </ListGroup>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect()(UserPanel);
