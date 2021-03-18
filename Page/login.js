import React, { useState, useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'
import { Alert } from 'react-native';
import { API } from './axios';
import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import AsyncStorage from '@react-native-community/async-storage';
import { CategoryContext } from '../context_api/myContext';

import messaging from '@react-native-firebase/messaging';


async function hasAndroidPermission_Storage() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}

// async function hasAndroidPermission_BT() {
//     const permission = PermissionsAndroid.PERMISSIONS.;

//     const hasPermission = await PermissionsAndroid.check(permission);
//     if (hasPermission) {
//         return true;
//     }

//     const status = await PermissionsAndroid.request(permission);
//     return status === 'granted';
// }



export default function login({ navigation }) {
    const Context = useContext(CategoryContext)

    const [input, setInput] = useState({
        username: '',
        password: ''
    })

    const [loading, setloading] = useState(true)

    useEffect(() => {
        hasAndroidPermission_Storage()
        // console.log('hi')

        setTimeout(() => {  //assign interval to a variable to clear it.
            readlogin()

        }, 1200)
    }, ([]))

    _checkPermission = async () => {
        const enabled = await messaging().hasPermission();
        if (enabled) {
            const device = await messaging().getToken()
            console.log(device)
            API.post('/up_token', data = {
                username: input.username.toLowerCase(),
                token: device,
            }).catch(error => {
                console.log(error)
            })
        }
        else this._getPermission()
    }

    _getPermission = async () => {
        messaging().requestPermission()
            .then(() => {
                this._checkPermission()
            })
            .catch(error => {
                // User has rejected permissions  
            });
    }





    readlogin = async () => {
        try {
            let checklogin = await AsyncStorage.getItem('@login')
            let dataUser = await AsyncStorage.getItem('@dataUser')
            let dataUserSetting = await AsyncStorage.getItem('@dataUserSetting')
            if (dataUser !== null) {
                Context.setDataUser(JSON.parse(dataUser))
            }
            if (dataUserSetting !== null) {
                Context.setDataUserSetting(JSON.parse(dataUserSetting))
            }
            checklogin = (checklogin === 'true')
            //checklogin = true
            if (checklogin) {
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: "Home"
                    }]
                })
            }
            setloading(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    const setlogin = async (dataUser) => {
        dataUser = JSON.stringify(dataUser)
        //console.log(dataUser)
        try {
            await AsyncStorage.setItem('@dataUser', dataUser)
            await AsyncStorage.setItem('@login', 'true')
            console.log('saveData successfully saved')
        } catch (e) {
            console.log('Failed to save the saveData to the storage')
        }
    }
    const setsetting = async (dataUserSetting) => {
        dataUserSetting = JSON.stringify(dataUserSetting)
        //console.log(dataUserSetting)
        try {
            await AsyncStorage.setItem('@dataUserSetting', dataUserSetting)
            console.log('save dataUserSetting successfully saved')
        } catch (e) {
            console.log('Failed to save the saveData to the storage')
        }
    }

    const getSetting = async (dataUser) => {
        API.get('/get_setting', data = {
            params: {
                username: input.username.toLowerCase(),
            }
        })
            .then((res) => {
                data = res.data[0]
                if (data) {
                    rest_hour = parseInt(data.rest / 60)
                    rest_min = (data.rest % 60)
                    if (rest_min < 10) {
                        rest_min = '0' + rest_min
                    }
                    up_min = parseInt(data.time_update / 60)
                    up_sec = (data.time_update % 60)
                    if (up_sec < 10) {
                        up_sec = '0' + up_sec
                    }
                    dataUserSetting = {
                        bluetooth_name: data.bluetooth_name,
                        EAR: data.EAR.toString(),
                        distance: data.distance.toString(),
                        rest_hour: rest_hour.toString(),
                        rest_min: rest_min.toString(),
                        up_min: up_min.toString(),
                        up_sec: up_sec.toString(),

                    }
                    Context.setDataUserSetting(dataUserSetting)
                    setsetting(dataUserSetting)
                }
            })
            .catch(error => console.log(error))
    }


    loginFunction = () => {
        if (input.username === '' || input.password === '') {
            Alert.alert('ผิดพลาด', 'กรุณากรอกข้อมูลให้ครบทุกช่อง')
            setInput({
                username: '',
                password: ''
            })
            return
        }
        API.post('/Login', data = {
            username: input.username.toLowerCase(),
            password: input.password,
        })
            .then(async (res) => {
                setlogin(res.data[0])
                Context.setDataUser(res.data[0])
                console.log(res.data[0])
                getSetting()
                _checkPermission()
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Home'
                        }
                    ]
                })
            })
            .catch(error => {
                console.log(error)
                Alert.alert('ผิดพลาด', 'ไม่สามารถเข้าสู่ระบบได้')
                setInput({
                    username: '',
                    password: ''
                })
            })
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

    const inputUser = (text) => {
        checktext = false
        if (text.length < 16) {
            if (text.length == 0) {
                setInput({ ...input, username: text })
            }
            else {
                checktext = checkInput(text[text.length - 1])
                if (checktext) {
                    setInput({ ...input, username: text })
                }
            }
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


    return (

        <View style={styles.container}>
            {loading ?
                <View style={[styles.container, { backgroundColor: '#002E4D', alignItems: 'center', justifyContent: 'center' }]}>
                    <ActivityIndicator size='large' color='#FFF' />
                </View>
                :
                <View style={styles.container}>
                    <View style={styles.logo} >
                        <Image source={require('../assets/logo_name1024.png')} style={[styles.addimage, { resizeMode: 'cover' }]} />
                    </View>
                    <View style={[styles.listRow, { marginTop: hp('7%') }]}>
                        <ImageBackground source={require('../assets/profile-user2.png')} style={styles.smallIcon} />
                        <TextInput
                            style={styles.textInput}
                            value={input.username}
                            onChangeText={inputUser}
                            placeholder="Username"

                        />
                    </View>
                    <View style={styles.listRow}>
                        <ImageBackground source={require('../assets/padlock2.png')} style={styles.smallIcon} />
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            value={input.password}
                            onChangeText={inputPass}
                            placeholder="Password"
                            secureTextEntry
                        />
                    </View>
                    <Button
                        title="เข้าสู่ระบบ"
                        buttonStyle={[styles.btnLogin, styles.Shadow, { marginTop: hp('7%') }]}
                        onPress={() => loginFunction()}
                        titleStyle={{ fontSize: hp('2.25%') }}
                    />
                    <TouchableOpacity style={styles.touchtext} onPress={() => navigation.navigate('ForgotPass')}>
                        <Text style={styles.textForgot}>ลืมรหัสผ่าน</Text>
                    </TouchableOpacity>
                    <View style={[styles.line, { marginTop: hp('1.5%') }]} />
                    <Text style={[styles.Text, { marginTop: hp('1.5%') }]}>ยังไม่มีบัญชีใช่หรือไม่</Text>
                    <Button
                        title="ลงทะเบียน"
                        buttonStyle={[styles.btnLogin, styles.Shadow, { marginTop: hp('2%'), width: wp('50%') }]}
                        onPress={() => navigation.navigate('Register')}
                        titleStyle={{ fontSize: hp('2.25%') }}
                    />
                </View>
            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        height: wp('55%'),
        width: wp('55%'),
        alignSelf: 'center',
        borderRadius: 15,
        marginTop: hp('10%'),
        //backgroundColor: '#DBCCCC',
    },
    listRow: {

        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp('2%'),
        height: hp('5%'),

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
    smallIcon: {
        width: hp('5%'),
        height: hp('5%'),
        borderWidth: 0,
    },
    Text: {
        color: '#12283D',
        fontSize: hp('2.25%'),
        alignSelf: 'center',
    },
    textInput: {

        width: wp('70%') - hp('6%') - 10,
        color: '#000',
        height: hp('5%'),
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        fontSize: hp('3%'),
        paddingBottom: 0,
        marginLeft: 10,
    },
    btnLogin: {
        alignSelf: 'center',
        backgroundColor: '#014D81',
        width: wp('29%'),
        height: hp('6%'),
        borderRadius: 10,
    },
    textForgot: {
        //margin: '1%',
        color: '#12283D',
        fontSize: hp('2.25%'),
        borderBottomWidth: 1,
        borderColor: '#12283D',
        alignSelf: 'center',
        //marginTop: hp('5%'),
        paddingBottom: 0,

    },
    touchtext: {
        alignSelf: 'center',
        marginTop: hp('5%'),

    },
    line: {
        width: wp('70%'),
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        alignSelf: 'center',
    },
    addimage: {
        height: '100%',
        width: '100%',
    },
})