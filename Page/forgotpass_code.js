import React, { useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'
import { API } from './axios';
import { CategoryContext } from '../context_api/myContext';



export default function forgotpass({ navigation }) {
    const Context = useContext(CategoryContext)
    const [UserReset, setUserReset] = useState(Context.UserReset)
    const [input, setInput] = useState('')

    const checkInput = (text) => {
        var letters = /^[0-9]+$/
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

    const inputcode = (text) => {
        //Username สามารถใช้ อักษรภาษาอังกฤษ, 0-9, เท่านั้น  โดยมี 6-15 ตัว
        checktext = false
        if (text.length < 7) {
            if (text.length == 0) {
                setInput(text)
            }
            else {
                checktext = checkInput(text[text.length - 1])
                if (checktext) {
                    //console.log(checkF)
                    setInput(text)
                }
            }
        }
    }

    const checkcode = () => {
        if (input === '') {
            Alert.alert('ผิดพลาด', 'กรุณากรอก code')
            return 
        }
        API.post('/send_code', data = {
            username: UserReset,
            code: parseInt(input)
        })
            .then(res => {
                navigation.replace('ForgotPass_reset')
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401) {
                    Alert.alert('ผิดพลาด', 'Code ไม่ถูกต้อง')
                    setInput('')
                }
            })
    }



    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={{ width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('4%') }}>
                    <Image source={require('../assets/previous.png')} style={styles.iconhome} />
                </View>
            </TouchableOpacity>)
    }

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'ลืมรหัสผ่าน', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />


            <ScrollView>
                <View style={styles.body}>
                    <View style={{ width: '80%' }} >
                        <Text style={[styles.Text, { marginTop: hp('3%') }]}>กรอก Code สำหรับตั้งรหัสผ่านใหม่ที่ส่งไปยัง Email ของคุณ</Text>
                    </View>


                    <View style={styles.Input}>
                        <Text style={{ fontSize: hp('2%'), marginLeft: 10 }}>ตัวเลขจำนวน 6 ตัว</Text>
                        <TextInput
                            style={styles.textInput}
                            value={input}
                            onChangeText={inputcode}
                            keyboardType='number-pad'
                        // placeholder="Username"
                        />
                    </View>
                    <Button
                        title="ยืนยัน"
                        buttonStyle={[styles.Shadow, styles.btnLogin, { marginTop: hp('7%') }]}
                        onPress={() => checkcode()}
                        titleStyle={{ fontSize: hp('2.25%') }}
                    />

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
        width: wp('100%'),
        alignItems: 'center',
        fontSize: hp('50%'),
    },
    content: {
        width: wp('80%'),
    },
    Input: {
        marginTop: hp('3%'),
        width: wp('80%'),
        height: hp('5%'),
        borderRadius: 10,
        justifyContent: 'center',
    },
    Shadow: {
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 12,
        },
        shadowOpacity: 0.8,
        shadowRadius: 16.00,

        elevation: 24,
    },
    textInput: {
        color: '#000',
        width: '100%',
        height: hp('5%'),
        fontSize: hp('2.25%'),
        paddingBottom: 0,
        borderRadius: 10,
        backgroundColor: '#C4C4C4'
    },
    btnLogin: {
        alignSelf: 'center',
        backgroundColor: '#014D81',
        width: wp('29%'),
        height: hp('6%'),
        borderRadius: 15,
    },
    Text: {
        margin: '2%',
        marginTop: '4%',
        color: '#12283D',
        fontSize: hp('2.25%'),
    },
    iconhome: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})