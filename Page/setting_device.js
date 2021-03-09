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


data = [
    {
        time: 1,
        name: 'bluetooth123'
    },
    {
        time: 2,
        name: 'bluetooth1445'
    },
    {
        time: 3,
        name: 'bluetooth123778'
    },
    {
        time: 4,
        name: 'bluetooth12345'
    },
    {
        time: 5,
        name: 'bluetooth12300'
    },
    {
        time: 6,
        name: 'bluetooth12378'
    },
]


export default function setting_device({ navigation }) {
    const Context = useContext(CategoryContext)

    const [dataUser, setdataUser] = useState(
        Context.dataUser
    )

    const [input, setInput] = useState({
        bluetooth_name: '',
        EAR: '',
        distance: '',
        rest_hour: '',
        rest_min: '',
        up_min: '',
        up_sec: '',
    })

    const [defaultSetting, setdefaultSetting] = useState({
        bluetooth_name: 'raspberrypi',
        EAR: "0.275",
        distance: "160",
        rest_hour: '2',
        rest_min: '00',
        up_min: '00',
        up_sec: '30',
    })

    const [dataUserSetting, setDataUserSetting] = useState(Context.dataUserSetting)

    const [visible, setVisible] = useState({
        bluetooth: false,
        editEAR: false,
        editRestDis: false,
        editRestTime: false,
        editUpLocation: false,
    });

    const [bluetooth, setBluetooth] = useState(data)






    useEffect(() => {

    }, [])

    const toggleOverlaybluetooth = () => {
        setVisible({
            ...visible,
            bluetooth: !visible.bluetooth
        });

    };

    const toggleOverlayEditEAR = () => {
        setVisible({
            ...visible,
            editEAR: !visible.editEAR
        });
    };

    const toggleOverlayEditRestDis = () => {
        setVisible({
            ...visible,
            editRestDis: !visible.editRestDis
        });
    };

    const toggleOverlayEditRestTime = () => {
        setVisible({
            ...visible,
            editRestTime: !visible.editRestTime
        });
    };

    const toggleOverlayEditUpLocation = () => {
        setVisible({
            ...visible,
            editUpLocation: !visible.editUpLocation
        });
    };





    const checkInput = (text) => {
        var letters = /^[0-9a-zA-Z]+$/
        if (text == null) {
            return false
        }
        else if (text.length == 1 && text.match(letters)) {
            return true
        }
        else {
            return false
        }

    }
    saveBluetooth = (name) => {
        setDataUserSetting({
            ...dataUserSetting,
            bluetooth_name: name,
        })
        Context.setBluetooth(name)
        Context.updateUserSetting()
        toggleOverlaybluetooth()
    }

    saveEAR = () => {
        console.log(typeof input.EAR)
        var letters = /^[0-1]{1}.[0-9]{3}$/
        if (input.EAR.match(letters)) {
            if (parseFloat(input.EAR) < 1) {
                console.log("pass")
                setDataUserSetting({
                    ...dataUserSetting,
                    EAR: input.EAR
                })
                Context.setEAR(input.EAR)
                Context.updateUserSetting()
                toggleOverlayEditEAR()
            }
            else {
                console.log("more than");
            }

        }
        else {
            console.log("miss")
        }
    }

    saveRest_dis = () => {
        if (parseInt(input.distance) <= 450 && parseInt(input.distance) >= 30) {
            console.log("pass")
            setDataUserSetting({
                ...dataUserSetting,
                distance: input.distance
            })
            Context.setRest_dis(input.distance)
            Context.updateUserSetting()
            toggleOverlayEditRestDis()
        }
        else {
            console.log("miss")
        }
    }

    saveRest_time = () => {
        if ((parseInt(input.rest_hour) * 60 + parseInt(input.rest_min)) <= 270 && (parseInt(input.rest_hour) * 60 + parseInt(input.rest_min)) >= 20) {
            console.log("pass")
            setDataUserSetting({
                ...dataUserSetting,
                rest_hour: input.rest_hour,
                rest_min: input.rest_min
            })
            Context.setRest_time(input.rest_hour, input.rest_min)
            Context.updateUserSetting()
            toggleOverlayEditRestTime()
        }
        else {
            console.log("miss")
        }
    }

    saveUp_location = () => {
        if ((parseInt(input.up_min) * 60 + parseInt(input.up_sec)) <= 600 && (parseInt(input.up_min) * 60 + parseInt(input.up_sec)) >= 30) {
            console.log("pass")
            setDataUserSetting({
                ...dataUserSetting,
                up_min: input.up_min,
                up_sec: input.up_sec
            })
            Context.setUpLocation(input.up_min, input.up_sec)
            Context.updateUserSetting()
            toggleOverlayEditUpLocation()
        }
        else {
            console.log("miss")
        }
    }




    const inputEAR = (text) => {
        if (text.length < 6) {
            setInput({ ...input, EAR: text })
        }
    }

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

    const inputUp_min = (text) => {
        var number = /^[0-9]+$/
        if (text.length === 0) {
            setInput({ ...input, up_min: text })
        }
        else if (text.length > 0 && text.length < 3 && text.match(number)) {
            setInput({ ...input, up_min: text })
        }
    }

    const inputUp_sec = (text) => {
        var number = /^[0-5]{1}[0-9]+$/
        if (text.length < 2) {
            setInput({ ...input, up_sec: text })
        }
        else if (text.length > 1 && text.length < 3 && text.match(number)) {
            setInput({ ...input, up_sec: text })
        }
    }





    const inputcfNewPass = (text) => {
        checktext = false

        if (text.length < 50) {

            if (text.length == 0) {
                setInput({ ...input, cfnew_password: text })
            }
            else {
                checktext = checkInput(text[text.length - 1])
                if (checktext) {
                    setInput({ ...input, cfnew_password: text })
                }
            }

        }
    }



    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
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
                                <View style={styles.space}>
                                    <TouchableOpacity  onPress={() => {
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
                    </View>

                    <View style={{ marginTop: hp('5%') }}>
                        <Text style={styles.textTopic}>การใช้งาน</Text>
                        <View style={styles.bgInput}>
                            <View style={{ width: '100%' }}>
                                <Text style={styles.textInput}>กำหนดขนาดดวงตา</Text>
                                <View style={styles.space}>
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
                            </View>

                            <View style={{ width: '100%' }}>
                                <Text style={styles.textInput}>ตั้งค่าแจ้งเตือนการพัก (ระยะทาง)</Text>
                                <View style={styles.space}>
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
                            </View>

                            <View style={{ width: '100%' }}>
                                <Text style={styles.textInput}>ตั้งค่าแจ้งเตือนการพัก (เวลา)</Text>
                                <View style={styles.space}>
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
                            </View>

                            <View style={{ width: '100%' }}>
                                <Text style={styles.textInput}>กำหนดเวลาอัพเดตตำแหน่ง</Text>
                                <View style={styles.space}>
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


                </View>

                {/* --------------------------------Edit bluetooth-------------------------------- */}
                <Overlay key={1} isVisible={visible.bluetooth} onBackdropPress={toggleOverlaybluetooth} overlayStyle={styles.overlay_head}>
                    <View style={[styles.overlay_body, { marginBottom: hp('1.5%') }]}>
                        <ScrollView>
                            <View style={[styles.overlat_show, { width: '100%', marginTop: hp('1%') }]}>
                                <Text style={{ color: '#000', fontSize: hp('2%'), marginBottom: hp('1%') }}>อุปกรณ์ที่จับคู่แล้ว</Text>
                                {
                                    bluetooth.map((item, index) => {
                                        const length = bluetooth.length - 1;
                                        return (
                                            <TouchableOpacity key={index} onPress={() => {
                                                saveBluetooth(item.name)
                                            }} >
                                                {index == 0 ?
                                                    <View style={[styles.bgtext, { width: wp('76%'), height: hp('5%'), borderRadius: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10, marginBottom: 1 }]}>
                                                        <Text style={styles.textshow}>{item.name}</Text>
                                                        <Text style={styles.textedit}>เลือก</Text>
                                                    </View>
                                                    : <View>
                                                        {
                                                            length == index ?
                                                                <View style={[styles.bgtext, { width: wp('76%'), height: hp('5%'), borderRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginBottom: 1 }]}>
                                                                    <Text style={styles.textshow}>{item.name}</Text>
                                                                    <Text style={styles.textedit}>เลือก</Text>
                                                                </View>
                                                                :
                                                                <View style={[styles.bgtext, { width: wp('76%'), height: hp('5%'), borderRadius: 0, marginBottom: 1 }]}>
                                                                    <Text style={styles.textshow}>{item.name}</Text>
                                                                    <Text style={styles.textedit}>เลือก</Text>
                                                                </View>
                                                        }
                                                    </View>


                                                }

                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                </Overlay>

                {/* --------------------------------Edit EAR-------------------------------- */}
                <Overlay key={2} isVisible={visible.editEAR} onBackdropPress={toggleOverlayEditEAR} overlayStyle={styles.overlay_head}>
                    <View style={styles.overlay_body}>
                        <View style={{ margin: hp('2%') }}>
                            <Text style={styles.text}>สามารถดูขนาดตาของท่านได้จากจอ</Text>
                        </View>
                        <View style={{ borderWidth: 1, width: wp('70%'), height: wp('40%'), padding: 0 }}>
                            <Image source={require('../assets/EAR.png')} style={[styles.addimage, { resizeMode: 'cover' }]} />
                        </View>

                        <View style={{ width: '95%', marginTop: hp('2%') }}>
                            {/* <Text style={[styles.text, { marginLeft: 5 }]}>ค่าขนาดดวงตา</Text> */}
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>ค่าขนาดดวงตา</Text>
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', fontSize: hp('1.5%'), }]}>มีค่าตั้งแต่ 0.000 ถึง 1.000</Text>

                            <TextInput
                                style={styles.Input}
                                value={input.EAR}
                                keyboardType='decimal-pad'
                                onChangeText={inputEAR}
                            // placeholder="Username"
                            />
                        </View>

                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'center' }}>
                            <Button
                                title="ค่าเริ่มต้น"
                                buttonStyle={[styles.btreset, styles.Shadow, { marginRight: wp('12%') }]}
                                onPress={() => {
                                    setInput({
                                        ...input,
                                        EAR: defaultSetting.EAR
                                    })
                                }}
                                titleStyle={{ fontSize: hp('2%') }}
                            />

                            <Button
                                title="บันทึก"
                                buttonStyle={[styles.btsave, styles.Shadow,]}
                                onPress={() => { saveEAR() }}
                                titleStyle={{ fontSize: hp('2%') }}
                            />
                        </View>

                    </View>
                </Overlay>

                {/* --------------------------------Edit Rest_dis -------------------------------- */}
                <Overlay key={3} isVisible={visible.editRestDis} onBackdropPress={toggleOverlayEditRestDis} overlayStyle={styles.overlay_head}>
                    <View style={styles.overlay_body}>

                        <View style={styles.overlat_show}>
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>ระยะทางที่ต้องการให้แจ้งเตือน</Text>
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', fontSize: hp('1.5%') }]}>สูงสุด 450 กิโลเมตร</Text>

                            < View style={{ width: '100%', flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                                <Text style={[styles.textInput, { color: '#000', }]}>ระยะทาง</Text>
                                <TextInput
                                    style={[styles.Input, { width: '35%', marginLeft: '5%', marginRight: '5%' }]}
                                    value={input.distance}
                                    keyboardType='number-pad'
                                    onChangeText={inputDistance}
                                // placeholder="Username"
                                />
                                <Text style={[styles.textInput, { color: '#000', }]}> กิโลเมตร</Text>
                            </View>

                            <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'center' }}>
                                <Button
                                    title="ค่าเริ่มต้น"
                                    buttonStyle={[styles.btreset, styles.Shadow, { marginRight: wp('12%') }]}
                                    onPress={() => {
                                        setInput({
                                            ...input,
                                            distance: defaultSetting.distance
                                        })
                                    }}
                                    titleStyle={{ fontSize: hp('2%') }}
                                />

                                <Button
                                    title="บันทึก"
                                    buttonStyle={[styles.btsave, styles.Shadow,]}
                                    onPress={() => { saveRest_dis() }}
                                    titleStyle={{ fontSize: hp('2%') }}
                                />
                            </View>
                        </View>
                    </View>
                </Overlay>

                {/* --------------------------------Edit Rest_Time -------------------------------- */}
                <Overlay key={4} isVisible={visible.editRestTime} onBackdropPress={toggleOverlayEditRestTime} overlayStyle={styles.overlay_head}>
                    <View style={styles.overlay_body}>

                        <View style={styles.overlat_show}>
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>ระยะเวลาที่ต้องการให้แจ้งเตือน</Text>
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', fontSize: hp('1.5%') }]}>สูงสุด 4:30 ชั่วโมง:นาที</Text>

                            <View style={{ width: '100%', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginTop: hp('2%'), }}>
                                <View style={{ width: '30%', }}>
                                    <Text style={[styles.textInput, { color: '#000', textAlign: 'center' }]}>เวลา</Text>
                                </View>
                                <View style={{ width: '40%', flexDirection: "row", justifyContent: 'center', alignItems: 'center', }}>
                                    <TextInput
                                        style={[styles.Input, { width: '40%', }]}
                                        keyboardType='decimal-pad'
                                        value={input.rest_hour}
                                        onChangeText={inputRest_HH}
                                    />
                                    <Text style={[styles.textInput, { margin: '2%', color: '#000' }]}>{":"}</Text>
                                    <TextInput
                                        style={[styles.Input, { width: '40%' }]}
                                        keyboardType='decimal-pad'
                                        value={input.rest_min}
                                        onChangeText={inputRest_MM}
                                    />
                                </View>
                                <View style={{ width: '30%', }}>
                                    <Text style={[styles.textInput, { color: '#000', textAlign: 'center' }]}>ชั่วโมง:นาที</Text>
                                </View>
                            </View>

                            <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'center' }}>
                                <Button
                                    title="ค่าเริ่มต้น"
                                    buttonStyle={[styles.btreset, styles.Shadow, { marginRight: wp('12%') }]}
                                    onPress={() => {
                                        setInput({
                                            ...input,
                                            rest_hour: defaultSetting.rest_hour,
                                            rest_min: defaultSetting.rest_min
                                        })
                                    }}
                                    titleStyle={{ fontSize: hp('2%') }}
                                />

                                <Button
                                    title="บันทึก"
                                    buttonStyle={[styles.btsave, styles.Shadow,]}
                                    onPress={() => { saveRest_time() }}
                                    titleStyle={{ fontSize: hp('2%') }}
                                />
                            </View>

                        </View>
                    </View>
                </Overlay>

                {/* --------------------------------Edit update_Location -------------------------------- */}
                <Overlay key={5} isVisible={visible.editUpLocation} onBackdropPress={toggleOverlayEditUpLocation} overlayStyle={styles.overlay_head}>
                    <View style={styles.overlay_body}>

                        <View style={styles.overlat_show}>
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>ระยะเวลาที่ต้องการอัพเดตตำแหน่ง</Text>
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', fontSize: hp('1.5%') }]}>สูงสุด 10:00 นาที:วินาที</Text>

                            <View style={{ width: '100%', flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginTop: hp('2%'), }}>
                                <View style={{ width: '30%', }}>
                                    <Text style={[styles.textInput, { color: '#000', textAlign: 'center' }]}>เวลา</Text>
                                </View>
                                <View style={{ width: '40%', flexDirection: "row", justifyContent: 'center', alignItems: 'center', }}>
                                    <TextInput
                                        style={[styles.Input, { width: '40%', }]}
                                        keyboardType='decimal-pad'
                                        value={input.up_min}
                                        onChangeText={inputUp_min}
                                    />
                                    <Text style={[styles.textInput, { margin: '2%', color: '#000' }]}>{":"}</Text>
                                    <TextInput
                                        style={[styles.Input, { width: '40%' }]}
                                        keyboardType='decimal-pad'
                                        value={input.up_sec}
                                        onChangeText={inputUp_sec}
                                    />
                                </View>
                                <View style={{ width: '30%', }}>
                                    <Text style={[styles.textInput, { color: '#000', textAlign: 'center' }]}>นาที:วินาที</Text>
                                </View>
                            </View>

                            <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'center' }}>
                                <Button
                                    title="ค่าเริ่มต้น"
                                    buttonStyle={[styles.btreset, styles.Shadow, { marginRight: wp('12%') }]}
                                    onPress={() => {
                                        setInput({
                                            ...input,
                                            up_min: defaultSetting.up_min,
                                            up_sec: defaultSetting.up_sec
                                        })
                                    }}
                                    titleStyle={{ fontSize: hp('2%') }}
                                />

                                <Button
                                    title="บันทึก"
                                    buttonStyle={[styles.btsave, styles.Shadow,]}
                                    onPress={() => { saveUp_location() }}
                                    titleStyle={{ fontSize: hp('2%') }}
                                />
                            </View>


                        </View>
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
    bgtext: {
        flexDirection: 'row',
        //marginBottom: hp('3%'),
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
    space: {
        width: '100%',
        marginBottom: hp('3%'),
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