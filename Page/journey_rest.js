import React, { useState, useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
navigator.geolocation = require('react-native-geolocation-service');

import { CategoryContext } from '../context_api/myContext';

import Geolocation from 'react-native-geolocation-service';
import { _ } from "lodash";

import { API } from './axios';

export default function journey({ navigation }) {
    const Context = useContext(CategoryContext)
    const [MyPlaces, setMyPlaces] = useState({
        latitude: 13.728567,
        longitude: 100.774061,
        title: '',
        disLocation: '',
    })

    const [Destination, setDestination] = useState(
        Context.Destination
    )

    const [dataJourney, setDataJourney] = useState(Context.dataJourney)
    const [dataUserSetting, setDataUserSetting] = useState(Context.dataUserSetting)
    const [dataUser, setdataUser] = useState(Context.dataUser)

    const [distance, setDistance] = useState({
        start: 0,
        current: 0,
    })
    const [check, setCheck] = useState(false)
    const [State, setState] = useState({
        locationPredictions: [],
    })

    const [nearbyPlaces, setNearbyPlaces] = useState([])
    const [nearbyShow, setNearbyShow] = useState(true)

    const [api, setapi] = useState(false)

    const origin = { latitude: 37.3318456, longitude: -122.0296002 };
    const destination = { latitude: 37.771707, longitude: -122.4053769 };
    // const GOOGLE_MAPS_APIKEY = Context.GOOGLE_MAPS_APIKEY;

    const GOOGLE_MAPS_APIKEY = 'AIzaSyAaZ9OqZiu0Ap4yMwWI1qhGb-8xp71BYzU';


    useEffect(() => {
        Geolocation.getCurrentPosition((data) => {
            console.log("latitude", data.coords.latitude);
            console.log("longitude", data.coords.longitude);
            setMyPlaces({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
                title: 'My location',
                disLocation: '',
            })
        })
    }, []);

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
                API.post('/add_location', body = {
                    username: dataUser.Username,
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                })
                setapi(true)
            })
        }, (parseInt(dataUserSetting.up_min) * 60 + parseInt(dataUserSetting.up_sec)) * 1000)
        return () => clearInterval(intervalId); //This is important
    }, [api, setapi])



    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={{ width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('3%') }}>
                    <Image source={require('../assets/previous.png')} style={styles.iconhome} />
                </View>
            </TouchableOpacity>)
    }

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
            <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled={true} >
                <View style={styles.body}>
                    <View style={styles.content}>
                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{
                                width: '100%', backgroundColor: '#0E77BF', alignItems: 'center',
                                height: hp('70%'), borderRadius: 10, marginTop: hp('0.5%')
                            }}>
                                <Text style={[styles.Text, { fontSize: hp('2.25%'), marginTop: hp('1%') }]}>ตำแหน่งปัจจุบัน</Text>

                                <View style={{ height: hp('62%'), width: '100%', marginTop: hp('1%') }}>
                                    <MapView
                                        style={styles.map}
                                        provider={PROVIDER_GOOGLE}
                                        region={{
                                            latitude: MyPlaces.latitude,
                                            longitude: MyPlaces.longitude,
                                            latitudeDelta: 0.006,
                                            longitudeDelta: 0.006,
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

                                        /> */}
                                        <Marker
                                            coordinate={Destination}
                                            title={Destination.title}

                                        />

                                    </MapView>
                                </View>


                            </View>
                        </View>


                    </View>

                    <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            title="สิ้นสุดการเดินทาง"
                            buttonStyle={[styles.btreset, styles.Shadow, {}]}
                            onPress={() => { }}
                            titleStyle={styles.textbt}
                        />
                        <Button
                            title="เดินทางต่อ"
                            buttonStyle={[styles.btsave, styles.Shadow, { marginLeft: wp('12%') }]}
                            onPress={() => {
                                navigation.replace('Journey')
                            }}
                            titleStyle={styles.textbt}
                        />


                    </View>
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
        width: wp('90%'),
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
    btsave: {
        //alignSelf: 'center',
        backgroundColor: '#0E77BF',
        width: wp('29%'),
        height: hp('6%'),
        borderRadius: 15,
        marginTop: hp('2%')
    },
    btreset: {
        backgroundColor: '#EA2626',
        width: wp('29%'),
        height: hp('6%'),
        borderRadius: 15,
        marginTop: hp('2%')
    },
})