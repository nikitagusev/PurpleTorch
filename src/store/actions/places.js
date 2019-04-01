import { ADD_PLACE, DELETE_PLACE, ADD_USER , SET_VENUES} from './actionTypes';

export const addPlace = (placeName) => {
    return {
        type: ADD_PLACE,
        placeName: placeName
    };
};


export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
export const addUser = (location) => {
	const latitude = location.location.latitude;
	const longitude = location.location.longitude;
	return dispatch => {
		const placeData = {
			name: 'nikita',
			gender: 'male',
			location: {
				latitude,
				longitude
			}
		}
		fetch("https://fir-project0-f4e17.firebaseio.com/rn_pre.json",{
			method: "POST",
			body: JSON.stringify(placeData)
		})
		.catch(err => console.log(err))
		.then(res => res.json())
		.then(parsedRes=>{
			console.log(parsedRes);
		});
	};
};
export const getVenues = () => {
    return dispatch => {
        fetch("https://fir-project0-f4e17.firebaseio.com/query.json")
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const places = [];
            for (let key in parsedRes) {
                places.push({
                    ...parsedRes[key],
                    key: key
                });
            }
            dispatch(setVenues(places));
        });
    };
};

export const setVenues = places => {
    return {
        type: SET_VENUES,
        venues: places
    };
};
// export const addUser = (location) => {
// 	return{
// 		type: ADD_USER,
// 		location: location
// 	};
// };

