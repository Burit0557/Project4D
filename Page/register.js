import React, { useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'
import { useSafeArea } from 'react-native-safe-area-context';
import { and } from 'react-native-reanimated';
import { API } from './axios';
import messaging from '@react-native-firebase/messaging';

export default function register({ navigation }) {
    const [input, setInput] = useState({
        username: '',
        password: '',
        cfpassword: '',
        email: '',
    })



    const [showUser, setShowUser] = useState({
        text: "สามารถใช้อักษรภาษาอังกฤษ,ตัวเลข โดย Username ต้องขึ้นต้นด้วยตัวอักษรและมีจำนวน 6-15 ตัว",
        color: '#1D1414',
        hide: true
    })

    const [showPass, setShowPass] = useState({
        text: "มีจำนวน 8 ตัวขึ้นไปที่มีทั้งตัวอักษรภาษาอังกฤษและตัวเลขผสมกัน",
        color: '#1D1414',
        hide: true
    })

    const [showcfPass, setShowcfPass] = useState({
        text: "Password ไม่ตรงกัน กรุณาลองใหม่อีกครั้ง",
        color: '#FF0000',
        hide: true
    })

    const [showEmail, setShowEmail] = useState({
        text: "กรุณากรอก Email ที่ใช้งานจริง",
        color: '#1D1414',
        hide: true
    })



    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={{ width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('3%') }}>
                    <Image source={require('../assets/previous.png')} style={styles.smallIcon} />
                </View>
            </TouchableOpacity>)
    }
    cfregister = () => {
        check = true
        if (check) {
            navigation.navigate('Login')
        }
    }

    _checkPermission = async () => {
        const enabled = await messaging().hasPermission();
        if (enabled) {
            const device = await messaging().getToken()
            console.log(device)
            let tempusername = input.username.toLowerCase()
            API.post('/add_token', data = {
                username: tempusername,
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

    const checkInput = (text) => {
        var letters = /^[0-9a-zA-Z]+$/
        if (text == null) {
            return false
        }
        else if (text.length == 1 && text.match(letters)) {
            return true
        }
        // if (text >= 'A' && text <= 'Z') {
        //     return true
        // }
        // else if (text >= 'a' && text <= 'z') {
        //     return true
        // }
        // else if (text >= '0' && text <= '9') {
        //     return true
        // }
        else {
            return false
        }

    }

    const checkInputE = (text) => {
        var letters = /^[0-9a-zA-Z]+$/
        var format = /[-.@_]/
        //var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        //var format = /[_-\[\].\]/
        if (text == null) {
            return false
        }
        else if (text.length == 1 && text.match(letters) || text.match(format)) {
            return true
        }
        else {
            return false
        }

    }

    const validateAll = () => {
        if (input.username === '' || input.password === '' || input.cfpassword === '' || input.email === '') {
            Alert.alert(
                "ลงทะเบียนไม่สำเร็จ",
                "กรุณากรอกข้อมูลให้ครบทุกช่อง",
                [
                    { text: "ตกลง" }
                ],
                { cancelable: true }
            );
            return
        }

        let conditionUser = checkUser()
        let conditionPass = checkPass()
        let conditioncfPass = checkcfPass()
        let conditionEmail = checkEmail()
        let { username, password, cfpassword, email } = input

        if (!conditionUser) {
            username = ''
        }
        if (!conditionPass) {
            password = ''
            cfpassword = ''
        }
        if (!conditioncfPass) {
            cfpassword = ''
        }
        if (!conditionEmail) {
            email = ''
        }

        if (conditionUser && conditionPass && conditioncfPass && conditionEmail) {
            console.log('success')
            let tempusername = input.username.toLowerCase()
            API.post('/register', data = {
                username: tempusername,
                password: input.password,
                email: input.email,
            })
                .then(res => {
                    Alert.alert('ลงทะเบียนสำเร็จ')
                    // _checkPermission()
                    API.post('/add_setting', data = {
                        username: tempusername,
                    })
                        .catch(error => {
                            console.log(error)
                        })
                    API.post('/add_token', data = {
                        username: tempusername,
                        token: '',
                    }).catch(error => {
                        console.log(error)
                    })
                    navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'Login'
                            }
                        ]
                    })
                })
                .catch(error => {
                    Alert.alert('ผิดพลาด')
                    console.log('Error')
                })
        }
        setInput({
            username: username,
            password: password,
            cfpassword: cfpassword,
            email: email,
        })

    }

    const checkUser = () => {
        if (input.username.length < 6) {
            setShowUser({ hide: false, color: '#FF0000', text: "ขออภัย Username ต้องมีความยาวระหว่าง 6 ถึง 15 ตัวอักษร" })
            return false
        }
        if (input.username[0] >= '0' && input.username[0] <= '9') {
            setShowUser({ hide: false, color: '#FF0000', text: "ขออภัย Username ต้องขึ้นต้นด้วยตัวอักษร" })
            return false
        }
        return true
    }

    const checkPass = () => {
        var letters = /[a-zA-Z]/
        var number = /[0-9]/
        if (input.password.length < 8) {
            setShowPass({ hide: false, color: '#FF0000', text: "ขออภัย Password ต้องมีความยาว 8 ตัวขึ้นไป" })
            return false
        }
        console.log('l', input.password.match(letters), 'n', input.password.match(number))
        if (!input.password.match(letters) || !input.password.match(number)) {
            setShowPass({ hide: false, color: '#FF0000', text: "ขออภัย Password ต้องมีตัวอักษรและตัวเลข" })
            return false
        }
        return true
    }

    const checkcfPass = () => {
        if (input.cfpassword !== input.password) {
            setShowcfPass({ ...showcfPass, hide: false })
            return false
        }
        return true
    }

    const checkEmail = () => {
        var emailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (!input.email.match(emailformat)) {
            setShowEmail({ hide: false, color: '#FF0000', text: "ขออภัยรูปแบบ Email ไม่ถูกต้อง" })
            return false
        }
        return true
    }




    const inputUser = (text) => {
        //Username สามารถใช้ อักษรภาษาอังกฤษ, 0-9, เท่านั้น  โดยมี 6-15 ตัว
        checktext = false
        if (text.length < 16) {
            if (text.length == 0) {
                setInput({ ...input, username: text })
            }
            else {
                checktext = checkInput(text[text.length - 1])
                if (checktext) {
                    //console.log(checkF)
                    setInput({ ...input, username: text })
                }
            }
        }
    }

    const inputPass = (text) => {
        // Password สามารถใช้ a-z, A-Z, 0-9,  เท่านั้น pass  และต้องผสมกัน โดยมี 8-50 ตัว
        checktext = false

        if (text.length < 50) {


            //console.log(text[text.length - 1])
            if (text.length == 0) {
                setInput({ ...input, password: text })
            }
            else {
                checktext = checkInput(text[text.length - 1])
                if (checktext) {
                    //console.log(checkF)
                    setInput({ ...input, password: text })
                }
            }

        }
    }

    const inputcfPass = (text) => {
        checktext = false

        if (text.length < 50) {


            //console.log(text[text.length - 1])
            if (text.length == 0) {
                setInput({ ...input, cfpassword: text })
            }
            else {
                checktext = checkInput(text[text.length - 1])
                if (checktext) {
                    //console.log(checkF)
                    setInput({ ...input, cfpassword: text })
                }
            }

        }
    }

    const inputEmail = (text) => {
        checktext = false

        if (text.length < 61) {


            //console.log(text[text.length - 1])
            checktext = checkInputE(text[text.length - 1])
            if (checktext || text.length == 0) {

                setInput({ ...input, email: text })

            }

        }
    }

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'ลงทะเบียน', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <ScrollView>
                <View style={styles.body}>
                    <View style={{ marginTop: hp('9.5%') }}>
                        <View style={styles.content}>
                            <View style={styles.Input}>
                                <View style={{ width: wp('8%'), height: wp('8%') }}>
                                    <Image source={require('../assets/profile-user.png')} style={styles.smallIcon} />
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    value={input.username}
                                    onFocus={() => setShowUser({ ...showUser, hide: false })}
                                    onBlur={() => setShowUser({
                                        text: "สามารถใช้อักษรภาษาอังกฤษ,ตัวเลข โดย Username ต้องขึ้นต้นด้วยตัวอักษรและมีจำนวน 6-15 ตัว",
                                        color: '#1D1414',
                                        hide: true
                                    })}
                                    //onFocus ={ ()=>{console.log('wow')}}
                                    onChangeText={inputUser}
                                    //onChangeText={(text) => setInput({ ...input, username: text })}                                    
                                    placeholder="Username"
                                />
                            </View>

                            {!showUser.hide ?
                                <Text style={[styles.textdetail, { color: showUser.color, }]}>{showUser.text}</Text>
                                :
                                <View></View>
                            }

                        </View>


                        <View style={styles.content}>
                            <View style={styles.Input}>
                                <View style={{ width: wp('8%'), height: wp('8%') }}>
                                    <Image source={require('../assets/padlock.png')} style={styles.smallIcon} />
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    value={input.password}
                                    //secureTextEntry={true}
                                    onFocus={() => setShowPass({ ...showPass, hide: false })}
                                    onBlur={() => setShowPass({
                                        text: "มีจำนวน 8 ตัวขึ้นไปที่มีทั้งตัวอักษรภาษาอังกฤษและตัวเลขผสมกัน",
                                        color: '#1D1414',
                                        hide: true
                                    })}
                                    onChangeText={inputPass}
                                    placeholder="Password"
                                />

                            </View>
                            {!showPass.hide ?
                                <Text style={[styles.textdetail, { color: showPass.color }]}>{showPass.text}</Text>
                                :
                                <View></View>
                            }
                        </View>

                        <View style={styles.content}>
                            <View style={styles.Input}>
                                <View style={{ width: wp('8%'), height: wp('8%') }}>
                                    <Image source={require('../assets/padlock.png')} style={styles.smallIcon} />
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    value={input.cfpassword}
                                    secureTextEntry={true}
                                    onFocus={() => setShowcfPass({ ...showcfPass, hide: true })}
                                    onChangeText={inputcfPass}
                                    placeholder="ยืนยัน Password"
                                />

                            </View>
                            {!showcfPass.hide ?
                                <Text style={[styles.textdetail, { color: showcfPass.color, }]}>{showcfPass.text}</Text>
                                :
                                <View></View>
                            }

                        </View>

                        <View style={styles.content}>
                            <View style={styles.Input}>
                                <View style={{ width: wp('8%'), height: wp('8%') }}>
                                    <Image source={require('../assets/email.png')} style={styles.smallIcon} />
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    value={input.email}
                                    keyboardType={'email-address'}
                                    onFocus={() => setShowEmail({ ...showEmail, hide: false })}
                                    onBlur={() => setShowEmail({
                                        text: "กรุณากรอก Email ที่ใช้งานจริง",
                                        color: '#1D1414',
                                        hide: true
                                    })}
                                    onChangeText={inputEmail}
                                    placeholder="E-mail"
                                />
                            </View>
                            {!showEmail.hide ?
                                <Text style={[styles.textdetail, { color: showEmail.color }]}>{showEmail.text}</Text>
                                :
                                <View></View>
                            }
                        </View>

                        <Button
                            title="ยืนยัน"
                            buttonStyle={[styles.btcf, styles.Shadow, { marginTop: hp('2.5%') }]}
                            onPress={validateAll}
                            titleStyle={{ fontSize: hp('2%') }}
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
        alignContent: 'center',
        marginBottom: hp('2.5%'),
    },
    Input: {
        flexDirection: 'row',
        //marginBottom: hp('1.5%'),
        backgroundColor: '#0E77BF',
        width: wp('80%'),
        height: hp('6%'),
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
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
        color: '#000',
        width: '80%',
        height: '75%',
        fontSize: hp('2.5%'),
        padding: 0,
        paddingLeft: 5,
        marginLeft: 10,
        backgroundColor: '#C4C4C4'
    },
    btcf: {
        alignSelf: 'center',
        backgroundColor: '#014D81',
        width: wp('40%'),
        height: hp('5%'),
        borderRadius: 15,
    },
    textAlert: {
        color: '#FF0000',
        fontSize: hp('1.5%'),
    },
    textdetail: {
        fontSize: hp('2%')
    }
})