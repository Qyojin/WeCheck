import {
  SELECT_ACTIVE_PANEL, 
  SELECT_EVENT,
  SELECT_ACTIVE_PAGE
        } from '../constants/ActionTypes'
import {EVENT_PANEL} from '../constants/Names';


// Selectors(getters)
export const getActivePanel = (state) => {
  // console.log(JSON.stringify(state))
  return state.panels.activePanel;
}

export const getSelectedEventId = (state) => {
  return state.panels.selectedEventId;
}

export const getUserIdentity = (state) => {
  return state.panels.isOwner;
}

export const getActivePage = (state) => {
  return state.panels.selectedPage;
}

const initialState = {
    selectedPanel: "MESSAGE_BOX",
    activePanel: "MESSAGE_BOX",
    selectedEventId: "",
    isOwner: false,
    selectedPage: "SPLITTER"
};


// Reducers(setters)
const panels = (state = initialState, action) => {
  switch(action.type) {
    case SELECT_ACTIVE_PANEL:
      console.log("selected " + action.selectedPanel)
      return {
        ...state,
        selectedPanel: action.selectedPanel,
        activePanel: action.selectedPanel
      }
    case SELECT_EVENT:
      console.log(action.event.eventId + " was selected")
      return {
        ...state,
        selectedEventId: action.event.eventId,
        isOwner: action.event.isOwner,
        activePanel: EVENT_PANEL
      }
    case SELECT_ACTIVE_PAGE:
      return {
        ...state,
        selectedPage: action.selectedPage
      }
    default:
      return state;
  }
}

export default panels