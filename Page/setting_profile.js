import React, { useState, useContext ,useEffect} from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Image, Icon, Header, Overlay } from 'react-native-elements';

//import {launchImageLibrary} from 'react-native-image-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { API } from './axios';

import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";


export default function register({ navigation }) {
    const [input, setInput] = useState({
        name: '',
        new_password: '',
        cfnew_password: '',
        password: '',
    })

    const [profileImage, setImage] = useState({
        imagesrc: require('../assets/profile-user2.png'),
        imgEdit: ''
        //imagesrc: { uri: "../assets/profile-user2.png", }
    })

    const [state, setState] = useState({
        edit: false,
        temp64: '',
        name : 'Burit1234'
    })

    const [visible, setVisible] = useState({
        optionEditimg: false,
        optionEditimg_cf: false,
        editname: false,
        editpass: false,
        visble2: false
    });



    useEffect(() =>{
        API.get('/get_image',body = {
            params:{
                username : 'Burit1234'
                }
        })
        .then(res =>{
            //console.log(res.data[0].image)
            if(res.data[0].image === undefined){
                return;
            }
            if(res.data[0].image !== "" ){
                setImage({
                    ...profileImage,
                    imagesrc : {uri: `data:image/jpg;base64,${res.data[0].image}`}
                })
            }
        })
        .catch(error => {
            console.log(error)
            //Alert.alert('ผิดพลาด','ไม่สามารถเข้าสู่ระบบได้')
        })

        API.get('/get_name',body = {
            params:{
                username : 'Burit1234'
                }
        })
        .then(res =>{
            console.log(res.data[0].name)
            if(res.data[0].name === undefined){
                return;
            }
            if(res.data[0].name !== "" ){
                setState({
                    ...state,
                    name : res.data[0].name
                })
            }
        })
        .catch(error => {
            console.log(error)
            //Alert.alert('ผิดพลาด','ไม่สามารถเข้าสู่ระบบได้')
        })

    },([]))


    const saveimage = () =>{
        API.post('/add_image',body ={
            username : 'Burit1234',
            image : state.temp64,
        })
        .catch(error => {
            console.log(error)
            //Alert.alert('ผิดพลาด','ไม่สามารถเข้าสู่ระบบได้')
        })
    }

    const savename = () =>{
        API.post('/add_name',body ={
            username : 'Burit1234',
            name : input.name,
        })
        .then(res =>{
            console.log(res.data[0].name)
            if(res.data[0].name === undefined){
                return;
            }
            if(res.data[0].name !== "" ){
                setState({
                    ...state,
                    name : res.data[0].name
                })
            }
        })
        .catch(error => {
            console.log(error)
            //Alert.alert('ผิดพลาด','ไม่สามารถเข้าสู่ระบบได้')
        })
    }

    const saveNewpass = () =>{
        API.post('/new_password',body ={
            username : 'Burit1234',
            password : input.password,
            new_password : input.new_password
        })
        .then(res =>{
            console.log(res)
            if(res.status !== 200){
                console.log('Wrong password')
            }
 
        })
        .catch(error => {
            console.log(error)
            //Alert.alert('ผิดพลาด','ไม่สามารถเข้าสู่ระบบได้')
        })
    }


    const toggleOverlay1 = () => {
        setVisible({
            ...visible,
            visble1: !visible.visble1
        });
    };

    const toggleOverlayoptionEditimg = () => {
        setVisible({
            ...visible,
            optionEditimg: !visible.optionEditimg
        });
    };

    const toggleOverlayoptionEditimg_cf = () => {
        setVisible({
            ...visible,
            optionEditimg_cf: !visible.optionEditimg_cf
        });
    };

    const toggleOverlayEditname = () => {
        setVisible({
            ...visible,
            editname: !visible.editname
        });
    };

    const toggleOverlayEditpass = () => {
        setVisible({
            ...visible,
            editpass: !visible.editpass
        });
    };


    changeImage = () => {
        //toggleOverlayoptionEditimg()
        const options = {
            quality: 0.8, maxWidth: 300, maxHeight: 300, mediaType: 'photo', includeBase64: true,
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
                        setImage({
                            imagesrc: require('../assets/profile-user2.png'),
                            imgEdit : ''
                        })
                        toggleOverlayoptionEditimg()
                    }
                }
            ],
            { cancelable: false }
        );
    }


    const checkcfPass = () => {
        if (input.cfnew_password !== input.new_password) {
            //setShowcfPass({ ...showcfPass, hide: false })
            return false
        }
        return true
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
                centerComponent={{ text: 'โปรไฟล์', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <ScrollView>
                <View style={styles.body}>
                    <View style={{ margin: hp('7%'), }}>
                        <View style={{ width: wp('36%'), height: wp('36%') }}>
                            <Image style={[styles.profile, { resizeMode: 'cover' }]} source={profileImage.imagesrc} />


                        </View>
                        <TouchableOpacity onPress={() => toggleOverlayoptionEditimg()} >
                            <Text style={[styles.textprofile, { marginTop: hp('1.5%') }]}>แก้ไขโปรไฟล์</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.bgInput}>
                        <View style={{ width: '100%' }}>
                            <Text style={styles.textInput}>ชื่อเล่น</Text>
                            <TouchableOpacity onPress={() => {
                                toggleOverlayEditname()
                                setInput({
                                    ...input,
                                    name : state.name
                                })
                            }} >
                                <View style={styles.bgtext}>
                                    <Text style={styles.textshow}>{state.name}</Text>
                                    <Text style={styles.textedit}>แก้ไข</Text>
                                </View>
                            </TouchableOpacity>

                            {/* <TextInput
                                editable={state.edit}
                                style={styles.Input}
                                value={input.nickname}
                                onChangeText={inputName}
                            //placeholder="Username"
                            /> */}
                        </View>

                        <View style={{ width: '100%' }}>
                            <Text style={styles.textInput}>รหัสผ่าน</Text>
                            <TouchableOpacity onPress={() => toggleOverlayEditpass()} >
                                <View style={styles.bgtext}>
                                    <Text style={styles.textshow}>เปลี่ยนรหัสผ่านใหม่</Text>
                                    <Text style={styles.textedit}>แก้ไข</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </View>
                    {/* <View style={{ width: wp('80%'), alignItems: 'flex-end' }}>
                        <Button
                            title="บันทึก"
                            buttonStyle={[styles.btsave, styles.Shadow, { marginTop: hp('2.5%') }]}
                            onPress={() => {
                                setState({
                                    edit: true
                                })

                                API.post('/update_info', data = {
                                    username: "Burit1234",
                                    password: "Burit1234",
                                    image: state.temp64,
                                    name: 'test123',
                                })
                                    .then(res => {
                                        console.log(res.status)
                                    })


                            }}
                            titleStyle={{ fontSize: hp('2%') }}
                        />
                    </View>

                    <View style={{ width: wp('80%'), alignItems: 'flex-end' }}>
                        <Button
                            title="12"
                            buttonStyle={[styles.btsave, styles.Shadow, { marginTop: hp('2.5%') }]}
                            onPress={() => {
                                toggleOverlay1()
                            }}
                            titleStyle={{ fontSize: hp('2%') }}
                        />
                    </View> */}

                </View>


                {/* --------------------------------optionEditimg-------------------------------- */}
                <Overlay key={1} isVisible={visible.optionEditimg} onBackdropPress={toggleOverlayoptionEditimg}>
                    <View style={{ width: wp('42%'), height: wp('20%'), padding: hp('0.7%'), justifyContent: 'center' }}>

                        <TouchableOpacity onPress={() => {

                            changeImage()
                        }} >
                            <View style={{ height: '50%', marginBottom: ('5%'), justifyContent: 'center' }}>
                                <Text style={{ fontSize: hp('2%') }}>เลือกรูปภาพ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => deletimg()} >
                            <View style={{ height: '50%', justifyContent: 'center' }}>
                                <Text style={{ fontSize: hp('2%') }}>ลบ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Overlay>

                {/* --------------------------------optionEditimg_cf-------------------------------- */}
                <Overlay key={2} isVisible={visible.optionEditimg_cf} >
                    <View style={{ width: wp('80%'), height: hp('35%'), padding: hp('0.7%'), alignItems: 'center', justifyContent: 'center' }}>


                        <View style={{ width: wp('36%'), height: wp('36%') }}>
                            <Image style={[styles.profile, { resizeMode: 'cover' }]} source={profileImage.imgEdit} />
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Button
                                title="บันทึก"
                                buttonStyle={[styles.btsave, styles.Shadow, { marginTop: hp('5%'), marginRight: wp('15%') }]}
                                onPress={() => {
                                    setImage({
                                        ...profileImage,
                                        imagesrc: profileImage.imgEdit
                                    })
                                    
                                    setVisible({
                                        ...visible,
                                        optionEditimg : false,
                                        optionEditimg_cf : false
                                    })

                                    saveimage()
                                }}
                                titleStyle={{ fontSize: hp('2%') }}
                            />

                            <Button
                                title="ยกเลิก"
                                buttonStyle={[styles.btsave, styles.Shadow, { marginTop: hp('5%'), backgroundColor: "#EA2626" }]}
                                onPress={() => {
                                    toggleOverlayoptionEditimg_cf()

                                }}
                                titleStyle={{ fontSize: hp('2%') }}
                            />

                        </View>
                    </View>
                </Overlay>

                {/* --------------------------------Editname-------------------------------- */}
                <Overlay key={3} isVisible={visible.editname} onBackdropPress={toggleOverlayEditname}>
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
                                toggleOverlayEditname()
                                setState({
                                    ...state,
                                    name : input.name
                                })
                            }}
                            titleStyle={{ fontSize: hp('2%') }}
                        />

                    </View>
                </Overlay>

                {/* --------------------------------Editpassword-------------------------------- */}
                <Overlay key={4} isVisible={visible.editpass} onBackdropPress={toggleOverlayEditpass}>
                    <View style={{ width: wp('80%'), height: hp('35%'), padding: hp('0.7%'), justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ width: '95%', marginBottom: ('5%') }}>
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>รหัสผ่านเดิม</Text>
                            <TextInput
                                style={styles.Input}
                                value={input.password}
                                onChangeText={inputPass}
                            //placeholder="Username"
                            />
                        </View>

                        <View style={{ width: '95%', marginBottom: ('5%') }}>
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>รหัสผ่านใหม่</Text>
                            <TextInput
                                style={styles.Input}
                                value={input.new_password}
                                onChangeText={inputNewPass}
                            //placeholder="Username"
                            />
                        </View>

                        <View style={{ width: '95%' }}>
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>ยืนยันรหัสผ่านใหม่</Text>
                            <TextInput
                                style={styles.Input}
                                value={input.cfnew_password}
                                onChangeText={inputcfNewPass}
                            //placeholder="Username"
                            />
                        </View>

                        <Button
                            title="บันทึก"
                            buttonStyle={[styles.btsave, styles.Shadow, { marginTop: '5%' }]}
                            onPress={() => {
                                if(checkcfPass()){
                                    saveNewpass()
                                }
                                else{
                                    console.log('Not Same')
                                }
                                toggleOverlayEditpass()
                            }}
                            titleStyle={{ fontSize: hp('2%') }}
                        />

                    </View>
                </Overlay>



                {/* <Overlay key={2} isVisible={visible.visble1} onBackdropPress={toggleOverlay1}>
                    <View>
                        <Text>Hello from Overlay!</Text>
                        <View style={styles.bgInput}>
                            <View style={{ width: '100%' }}>
                                <Text style={styles.textInput}>ชื่อเล่น*</Text>
                                <TextInput
                                    editable={state.edit}
                                    style={styles.Input}
                                    value={input.nickname}
                                    onChangeText={inputName}
                                //placeholder="Username"
                                />
                            </View>
                        </View>
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
})