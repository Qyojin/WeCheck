import React from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col} from 'react-bootstrap'

import EventMemberPanel from '../event/EventMemberPanel'
import LeftContainer from '../splitter/LeftContainer'
import MidContainer from '../splitter/MidContainer'
import RightContainer from '../splitter/RightContainer'
import './style.css'

class App extends React.Component {

	render(){
		return (
      <Grid id="outerContainer">
        <Row id="topRow">
        </Row>

        <Row id="btmRow">
          <Col md={1} id="sideBar"></Col>
          <Col md={11} id="mainActivity">
            <Row id="mainActivityRow">
              <Col md={2} className="mainActivityCols"><LeftContainer /></Col>
              <Col md={7} className="mainActivityCols"><MidContainer /></Col>
              <Col md={3} className="mainActivityCols"><RightContainer /></Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
	}

  // render() {
  //   return (
  //     <Panel />
  //   );
  // }
  // <div id="outerContainer">
  //       <div id="topContainer">
  //       </div>
  //       <div id="btmContainer">
  //         <div id="sideBar" className="containers"></div>
  //         <div id="mainActivity" className="containers">
  //           <LeftContainer />
  //           <MidContainer />
  //           <RightContainer />  
  //         </div>
  //       </div>
  //     </div>
}

export default App
