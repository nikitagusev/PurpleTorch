import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";
import { connect } from "react-redux";

//import { addPlace } from "../../store/actions/index";
//import PlaceInput from "../../components/PlaceInput/PlaceInput";
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
//import PickImage from "../../components/PickImage/PickImage";
import Mapper from "../../components/Mapper/Mapper";
import validate from "../../utility/validation";

class MapViewScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  state = {
    controls: {
      placeName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true
        }
      }
    }
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  // placeNameChangedHandler = val => {
  //   this.setState(prevState => {
  //     return {
  //       controls: {
  //         ...prevState.controls,
  //         placeName: {
  //           ...prevState.controls.placeName,
  //           value: val,
  //           valid: validate(val, prevState.controls.placeName.validationRules),
  //           touched: true
  //         }
  //       }
  //     };
  //   });
  // };

  // placeAddedHandler = () => {
  //   if (this.state.controls.placeName.value.trim() !== "") {
  //     this.props.onAddPlace(this.state.controls.placeName.value);
  //   }
  // };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Map}>
        <Mapper />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"

  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  Map: {
    flex: 1,
    width: "100%",
    height: "100%"

  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});
export default MapViewScreen;
// const mapDispatchToProps = dispatch => {
//   return {
//     onAddPlace: placeName => dispatch(addPlace(placeName))
//   };
// };

//export default connect(null, mapDispatchToProps)(MapViewScreen);
