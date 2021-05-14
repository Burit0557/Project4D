import React, { useState, useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Image, Icon, Header, Overlay } from 'react-native-elements';
import { RadioButton, shadow } from 'react-native-paper';

import { API } from './axios';
import { CategoryContext } from '../context_api/myContext';


import Geolocation from 'react-native-geolocation-service';

export default function journey_home({ navigation }) {
    const Context = useContext(CategoryContext)

    const [dataUser, setdataUser] = useState(
        Context.dataUser
    )

    const [dataUserSetting, setDataUserSetting] = useState(Context.dataUserSetting)

    const [select, setSelect] = React.useState('distance');

    const [input, setInput] = useState({
        distance: dataUserSetting.distance,
        rest_hour: dataUserSetting.rest_hour,
        rest_min: dataUserSetting.rest_min,
    })

    const GOOGLE_MAPS_APIKEY = Context.GOOGLE_MAPS_APIKEY;


    const [InputText, setInputText] = useState('')
    const [Show, setShow] = useState(false)
    const [State, setState] = useState({
        locationPredictions: [],
    })
    const [Destination, setDestination] = useState({})
    const [MyPlaces, setMyPlaces] = useState({
        latitude: 13.728567,
        longitude: 100.774061,
        title: '',
        disLocation: '',
    })
    const [visible, setVisible] = useState(false);

    const onChangeDestination = async (destination) => {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAPS_APIKEY}&input={${destination}}&types=establishment`;
        const result = await fetch(apiUrl);
        const jsonResult = await result.json();
        setState({
            locationPredictions: jsonResult.predictions
        });
        console.log(jsonResult);
        // const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${MyPlaces.latitude},${MyPlaces.longitude}&radius=500&type=restaurant&keyword=${destination}&key=${GOOGLE_MAPS_APIKEY}`;
        // const result = await fetch(apiUrl);
        // const jsonResult = await result.json();
        // setState({
        //     locationPredictions: jsonResult.results
        // });
        // console.log(jsonResult);
    }

    const pressedPrediction = async (prediction) => {
        // const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=name,geometry,rating,formatted_phone_number&key=${GOOGLE_MAPS_APIKEY}`;
        // const result = await fetch(apiUrl);
        // const jsonResult = await result.json();
        // console.log(jsonResult.result);
        // setDestination({
        //     ...Destination,
        //     disLocation: jsonResult.result.name,
        //     latitude: jsonResult.result.geometry.location.lat,
        //     longitude: jsonResult.result.geometry.location.lng
        // })
        // setInput(jsonResult.result.name)
        // console.log('test', prediction.description)
        setInputText(prediction.description);
        setDestination(prediction)

        // setState({
        //     locationPredictions: [],
        // })
        setShow(false)
        // console.log(jsonResult);
    }



    useEffect(() => {
        Geolocation.getCurrentPosition((data) => {
            console.log("latitude", data.coords.latitude);
            console.log("longitude", data.coords.longitude);
            setMyPlaces({
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,
                title: 'My Places',
                disLocation: '',
            })
        })
    }, [])

    const toggleOverlaySearch = () => {
        setVisible(!visible);
    };

    const inputDistance = (text) => {
        var number = /^[0-9]+$/
        if (text.length === 0) {
            setInput({ ...input, distance: text })
        }
        else if (text.length > 0 && text.length < 4 && text.match(number)) {
            setInput({ ...input, distance: text })
        }

    }

    const inputRest_HH = (text) => {
        var number = /^[0-9]+$/
        if (text.length === 0) {
            setInput({ ...input, rest_hour: text })
        }
        else if (text.length > 0 && text.length < 2 && text.match(number)) {
            setInput({ ...input, rest_hour: text })
        }
    }

    const inputRest_MM = (text) => {
        var number = /^[0-5]{1}[0-9]+$/
        if (text.length < 2) {
            setInput({ ...input, rest_min: text })
        }
        else if (text.length > 1 && text.length < 3 && text.match(number)) {
            setInput({ ...input, rest_min: text })
        }
    }

    const start_bt = () => {
        let mode = 0
        let count = 0
        if (select === 'distance') {
            distance = parseInt(input.distance)
            mode = 0
            count = distance
            if (input.distance === '') {
                Alert.alert('ผิดพลาด', 'กรุณากรอกข้อมูล')
                return
            }
            if (distance > 450) {
                Alert.alert('ไม่ควรเดินทางติดต่อกันเกิน 450 กิโลเมตร', 'กรุณากรอกข้อมูลใหม่อีกครั้ง')
                return
            }
            if (distance < 30) {
                Alert.alert('ระยะทางสั้นกว่าที่กำหนด', 'ต้อง 30 กิโลเมตรขึ้นไป กรุณากรอกข้อมูลใหม่อีกครั้ง')
                return
            }
        }
        else {
            time = (parseInt(input.rest_hour) * 60 + parseInt(input.rest_min))
            mode = 1
            count = time
            if (input.rest_hour === '' || input.rest_min === '') {
                Alert.alert('ผิดพลาด', 'กรุณากรอกข้อมูล')
                return
            }
            if (time > 270) {
                Alert.alert('ไม่ควรเดินทางติดต่อกันเกิน 4 ชั่วโมง 30 นาที', 'กรุณากรอกข้อมูลใหม่อีกครั้ง')
                return
            }
            if (time < 20) {
                Alert.alert('ระยะเวลาสั้นกว่าที่กำหนด', 'ต้อง 20 นาทีขึ้นไป กรุณากรอกข้อมูลใหม่อีกครั้ง')
                return
            }
        }
        if (!Destination.description) {
            console.log('NO')
            return
        }
        let dataJourney = {
            mode: mode,
            count: count,
            Destination: Destination
        }
        console.log(dataJourney)
        Context.setDataJourney(dataJourney)
        //navigation.navigate('Journey')
        navigation.reset({
            index: 0,
            routes: [{
                name: "Journey"
            }]
        })
    }





    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <View style={{ width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('3%') }}>
                    <Image source={require('../assets/previous.png')} style={styles.smallIcon} />
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
            <ScrollView>
                <View style={styles.body}>
                    <View style={{ marginTop: hp('5%') }}>
                        <View style={styles.bgInput}>

                            <View style={{ marginBottom: hp('3%'), width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: hp('4%'), height: hp('4%'), marginRight: '2%' }}>
                                    <Image source={require('../assets/placeholder.png')} style={[styles.smallIcon, { resizeMode: 'cover' }]} />
                                </View>
                                {/* <TouchableOpacity onPress={() => toggleOverlaySearch()}>
                                    <View > */}

                                <TextInput
                                    style={[styles.Input, { flex: 1 }]}

                                    onChangeText={(text) => {
                                        if (Show) {
                                            setInputText(text);
                                            onChangeDestination(text);
                                        }
                                    }}
                                    placeholder="เลือกจุดหมาย"
                                    value={InputText}
                                    selection={Show ? null : { start: 0, end: 0 }}
                                    onFocus={() => { setShow(true) }}
                                // onBlur={() => {
                                //     // setState({
                                //     //     locationPredictions: [],
                                //     // })
                                //     setShow(false)
                                // }}
                                />

                                {/* </View>
                                </TouchableOpacity> */}
                                <TouchableOpacity onPress={() => {
                                    setInputText('')
                                    setShow(false)
                                    setState({
                                        locationPredictions: [],
                                    })
                                    setDestination({})
                                }}
                                    style={{ marginLeft: '2%' }} >
                                    <View style={{ width: hp('3%'), height: hp('3%'), marginLeft: '2%' }}>
                                        <Image source={require('../assets/delete.png')} style={[styles.smallIcon, { resizeMode: 'cover' }]} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {Show ?
                                <View style={{ width: '100%', borderColor: '#fff', borderWidth: 1 }}>
                                    {
                                        State.locationPredictions.map(prediction => {
                                            return (
                                                <TouchableOpacity
                                                    key={prediction.place_id}
                                                    onPress={() => pressedPrediction(prediction)}
                                                    style={{ borderColor: '#fff', borderWidth: 1 }}
                                                >
                                                    <Text style={styles.locationSuggestion}>
                                                        {prediction.description}
                                                        {/* {prediction.name} */}
                                                    </Text>
                                                </TouchableOpacity>)
                                        })
                                    }
                                </View>
                                :
                                <View></View>
                            }

                            <View style={[styles.viewRadio, { marginBottom: hp('1.5%') }]}>
                                <RadioButton
                                    value="distance"
                                    color="#fff"
                                    status={select === 'distance' ? 'checked' : 'unchecked'}
                                    onPress={() => setSelect('distance')}
                                />
                                <Text style={styles.textInput}>ระยะทางที่ต้องการให้แจ้งเตือน</Text>
                            </View>

                            <View style={[styles.viewRadio, { justifyContent: 'center', }]}>
                                <TextInput
                                    style={[styles.Input, { width: '30%', marginRight: ('5%') }]}
                                    value={input.distance}
                                    keyboardType={'number-pad'}
                                    onChangeText={inputDistance}
                                //placeholder="Enter location.."
                                />
                                <Text style={styles.textInput}>กิโลเมตร</Text>
                            </View>


                            <View style={[styles.viewRadio, { marginBottom: hp('1.5%') }]}>
                                <RadioButton
                                    color="#fff"
                                    value="time"
                                    status={select === 'time' ? 'checked' : 'unchecked'}
                                    onPress={() => setSelect('time')}
                                />
                                <Text style={styles.textInput}>ระยะเวลาที่ต้องการให้แจ้งเตือน</Text>
                            </View>

                            <View style={[styles.viewRadio, { justifyContent: 'center', }]}>
                                <TextInput
                                    style={[styles.Input, { width: '20%' }]}
                                    value={input.rest_hour}
                                    keyboardType='decimal-pad'
                                    onChangeText={inputRest_HH}
                                //placeholder="Enter location.."
                                />

                                <Text style={[styles.textInput, { marginLeft: '2%', marginRight: '2%' }]}>:</Text>

                                <TextInput
                                    style={[styles.Input, { width: '20%', marginRight: ('5%') }]}
                                    value={input.rest_min}
                                    keyboardType='decimal-pad'
                                    onChangeText={inputRest_MM}
                                //placeholder="Enter location.."
                                />
                                <Text style={styles.textInput}>ชั่วโมง : นาที</Text>
                            </View>

                        </View>

                        <Button
                            title="เริ่มเดินทาง"
                            buttonStyle={[styles.btstart, styles.Shadow, { marginTop: hp('6%') }]}
                            onPress={() => { start_bt() }}
                            titleStyle={{ fontSize: hp('2.25%') }}
                        />

                    </View>
                </View>

                <Overlay key={1} isVisible={visible} onBackdropPress={toggleOverlaySearch} overlayStyle={styles.overlay_head}>
                    <View style={{ width: wp('42%'), padding: hp('0.7%'), justifyContent: 'center' }}>

                        <TextInput
                            style={[styles.Input, { flex: 1 }]}

                            onChangeText={(text) => {
                                if (Show) {
                                    setInputText(text);
                                    onChangeDestination(text);
                                }
                            }}
                            placeholder="เลือกจุดหมาย"
                            value={InputText}
                            onFocus={() => { setShow(true) }}
                            onBlur={() => {
                                setState({
                                    locationPredictions: [],
                                })
                                setShow(false)
                            }}
                        />
                    </View>
                </Overlay>

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
    smallIcon: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        paddingLeft: 5,
        color: '#fff',
        fontSize: hp('2.25%'),
        paddingBottom: 0,
    },
    profile: {
        borderRadius: 100,
        height: '100%',
        width: '100%',
    },
    bgInput: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('80%'),
        paddingHorizontal: '4%',
        paddingVertical: '4%',
        borderRadius: 15,
        backgroundColor: '#014D81',
    },
    Input: {
        fontSize: hp('2.25%'),
        backgroundColor: '#0E77BF',
        width: '100%',
        height: hp('5%'),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingBottom: ('2.5%'),
        color: '#fff'
    },
    text: {
        color: '#12283D',
        fontSize: hp('2%'),
        paddingBottom: 0,
    },
    btstart: {
        alignSelf: 'center',
        backgroundColor: '#014D81',
        width: wp('29%'),
        height: hp('6%'),
        borderRadius: 15,
    },
    overlay_head: {
        borderRadius: 15,
    },
    viewRadio: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('3%')
    },
    locationSuggestion: {
        color: "#fff",
        padding: 5,
        fontSize: hp('2%')
    },

})