import { connect } from 'react-redux';

import * as appSelectors from '../app/appReducer';

import EventMemberPanel from './EventMemberPanel';

const mapStateToProps = (state) => ({
  isCreator: appSelectors.getUserIdentity(state)
});

const EventPanelContainer = connect(
  mapStateToProps
)(EventMemberPanel);

export default EventPanelContainer;