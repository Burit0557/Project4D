import React, { useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { CategoryContext } from '../context_api/myContext';
import { API } from './axios';



export default function setting({ navigation }) {
    const Context = useContext(CategoryContext)
    const [dataUser, setdataUser] = useState(
        Context.dataUser
    )


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
            await AsyncStorage.removeItem('@dataUserSetting');
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
                        API.post('/up_token', data = {
                            username: dataUser.Username,
                            token: ''
                        })
                        setlogin()
                        navigation.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'Login'
                                }
                            ]
                        })
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
    Text: {
        margin: '2%',
        marginTop: '4%',
        color: '#ffff',
        fontSize: hp('2.5%')
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
    iconbt: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})