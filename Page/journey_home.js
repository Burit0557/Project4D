import React, { useState, useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Image, Icon, Header, Overlay } from 'react-native-elements';

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








    useEffect(() => {

    }, [])







    


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
                        <Text style={styles.textTopic}>การเชื่อมต่อ</Text>
                        <View style={styles.bgInput}>
                            <View style={{ width: '100%' }}>
                                <Text style={styles.textInput}>Bluetooth</Text>
                                <TouchableOpacity onPress={() => {
                                    toggleOverlaybluetooth()
                                    setInput({
                                        ...input,
                                        bluetooth_name: dataUserSetting.bluetooth_name
                                    })
                                }} >
                                    <View style={styles.bgtext}>
                                        <Text style={styles.textshow}>{dataUserSetting.bluetooth_name}</Text>
                                        <Text style={styles.textedit}>เลือก</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                    <View style={{ marginTop: hp('5%') }}>
                        <Text style={styles.textTopic}>การใช้งาน</Text>
                        <View style={styles.bgInput}>
                            <View style={{ width: '100%' }}>
                                <Text style={styles.textInput}>กำหนดขนาดดวงตา</Text>
                                <TouchableOpacity onPress={() => {
                                    toggleOverlayEditEAR()
                                    setInput({
                                        ...input,
                                        EAR: dataUserSetting.EAR
                                    })
                                }} >
                                    <View style={styles.bgtext}>
                                        <Text style={styles.textshow}>{dataUserSetting.EAR}</Text>
                                        <Text style={styles.textedit}>แก้ไข</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '100%' }}>
                                <Text style={styles.textInput}>ตั้งค่าแจ้งเตือนการพัก (ระยะทาง)</Text>
                                <TouchableOpacity onPress={() => {
                                    toggleOverlayEditRestDis()
                                    setInput({
                                        ...input,
                                        distance: dataUserSetting.distance
                                    })
                                }} >
                                    <View style={styles.bgtext}>
                                        <Text style={styles.textshow}>{dataUserSetting.distance + ' กิโลเมตร'}</Text>
                                        <Text style={styles.textedit}>แก้ไข</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '100%' }}>
                                <Text style={styles.textInput}>ตั้งค่าแจ้งเตือนการพัก (เวลา)</Text>
                                <TouchableOpacity onPress={() => {
                                    toggleOverlayEditRestTime()
                                    setInput({
                                        ...input,
                                        rest_hour: dataUserSetting.rest_hour,
                                        rest_min: dataUserSetting.rest_min
                                    })
                                }} >
                                    <View style={styles.bgtext}>
                                        <Text style={styles.textshow}>{dataUserSetting.rest_hour + ' : ' + dataUserSetting.rest_min + '  ชั่วโมง : นาที'}</Text>
                                        <Text style={styles.textedit}>แก้ไข</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '100%' }}>
                                <Text style={styles.textInput}>กำหนดเวลาอัพเดตตำแหน่ง</Text>
                                <TouchableOpacity onPress={() => {
                                    toggleOverlayEditUpLocation()
                                    setInput({
                                        ...input,
                                        up_min: dataUserSetting.up_min,
                                        up_sec: dataUserSetting.up_sec
                                    })
                                }} >
                                    <View style={[styles.bgtext, { marginBottom: 0 }]}>
                                        <Text style={styles.textshow}>{dataUserSetting.up_min + ' : ' + dataUserSetting.up_sec + '  นาที : วินาที'}</Text>
                                        <Text style={styles.textedit}>แก้ไข</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
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
        fontSize: hp('2%'),
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
        flexDirection: 'row',
        fontSize: hp('2%'),
        paddingLeft: ('5%'),
        //marginBottom: hp('1.5%'),
        backgroundColor: '#0E77BF',
        width: '100%',
        height: hp('5%'),
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',


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
    btsave: {
        //alignSelf: 'center',
        backgroundColor: '#49BB21',
        width: wp('29%'),
        height: hp('5%'),
        borderRadius: 15,
        marginTop: hp('6%')
    },
    btreset: {
        backgroundColor: '#EA2626',
        width: wp('29%'),
        height: hp('5%'),
        borderRadius: 15,
        marginTop: hp('6%')
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

})