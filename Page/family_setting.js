import React, { useState, useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, Switch, StyleSheet, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'
import { API } from './axios';
import { CategoryContext } from '../context_api/myContext';

export default function hifamily_settingstory({ navigation }) {

    const Context = useContext(CategoryContext)
    const [friendSetting, setFriendSetting] = useState(
        Context.friendSetting
    )
    const [dataUser, setDataUser] = useState(
        Context.dataUser
    )

    const [passed, setPassed] = useState('')

    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [isEnabled3, setIsEnabled3] = useState(false);
    const [isEnabled4, setIsEnabled4] = useState(false);

    const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
    const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
    const toggleSwitch4 = () => setIsEnabled4(previousState => !previousState);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        API.get("/get_acces", data = {
            params: {
                username: dataUser.Username,
                friend_user: friendSetting.Username,
            }
        })
            .then(res => {
                console.log(res.data[0])
                if (res.data[0]) {
                    setIsEnabled1(res.data[0].position_acces === 1)
                    setIsEnabled2(res.data[0].history_acces === 1)
                    setIsEnabled3(res.data[0].alert_acces === 1)
                    setIsEnabled4(res.data[0].friend_alert === 1)
                }

            })
            .catch(error => {
                console.log(error)
            })
        return () => backHandler.remove();
    }, [])

    const saveAPI = () => {
        API.post("/set_acces", data = {
            username: dataUser.Username,
            friend_user: friendSetting.Username,
            position_acces: isEnabled1,
            history_acces: isEnabled2,
            alert_acces: isEnabled3,
            friend_alert: isEnabled4
        })
            .then(res => {
                console.log("succes")
            })
            .catch(error => {
                console.log(error)
            })
    }

    const backAction = () => {
        console.log("Back test")
        saveAPI()
    }
    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => {
                backAction()
                navigation.navigate('Family')
            }}>
                <View style={{ width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('3%') }}>
                    <Image source={require('../assets/previous.png')} style={styles.iconhome} />
                </View>
            </TouchableOpacity>)
    }

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'สมาชิก', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.content}>
                        <View style={styles.box}>
                            <View style={styles.select}>
                                <Text style={styles.Text}>อนุญาตให้ดูตำแหน่งของคุณ</Text>
                                <Switch
                                    trackColor={{ false: "#014D81", true: "#42A4E7" }}
                                    thumbColor={"#FFFFFF"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch1}
                                    value={isEnabled1}
                                />
                            </View>
                            <View style={styles.select}>
                                <Text style={styles.Text}>อนุญาตให้ดูประวัติของคุณ</Text>
                                <Switch
                                    trackColor={{ false: "#014D81", true: "#42A4E7" }}
                                    thumbColor={"#FFFFFF"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch2}
                                    value={isEnabled2}
                                />
                            </View>
                            <View style={styles.select}>
                                <Text style={styles.Text}>อนุญาตให้ส่งแจ้งเตือนไปถึงเพื่อน</Text>
                                <Switch
                                    trackColor={{ false: "#014D81", true: "#42A4E7" }}
                                    thumbColor={"#FFFFFF"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch3}
                                    value={isEnabled3}
                                />
                            </View>
                            <View style={[styles.select, { borderBottomWidth: 0, }]}>
                                <Text style={styles.Text}>รับแจ้งเตือนจากเพื่อน</Text>
                                <Switch
                                    trackColor={{ false: "#014D81", true: "#42A4E7" }}
                                    thumbColor={"#FFFFFF"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch4}
                                    value={isEnabled4}
                                />
                            </View>

                        </View>

                    </View>
                    <Button
                        title="ลบสมาชิก"
                        buttonStyle={[styles.btnLogin, styles.Shadow, { marginTop: hp('2%'), width: wp('25%') }]}
                        // onPress={() => navigation.navigate('Family-Add')}
                        titleStyle={{ fontSize: hp('2%') }}
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
    listRow: {
        flexDirection: 'row',
        marginTop: hp('2%'),
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
    item: {
        width: wp('35%'),
        height: wp('35%'),
        backgroundColor: '#0E77BF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: '5%',
    },
    Text: {
        margin: '1%',
        color: '#ffff',
        fontSize: hp('2%')
    },
    select: {
        flexDirection: 'row',
        width: '95%',
        height: hp('6%'),
        // backgroundColor: '#0E77BF',
        justifyContent: 'space-between',
        alignItems: "center",
        alignSelf: 'center',
        // paddingStart: '5%',
        // paddingEnd: '3%',
        padding: 0,
        borderBottomWidth: 1,
        borderColor: '#fff',
    },
    box: {
        backgroundColor: '#014D81',
        marginTop: hp('2%'),
        borderRadius: 10,
        paddingBottom: 10,
        paddingTop: 10,
    },
    iconhome: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icondown: {
        width: '100%',
        height: '100%',
    },
    btnLogin: {
        alignSelf: 'center',
        backgroundColor: '#014D81',
        height: hp('5%'),
        borderRadius: 10,
    },
    checkboxStyle: {
        borderWidth: 1,
    },
})