import React, { useState, useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Image, Icon, Header, Overlay } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';

//import {launchImageLibrary} from 'react-native-image-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { API } from './axios';

import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { CategoryContext } from '../context_api/myContext';

import RNBluetoothClassic, {
    BluetoothDevice
} from 'react-native-bluetooth-classic';

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




    useEffect(() => {

    }, [])



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
        if (select === 'distance') {
            distance = parseInt(input.distance)
            if (input.distance === '') {
                Alert.alert('ผิดพลาด', 'กรุณากรอกข้อมูล')
                return
            }
            if (distance > 450) {
                Alert.alert('ไม่ควรเดินทางติดต่อกันเกิน 450 กิโลเมตร', 'กรุณากรอกข้อมูลใหม่อีกครั้ง')
                return
            }
            if (distance < 30) {
                Alert.alert('ระยะทางสั้นกว่าที่กำหนด', 'กรุณากรอกข้อมูลใหม่อีกครั้ง')
                return
            }

        }
        else {
            time = (parseInt(input.rest_hour) * 60 + parseInt(input.rest_min))
            if (input.rest_hour === '' || input.rest_min === '') {
                Alert.alert('ผิดพลาด', 'กรุณากรอกข้อมูล')
                return
            }
            if (time > 270) {
                Alert.alert('ไม่ควรเดินทางติดต่อกันเกิน 4 ชั่วโมง 30 นาที', 'กรุณากรอกข้อมูลใหม่อีกครั้ง')
                return
            }
            if (time < 20) {
                Alert.alert('ระยะเวลาสั้นกว่าที่กำหนด', 'กรุณากรอกข้อมูลใหม่อีกครั้ง')
                return
            }
        }
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
                centerComponent={{ text: 'อุปกรณ์', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <ScrollView>
                <View style={styles.body}>
                    <View style={{ marginTop: hp('5%') }}>
                        <View style={styles.bgInput}>

                            <View style={{ marginBottom: hp('3%'), width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: hp('4%'), height: hp('4%'), marginRight : '2%' }}>
                                    <Image source={require('../assets/placeholder.png')} style={[styles.smallIcon, { resizeMode: 'cover' }]} />
                                </View>
                                <TextInput
                                    style={[styles.Input, { flex: 1 }]}
                                    value={{}}

                                    onChangeText={{}}
                                    placeholder="เลือกจุดหมาย"
                                />
                            </View>


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
                                    onChangeText={inputRest_HH}
                                //placeholder="Enter location.."
                                />

                                <Text style={[styles.textInput, { marginLeft: '2%', marginRight: '2%' }]}>:</Text>

                                <TextInput
                                    style={[styles.Input, { width: '20%', marginRight: ('5%') }]}
                                    value={input.rest_min}
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
    bgtext: {
        flexDirection: 'row',
        marginBottom: hp('3%'),
        backgroundColor: '#0E77BF',
        width: '100%',
        height: hp('4.5%'),
        borderRadius: 10,
        alignItems: 'center',
        // justifyContent: 'center',
        justifyContent: 'space-between',
        paddingRight: '5%',
        paddingLeft: '5%'
    },

    textshow: {
        fontSize: hp('2%'),
    },

    textedit: {
        color: '#000000BF',
        borderColor: '#0000007F',
        fontSize: hp('1.8%'),
        borderWidth: wp('0.2%'),
        padding: wp('1%')
    },

    smallIcon: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // width: hp('5%'),
        // height: hp('5%'),
        // borderWidth: 1,
        // marginLeft: wp('2%')
    },
    textInput: {
        paddingLeft: 5,
        color: '#fff',
        fontSize: hp('2.25%'),
        paddingBottom: 0,
    },
    textTopic: {
        color: '#000',
        fontSize: hp('2.5%'),
        marginLeft: 15,
        paddingBottom: 0,
    },
    textprofile: {
        color: '#0E77BF',
        fontSize: hp('2%'),
        marginTop: hp('0.2%'),
        alignSelf: 'center'
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
       //flexDirection: 'row',
       fontSize: hp('2.5%'),
       //paddingLeft: ('10%'),
       //marginBottom: hp('1.5%'),
       backgroundColor: '#0E77BF',
       width: '100%',
       height: hp('5%'),
       borderRadius: 10,
       alignItems: 'center',
       justifyContent: 'center',
       textAlign : 'center',
       textAlignVertical : 'center',
       paddingBottom : ('2.5%'),
       color : '#fff'


    },
    addimage: {
        height: '100%',
        width: '100%',
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
    overlay_body: {
        width: wp('80%'),
        padding: hp('0.7%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp('2.5%')
    },
    overlat_show: {
        width: '95%',
        marginTop: hp('2%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewRadio: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('3%')
    }

})