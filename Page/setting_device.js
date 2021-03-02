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




export default function register({ navigation }) {
    const Context = useContext(CategoryContext)

    const [dataUser, setdataUser] = useState(
        Context.dataUser
    )

    const [input, setInput] = useState({
        EAR: '',
        distance: '',
        time: '',
    })

    const [profileImage, setImage] = useState({
        imagesrc: require('../assets/profile-user2.png'),
        imgEdit: ''
        //imagesrc: { uri: "../assets/profile-user2.png", }
    })

    const [state, setState] = useState({
        edit: false,
        temp64: '',
        name: ''
    })

    const [visible, setVisible] = useState({
        editEAR: false,
        editRest: false,
        editpass: false,
    });

    const [showNewPass, setShowNewPass] = useState({
        text: "มีจำนวน 8 ตัวขึ้นไปที่มีทั้งตัวอักษรภาษาอังกฤษและตัวเลขผสมกัน",
        color: '#1D1414',
        hide: true
    })

    const [showcfNewPass, setShowcfNewPass] = useState({
        text: "Password ไม่ตรงกัน กรุณาลองใหม่อีกครั้ง",
        color: '#FF0000',
        hide: true
    })

    const [showPass, setShowPass] = useState({
        text: "ขออภัย password เดิมไม่ถูกต้อง",
        color: '#FF0000',
        hide: true
    })



    useEffect(() => {

        if (dataUser.image !== '') {
            setImage({
                ...profileImage,
                imagesrc: { uri: `data:image/jpg;base64,${dataUser.image}` }
            })
        }

        if (dataUser.name !== '') {
            setState({
                ...state,
                name: dataUser.name
            })
        }
        if (dataUser.name === '') {
            setState({
                ...state,
                name: dataUser.Username
            })
        }


    }, ([]))



    const toggleOverlayEditEAR = () => {
        setVisible({
            ...visible,
            editEAR: !visible.editEAR
        });
    };

    const toggleOverlayEditRest = () => {
        setVisible({
            ...visible,
            editRest: !visible.editRest
        });
    };

    // const toggleOverlayEditname = () => {
    //     setVisible({
    //         ...visible,
    //         editname: !visible.editname
    //     });
    // };




    changeImage = () => {
        //toggleOverlayoptionEditimg()
        const options = {
            quality: 0.8, maxWidth: 270, maxHeight: 270, mediaType: 'photo', includeBase64: true,
            // storageOptions: {
            //     skipBackup: true, waitUntilSaved: true, path: 'images', CameraRoll: true
            // }
        }
        launchImageLibrary(options, response => {
            if (response.error) {
                console.log(error)
            } else if (!response.didCancel) {
                console.log(response)

                setState({
                    ...state,
                    temp64: response.base64
                })

                // toggleOverlay1()

                setImage({
                    ...profileImage,
                    imgEdit: { uri: response.uri, }
                })

                toggleOverlayoptionEditimg_cf()

                //Alert.alert('เปลี่ยนรูปโปรไฟล์', 'บันทึกรูปสำเร็จ')
            }
        })
    }

    deletimg = () => {
        Alert.alert(
            "แก้ไขรูปโปรไฟล์",
            "ต้องลบรูปโปรไฟล์ใช่หรือไม่",
            [
                {
                    text: "ยกเลิก",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "ยืนยัน", onPress: () => {
                        toggleOverlayoptionEditimg()
                        setState({
                            ...state,
                            temp64: ''
                        })
                        API_Deleteimage()
                    }
                }
            ],
            { cancelable: false }
        );
    }


    const checkcfPass = () => {
        if (input.cfnew_password !== input.new_password) {
            setShowcfNewPass({ ...showcfNewPass, hide: false })
            return false
        }
        return true
    }

    const checkPass = () => {
        var letters = /[a-zA-Z]/
        var number = /[0-9]/
        if (input.new_password.length < 8) {
            setShowNewPass({ hide: false, color: '#FF0000', text: "ขออภัย Password ต้องมีความยาว 8 ตัวขึ้นไป" })
            return false
        }
        //console.log('l', input.new_password.match(letters), 'n', input.new_password.match(number))
        if (!input.new_password.match(letters) || !input.new_password.match(number)) {
            setShowNewPass({ hide: false, color: '#FF0000', text: "ขออภัย Password ต้องมีตัวอักษรและตัวเลข" })
            return false
        }
        return true
    }

    const vaildateNewpass = () => {
        if (input.password === '' || input.new_password === '' || input.cfnew_password === '') {
            Alert.alert(
                "เปลี่ยนรหัสผ่านไม่สำเร็จ",
                "กรุณากรอกข้อมูลให้ครบทุกช่อง",
                [
                    { text: "ตกลง" }
                ],
                { cancelable: true }
            );
            setInput({
                ...input,
                password: '',
                new_password: '',
                cfnew_password: ''
            })
            return
        }

        let conditionPass = checkPass()
        let conditioncfPass = checkcfPass()

        if (!conditionPass || !conditioncfPass) {
            setInput({
                ...input,
                password: '',
                new_password: '',
                cfnew_password: ''
            })
            return
        }

        if (conditionPass && conditioncfPass) {
            saveNewpass()
        }
    }

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

    const inputName = (text) => {
        if (text.length < 21) {
            setInput({ ...input, name: text })
        }
    }

    const inputPass = (text) => {
        checktext = false

        if (text.length < 50) {
            if (text.length == 0) {
                setInput({ ...input, password: text })
            }
            else {
                checktext = checkInput(text[text.length - 1])
                if (checktext) {
                    setInput({ ...input, password: text })
                }
            }

        }
    }

    const inputNewPass = (text) => {
        checktext = false

        if (text.length < 50) {

            if (text.length == 0) {
                setInput({ ...input, new_password: text })
            }
            else {
                checktext = checkInput(text[text.length - 1])
                if (checktext) {
                    setInput({ ...input, new_password: text })
                }
            }

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
                                <TouchableOpacity onPress={() => {
                                    toggleOverlayEditEAR()
                                    setInput({
                                        ...input,
                                        name: state.name
                                    })
                                }} >
                                    <View style={styles.bgtext}>
                                        <Text style={styles.textshow}>{state.name}</Text>
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
                                        name: state.name
                                    })
                                }} >
                                    <View style={styles.bgtext}>
                                        <Text style={styles.textshow}>{state.name}</Text>
                                        <Text style={styles.textedit}>แก้ไข</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '100%' }}>
                                <Text style={styles.textInput}>ตั้งค่าแจ้งเตือนการพัก</Text>
                                <TouchableOpacity onPress={() => toggleOverlayEditRest()} >
                                    <View style={styles.bgtext}>
                                        <Text style={styles.textshow}>เปลี่ยนรหัสผ่านใหม่</Text>
                                        <Text style={styles.textedit}>แก้ไข</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '100%' }}>
                                <Text style={styles.textInput}>กำหนดเวลาอัพเดตตำแหน่ง</Text>
                                <TouchableOpacity onPress={() => toggleOverlayEditpass()} >
                                    <View style={[styles.bgtext, { marginBottom: 0 }]}>
                                        <Text style={styles.textshow}>เปลี่ยนรหัสผ่านใหม่</Text>
                                        <Text style={styles.textedit}>แก้ไข</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>


                </View>


                {/* --------------------------------Edit EAR-------------------------------- */}
                <Overlay key={1} isVisible={visible.editEAR} onBackdropPress={toggleOverlayEditEAR}>
                    <View style={{ width: wp('80%'), padding: hp('0.7%'), alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ margin: hp('2%') }}>
                            <Text style={styles.text}>สามารถดูขนาดตาของท่านได้จากจอ</Text>
                        </View>
                        <View style={{ borderWidth: 1, width: wp('70%'), height: wp('40%'), padding: 0 }}>
                            <Image source={require('../assets/EAR.png')} style={styles.addimage} />
                        </View>

                        <View style={{ width: '95%', margin: hp('2%') }}>
                            {/* <Text style={[styles.text, { marginLeft: 5 }]}>ค่าขนาดดวงตา</Text> */}
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>ค่าขนาดดวงตา</Text>

                            <TextInput
                                style={styles.Input}
                                value={input.EAR}
                                keyboardType='decimal-pad'
                                onChangeText={(text) => setInput({ ...input, EAR: text })}
                            // placeholder="Username"
                            />
                        </View>

                        <View style={{ width: '95%', margin: hp('2%'), flexDirection: 'row', justifyContent: 'center' }}>
                            <Button
                                title="ค่าเริ่มต้น"
                                buttonStyle={[styles.btreset, styles.Shadow, { marginTop: hp('2%'), marginRight: wp('12%') }]}
                                onPress={() => { Resetvalue() }}
                                titleStyle={{ fontSize: hp('2%') }}
                            />

                            <Button
                                title="บันทึก"
                                buttonStyle={[styles.btsave, styles.Shadow, { marginTop: hp('2%') }]}
                                //onPress={() => {cfregister()}}
                                titleStyle={{ fontSize: hp('2%') }}
                            />
                        </View>

                    </View>
                </Overlay>

                {/* --------------------------------Edit Rest-------------------------------- */}
                <Overlay key={2} isVisible={visible.editRest} onBackdropPress={toggleOverlayEditRest}>
                    <View style={{ width: wp('80%'), padding: hp('0.7%'), alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: '95%', margin: hp('2%') }}>
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>ระยะทางที่ต้องการให้แจ้งเตือน</Text>
                            <TextInput
                                style={styles.Input}
                                value={input.distance}
                                keyboardType='decimal-pad'
                                onChangeText={(text) => setInput({ ...input, distance: text })}
                            // placeholder="Username"
                            />

                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>ระยะเวลาที่ต้องการให้แจ้งเตือน</Text>
                            <TextInput
                                style={styles.Input}
                                value={input.EAR}
                                keyboardType='decimal-pad'
                                onChangeText={(text) => setInput({ ...input, EAR: text })}
                            // placeholder="Username"
                            />


                        </View>
                    </View>
                </Overlay>

                {/* --------------------------------Editname-------------------------------- */}
                {/* <Overlay key={3} isVisible={visible.editname} onBackdropPress={toggleOverlayEditname}>
                    <View style={{ width: wp('80%'), height: hp('20%'), padding: hp('0.7%'), justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '95%' }}>
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>แก้ไขชื่อเล่น</Text>
                            <TextInput
                                style={styles.Input}
                                value={input.name}
                                onChangeText={inputName}
                            //placeholder="Username"
                            />
                        </View>

                        <Button
                            title="บันทึก"
                            buttonStyle={[styles.btsave, styles.Shadow, { marginTop: '10%' }]}
                            onPress={() => {
                                savename()
                            }}
                            titleStyle={{ fontSize: hp('2%') }}
                        />

                    </View>
                </Overlay> */}



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
        //borderRadius: 15,
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
    btsave: {
        //alignSelf: 'center',
        backgroundColor: '#49BB21',
        width: wp('25.5%'),
        height: hp('5%'),
        borderRadius: 15,
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
        //borderRadius: 15,
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
    btreset: {
        backgroundColor: '#EA2626',
        width: wp('29%'),
        height: hp('5%'),
        borderRadius: 15,
    },
})