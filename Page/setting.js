import React, { useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { CategoryContext } from '../context_api/myContext';



export default function setting({ navigation }) {



    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <View style={{ width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('4%') }}>
                    <Image source={require('../assets/previous.png')} style={styles.iconbt} />
                </View>
            </TouchableOpacity>)
    }

    const setlogin = async () => {
        //dataUser = JSON.stringify(dataUser)
        try {
            await AsyncStorage.setItem('@login', 'false')
            await AsyncStorage.removeItem('@dataUser');
            console.log('saveData successfully saved')
        } catch (e) {
            console.log('Failed to save the saveData to the storage')
        }
    }

    const cflogout = () =>
        Alert.alert(
            "ออกจากระบบ",
            "ต้องออกจากระบบใช่หรือไม่",
            [
                {
                    text: "ยกเลิก",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "ยืนยัน", onPress: () => {
                        setlogin()
                        navigation.navigate('Login')
                    }
                }
            ],
            { cancelable: false }
        );

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'ตั้งค่า', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <ScrollView>
                <View style={styles.body}>

                    <View style={{ marginTop: hp('5%') }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Setting_profile')}>
                            <View style={styles.bgbutton}>
                                <View style={{ width: wp('8%'), height: wp('8%'), marginRight: '3%' }}>
                                    <Image source={require('../assets/User_setting.png')} style={styles.iconbt} />
                                </View>
                                <Text style={styles.Text}>โปรไฟล์</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Setting_device')}>
                            <View style={styles.bgbutton}>
                                <View style={{ width: wp('8%'), height: wp('8%'), marginRight: '3%' }}>
                                    <Image source={require('../assets/device.png')} style={styles.iconbt} />
                                </View>
                                <Text style={styles.Text}>อุปกรณ์</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { cflogout() }} >
                            <View style={styles.bgbutton}>
                                <View style={{ width: wp('8%'), height: wp('8%'), marginRight: '3%' }}>
                                    <Image source={require('../assets/logout.png')} style={styles.iconbt} />
                                </View>
                                <Text style={styles.Text}>ออกจากระบบ</Text>
                            </View>
                        </TouchableOpacity>
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
        fontSize: hp('50%'),


    },
    content: {
        width: wp('80%'),
    },
    Input: {
        // flexDirection: 'row',
        marginTop: hp('3%'),
        // backgroundColor: '#0E77BF',
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
    smallIcon: {
        width: hp('5%'),
        height: hp('5%'),
        borderWidth: 1,
        marginLeft: wp('2%')
    },
    textInput: {
        color: '#000',
        width: '100%',
        height: '80%',
        fontSize: hp('3%'),
        paddingBottom: 0,
        // marginLeft: 10,
        backgroundColor: '#C4C4C4'
    },
    btnLogin: {
        alignSelf: 'center',
        backgroundColor: '#014D81',
        width: wp('30%'),
        height: hp('5%'),
        borderRadius: 10,


    },
    Text: {
        margin: '2%',
        marginTop: '4%',
        color: '#ffff',
        fontSize: hp('2%')
    },
    bgbutton: {
        width: wp('100%'),
        height: hp('8%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingStart: '5%',
        borderRadius: 0,
        marginBottom: '0.2%',
        backgroundColor: '#0E77BF',

    },
    test: {
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
    iconbt: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})