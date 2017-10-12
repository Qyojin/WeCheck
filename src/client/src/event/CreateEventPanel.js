import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import TextField from 'material-ui/TextField';
import {orange500, blue500, indigo900, black, orange800} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './CreateEventPanel.css';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 3,
  },


  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: black,
  },
  
  underlineFocusStyle: {
    borderColor: indigo900,
  },
  floatingLabelStyle2: {
    color: orange800,
  },
  floatingLabelStyle: {
    color: indigo900,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  },

  labelStyle: {
    width: 230   
  },

  buttonStyle: {    
    margin: 6
  }

};

class CreateEventPanel extends React.Component {
  state = {
    checked: false,
  }

  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  render() {
    return ( 

      
      
      <div>
        <h1>CREATE PAGE</h1>
        <h2>Start a New Event</h2>
        
        <TextField  
            hintText="Event Name"
            hintStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
        />
        <br />
        <TextField  
            hintText="Event Type"
            hintStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
        />
        <br />
        <TextField  
            hintText="Event Time"
            hintStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
        />
        <br />
        <TextField  
            hintText="Event Location"
            hintStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
        />
        <br />
        <TextField  
            hintText="Split Type"
            hintStyle={styles.floatingLabelStyle}
            underlineStyle={styles.underlineStyle}
        /><br />
        <br />
      

        Select Group Members: 

        

        <div style={styles.block}>
        
          <Checkbox
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            label="Izzy (luo123@purdue.edu)"
            style={styles.checkbox}
          />

          <Checkbox
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            label="Josh (zhou123@purdue.edu)"
            style={styles.checkbox}
          />

          <Checkbox
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            label="Xiaohua (shi249@purdue.edu)"
            style={styles.checkbox}
          />

          <Checkbox
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            label="Dongji (cui123@purdue.edu)"
            style={styles.checkbox}
          />

          <Checkbox
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            label="Moonsun (hwang123@purdue.edu)"
            style={styles.checkbox}
            
          />

        </div>


        <TextField  
            hintText="Type an email address to add"
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            floatingLabelText="Add a new person"
            floatingLabelStyle={styles.floatingLabelStyle2}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        /><br />
        <br />
        
        <FlatButton 
          label="+Add a person to the list"
          style = {styles.labelStyle}

         />
        
        <RaisedButton label="Cancel" style={styles.buttonStyle} />
        <RaisedButton label="Create" style={styles.buttonStyle} />
        
         
       </div>




      
    );
  }
}

export default CreateEventPanel;