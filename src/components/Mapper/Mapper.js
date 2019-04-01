import React, { Component } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions
} from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { addUser } from "../../store/actions/index";
import { getVenues } from "../../store/actions/index";

class Mapper extends Component {
  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
    },
    userLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
      },
    locationChosen: false,
    userLocationSet: false
  };
 constructor(props) {
    super(props);
  }

  viewLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
  };


  userLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.setState(prevState => {
      return {
        userLocation: {
          ...prevState.userLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        userLocationSet: true
      };
    });
    this.props.onAddUser({
      location: this.state.userLocation
    });
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.viewLocationHandler(coordsEvent);
      this.userLocationHandler(coordsEvent);
    },
    err => {
      console.log(err);
      alert("Fetching the Position failed, please pick one manually!");
    })
  }

  componentDidMount() {
    //this.props.onGetVenues();
    this.timer = setInterval(()=> {
        navigator.geolocation.getCurrentPosition(pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        };
        this.userLocationHandler(coordsEvent);
        this.props.onGetVenues();
      },
      err => {
        console.log(err);
        alert("Fetching the Position failed, please pick one manually!");
      })
    },5000)

  }


  render() {
    let marker = [];

    if (this.props.venues && this.props.venues.length > 1) {

      
      for(let key in this.props.venues){
        console.log('making markers')
        marker.push(
          <MapView.Marker 
          coordinate={{latitude: this.props.venues[key].lat,longitude:this.props.venues[key].long}} 
          key={this.props.venues[key].key} 
          title={this.props.venues[key].name}
          //description={(queryPlace.people+queryPlace.average_age).toString()} 
          description={(this.props.venues[key].avg_age).toString()} 
          calloutAnchor={{x: 0.5,y: 1}}
          // opacity={0.0}
          flat={false}/>

        )
        
      }
      
      //marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.viewLocationHandler}
          ref={ref => this.map = ref}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={() => alert("Pick Location!")} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: "100%"
  },
  button: {
    margin: 8
  }
});

const mapStateToProps = state => {
  return {
    venues: state.places.venues
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetVenues: () => dispatch(getVenues()),
    onAddUser: location => dispatch(addUser(location))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mapper);
//export default Mapper;
