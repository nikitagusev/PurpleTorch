import {
  ADD_PLACE,
  DELETE_PLACE,
  ADD_USER,
  SET_VENUES
} from "../actions/actionTypes";

const initialState = {
  places: [],
  user: null,
  venues: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
          name: action.placeName,
          image: {
            uri:
              "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
          }
        })
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.placeKey;
        })
      };
    case ADD_USER:
      return {
        ...state,
        user: {
          name: 'nikita',
          gender: 'male',
          location: {
            latitude: action.location.location.latitude,
            longitude: action.location.location.longitude
          }

        }
      };
    case SET_VENUES:
      return {
        ...state,
        venues: action.venues
      };

    default:
      return state;
  }
};

export default reducer;
