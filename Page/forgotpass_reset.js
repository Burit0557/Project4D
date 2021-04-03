import React, { useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'
import { API } from './axios';
import { CategoryContext } from '../context_api/myContext';

export default function register({ navigation }) {
    const Context = useContext(CategoryContext)
    const [UserReset, setUserReset] = useState(Context.UserReset)
    const [input, setInput] = useState({
        password: '',
        cfpassword: '',
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





    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={{ width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('3%') }}>
                    <Image source={require('../assets/previous.png')} style={styles.smallIcon} />
                </View>
            </TouchableOpacity>)
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

    const validateAll = () => {
        if (input.password === '' || input.cfpassword === '') {
            Alert.alert(
                "เปลี่ยนรหัสผ่านไม่สำเร็จ",
                "กรุณากรอกข้อมูลให้ครบทุกช่อง",
                [
                    { text: "ตกลง" }
                ],
                { cancelable: true }
            );
            return
        }

        let conditionPass = checkPass()
        let conditioncfPass = checkcfPass()
        let { password, cfpassword} = input

        if (!conditionPass) {
            password = ''
            cfpassword = ''
        }
        if (!conditioncfPass) {
            cfpassword = ''
        }

        if (conditionPass && conditioncfPass ) {
            console.log('success')
            API.post('/reset_password', data = {
                username : UserReset,
                new_password : input.password
            })
                .then(res => {
                    Alert.alert('เปลี่ยนรหัสผ่านสำเร็จ')
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
            password: password,
            cfpassword: cfpassword,
        })

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


    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'ลืมรหัสผ่าน', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                backgroundColor='#014D81'
            />
            <ScrollView>
                <View style={styles.body}>

                    <View style={{ width: '80%' }} >
                        <Text style={[styles.Text, { marginTop: hp('3%') }]}>กรุณาตั้งรหัสผ่านใหม่</Text>
                    </View>
                    <View style={{ marginTop: hp('3%') }}>

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

                        <Button
                            title="ยืนยัน"
                            buttonStyle={[styles.btcf, styles.Shadow, { marginTop: hp('2.5%') }]}
                            onPress={ () => validateAll()}
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
        width: wp('29%'),
        height: hp('6%'),
        borderRadius: 15,
    },
    textdetail: {
        fontSize: hp('2%')
    },
    Text: {
        margin: '2%',
        marginTop: '4%',
        color: '#12283D',
        fontSize: hp('2.25%'),
        textAlign :'center'
    },
})