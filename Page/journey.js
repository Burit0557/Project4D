import React, { useState, useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
navigator.geolocation = require('react-native-geolocation-service');

import { Platform, PermissionsAndroid } from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import { _ } from "lodash";

import { instance } from '../Server/axios';

async function requestPermissions() {
    if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
            skipPermissionRequests: false,
            authorizationLevel: 'whenInUse',
        });
    }

    if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
    }

}


export default function journey({ navigation }) {
    const [MyPlaces, setMyPlaces] = useState({
        latitude: 13.728567,
        longitude: 100.774061,
        title: '',
        disLocation: '',
    })

    const [Destination, setDestination] = useState({
        latitude: 13.728567,
        longitude: 100.774061,
        title: '',
        disLocation: '',
    })

    const [Input, setInput] = useState('')
    const [Show, setShow] = useState(false)
    const [State, setState] = useState({
        locationPredictions: [],
    })
    const [api, setapi] = useState(false)

    const origin = { latitude: 37.3318456, longitude: -122.0296002 };
    const destination = { latitude: 37.771707, longitude: -122.4053769 };
    const GOOGLE_MAPS_APIKEY = 'AIzaSyAaZ9OqZiu0Ap4yMwWI1qhGb-8xp71BYzU';

    const goSetting = () => {
        navigation.navigate('Family-Setting')
    }

    useEffect(() => {
        requestPermissions()
        Geolocation.getCurrentPosition((data) => {
            console.log("latitude", data.coords.latitude);
            console.log("longitude", data.coords.longitude);
            setMyPlaces({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
                title: 'My Places',
                disLocation: '',
            })
            setDestination({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
                title: '',
                disLocation: '',
            })
        })
    }, ([]));

    useEffect(() => {
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            Geolocation.getCurrentPosition((data) => {
                console.log("latitude", data.coords.latitude);
                console.log("longitude", data.coords.longitude);
                setMyPlaces({
                    ...MyPlaces,
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                    title: 'My Places',
                })
            })
        }, 10000)
        return () => clearInterval(intervalId); //This is important

    }, [MyPlaces, setMyPlaces])

    useEffect(() => {
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            Geolocation.getCurrentPosition((data) => {
                console.log("Call API")
                instance.post('/add_location', body = {
                    username: 'suhaimee24',
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                })
                setapi(true)
            })
        }, 30000)
        return () => clearInterval(intervalId); //This is important
    }, [api, setapi])

    // const onChangeDestinationDebounced = (text) => {
    //     // const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
    //     //     onChangeDestination(text)
    //     // }, 1000)

    //     const debounce = _.debounce(onChangeDestination, 1000);
    // };

    // this.onChangeDestinationDebounced = _.debounce(
    //     this.onChangeDestination,
    //     1000
    // );


    const onChangeDestination = async (destination) => {

        // const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAPS_APIKEY}&input={${destination}}&types=establishment&location=${MyPlaces.latitude},${MyPlaces.longitude}&radius=1000`;
        // const result = await fetch(apiUrl);
        // const jsonResult = await result.json();
        // setState({
        //     locationPredictions: jsonResult.predictions
        // });
        // console.log(jsonResult);

        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${MyPlaces.latitude},${MyPlaces.longitude}&radius=500&type=restaurant&keyword=${destination}&key=${GOOGLE_MAPS_APIKEY}`;
        const result = await fetch(apiUrl);
        const jsonResult = await result.json();
        setState({
            locationPredictions: jsonResult.results
        });
        console.log(jsonResult);
    }

    const pressedPrediction = async (prediction) => {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=name,geometry,rating,formatted_phone_number&key=${GOOGLE_MAPS_APIKEY}`;
        const result = await fetch(apiUrl);
        const jsonResult = await result.json();
        console.log(jsonResult.result);
        setDestination({
            ...Destination,
            disLocation: jsonResult.result.name,
            latitude: jsonResult.result.geometry.location.lat,
            longitude: jsonResult.result.geometry.location.lng
        })
        setInput(jsonResult.result.name)
        setState({
            locationPredictions: [],
        })
        // console.log(jsonResult);
    }

    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <View style={{ width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('3%') }}>
                    <Image source={require('../assets/previous.png')} style={styles.iconhome} />
                </View>
            </TouchableOpacity>)
    }

    locationPredictions = () => {
        State.locationPredictions.map(prediction => {
            return (
                <TouchableOpacity
                    key={prediction.id}
                // onPress={() => this.pressedPrediction(prediction)}
                >
                    <Text style={styles.locationSuggestion}>
                        {prediction.description}
                    </Text>
                </TouchableOpacity>)
        })
    };

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'เดินทางไกล', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.body}>
                    <View style={styles.content}>
                        <View style={{ marginTop: hp('2%') }}>
                            {/* <GooglePlacesAutocomplete
                                currentLocation={true}
                                currentLocationLabel='Current location'
                                placeholder='Search'
                                fetchDetails={true}
                                onPress={(data, details = null) => {
                                    // 'details' is provided when fetchDetails = true
                                    console.log("DATA", data);
                                    console.log("details", details.name + ", " + details.formatted_address);
                                    if (data && details) {
                                        setDestination({
                                            ...Destination,
                                            disLocation: data.description ? data.description : details.name + ", " + details.formatted_address,
                                            latitude: details.geometry.location.lat ? details.geometry.location.lat : data.geometry.location.lat,
                                            longitude: details.geometry.location.lng ? details.geometry.location.lng : data.geometry.location.lng
                                        })
                                    }
                                }}
                                autoFocus={false}
                                getDefaultValue={() => ''}
                                query={{
                                    key: GOOGLE_MAPS_APIKEY,
                                    language: 'th',
                                    components: 'country:th',
                                    // type: 'restaurant',
                                    types: ["restaurant", "cafe", "parking"]

                                }}
                                // nearbyPlacesAPI='GoogleReverseGeocoding'
                                GooglePlacesSearchQuery={{
                                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                    rankby: 'distance',
                                    // types: ['restaurant', 'cafe', 'parking']
                                    type: 'restaurant',
                                }}
                                //GooglePlacesDetailsQuery={{ fields: 'formatted_address' }}
                                GooglePlacesDetailsQuery={{
                                    fields: ['geometry', 'formatted_address']
                                }}

                                // numberOfLines={3}
                                onFail={error => console.log('error' + error)}
                                textInputProps={{ onBlur: () => { } }}

                                debounce={300} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                            /> */}
                            <TextInput
                                placeholder="Enter location.."
                                style={styles.destinationInput}
                                onChangeText={(text) => {
                                    if (Show) {
                                        setInput(text);
                                        // onChangeDestinationDebounced(text);
                                        onChangeDestination(text);
                                    }
                                }}
                                value={Input}
                                onFocus={() => { setShow(true) }}
                                onBlur={() => {
                                    setState({
                                        locationPredictions: [],
                                    })
                                    setShow(false)
                                }}
                            />
                            {
                                State.locationPredictions.map(prediction => {
                                    return (
                                        <TouchableOpacity
                                            key={prediction.place_id}
                                            onPress={() => pressedPrediction(prediction)}
                                        >
                                            <Text style={styles.locationSuggestion}>
                                                {/* {prediction.description} */}
                                                {prediction.name}
                                            </Text>
                                        </TouchableOpacity>)
                                })
                            }

                        </View>
                        <View style={{ height: hp('50%'), width: '100%', alignSelf: 'center', marginTop: hp('2%') }}>
                            <MapView
                                style={styles.map}
                                provider={PROVIDER_GOOGLE}
                                region={{
                                    latitude: MyPlaces.latitude,
                                    longitude: MyPlaces.longitude,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005,
                                }}
                                showsUserLocation={true}
                            >
                                <MapViewDirections
                                    origin={{ latitude: MyPlaces.latitude, longitude: MyPlaces.longitude }}
                                    destination={{ latitude: Destination.latitude, longitude: Destination.longitude }}
                                    apikey={GOOGLE_MAPS_APIKEY}
                                    strokeWidth={3}
                                    strokeColor="hotpink"
                                    optimizeWaypoints={true}
                                    // precision="high"
                                    onReady={result => {
                                        console.log(`Distance: ${result.distance} km`)
                                        console.log(`Duration: ${result.duration} min.`)
                                    }}
                                />
                                {/* <Marker
                                    coordinate={{ latitude: MyPlaces.latitude, longitude: MyPlaces.longitude }}
                                    title={MyPlaces.title}
                                // description={marker.description}
                                /> */}
                                <Marker
                                    coordinate={Destination}
                                    title={Destination.title}
                                    description={Destination.description}
                                />



                            </MapView>
                        </View>


                    </View>
                    <Button
                        title="Current Position"
                        buttonStyle={[styles.btnLogin, styles.Shadow, { marginTop: hp('2%'), width: wp('25%') }]}
                        onPress={() => {
                            Geolocation.getCurrentPosition((data) => {
                                console.log("data", data);
                                console.log("latitude", data.coords.latitude);
                                console.log("longitude", data.coords.longitude);
                                setMyPlaces({
                                    latitude: data.coords.latitude,
                                    longitude: data.coords.longitude,
                                    title: 'My Places',
                                })
                            })
                        }}
                        titleStyle={{ fontSize: hp('2%') }}
                    />
                </View>
                <View style={{ height: hp('10%') }}>

                </View>
            </ScrollView>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: hp('10%'),
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff0000',
    },
    body: {
        // height: hp('90%'),
        width: wp('100%'),
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#00ff00',
        fontSize: hp('50%')
    },
    content: {
        width: wp('80%'),
    },
    listRow: {
        flexDirection: 'row',
        marginTop: hp('2%'),
    },
    Shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    item: {
        width: wp('35%'),
        height: wp('35%'),
        backgroundColor: '#0E77BF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: '5%',
    },
    Text: {
        margin: '1%',
        color: '#ffff',
        fontSize: hp('2%')
    },
    select: {
        flexDirection: 'row',
        width: '100%',
        height: hp('6%'),
        backgroundColor: '#0E77BF',
        justifyContent: 'flex-start',
        alignItems: "center",
        paddingStart: '5%',
        marginBottom: 3,

    },
    box: {
        backgroundColor: '#014D81',
        marginTop: hp('2%'),
        borderRadius: 10,
        paddingBottom: 10,
    },
    iconhome: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icondown: {
        width: '100%',
        height: '100%',
    },
    btnLogin: {
        alignSelf: 'center',
        backgroundColor: '#014D81',
        height: hp('5%'),
        borderRadius: 10,
    },
    destinationInput: {
        borderWidth: 0.5,
        borderColor: "grey",
        height: 40,
        // marginTop: 50,
        marginLeft: 5,
        marginRight: 5,
        padding: 5,
        backgroundColor: "white"
    },
    locationSuggestion: {
        backgroundColor: "white",
        padding: 5,
        fontSize: hp('2%')
    },
})