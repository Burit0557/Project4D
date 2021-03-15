import React, { useState, useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements'
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import RNBluetoothClassic, {
    BluetoothDevice
} from 'react-native-bluetooth-classic';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export default function home({ navigation }) {
    const [MyPlaces, setMyPlaces] = useState(0);


    useEffect( () => {
        notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.DISMISSED:
                    console.log('User dismissed notification', detail.notification);
                    break;
                case EventType.PRESS:
                    console.log('User pressed notification', detail.notification);
                    navigation.navigate('Family-Location')
                    break;
            }
        })
        checkOpen()
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
        })
            .catch((err) => {
                console.log(err)
                // The user has not accepted to enable the location services or something went wrong during the process
                // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
                // codes :
                //  - ERR00 : The user has clicked on Cancel button in the popup
                //  - ERR01 : If the Settings change are unavailable
                //  - ERR02 : If the popup has failed to open
                //  - ERR03 : Internal error
            });

    }, [])

    async function checkOpen() {
        try {
            let enabled = await RNBluetoothClassic.isBluetoothEnabled();
            if (enabled) {
                connect()
            }
            else {
                Alert.alert(
                    "กรุณาเปิด Bluetooth",
                    "เพื่อใช้งานร่วมกับตัวกล้อง",
                    [
                        {
                            text: "ไม่ล่ะ,ขอบคุณ",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        {
                            text: "เปิด", onPress: () => {
                                BluetoothStateManager.enable().then((result) => {
                                    console.log("Bluetooth turn on")
                                    connect()
                                });
                            }
                        }
                    ],
                    { cancelable: false }
                );
            }

        } catch (err) {
            // Handle accordingly
        }
    }

    async function connect() {
        try {
            let bonded = await RNBluetoothClassic.getBondedDevices();
            // console.log('DeviceListScreen::getBondedDevices found', bonded);
            let bluetoothname = Context.bluetooth_name
            let peripheral = bonded.find(element => element.name === bluetoothname);
            console.log(peripheral)
            peripheral.connect()
                .then(res => {
                    peripheral.onDataReceived((data) => onReceivedData(data))
                    let EAR = Context.EAR
                    peripheral.write(` EAR ${EAR}`)
                    peripheral.write("end")
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    const onReceivedData = (data) => {
        console.log(data)
        // Alert.alert('From Bluetooth', data.data)
        API.post("/post_noti")
    }


    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                // leftContainerStyle={{ marginBottom: '5%' }}
                leftComponent={{ Icon: 'g_translate', color: '#fff', }}
                centerComponent={{ text: 'NAME’s App', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <View style={styles.body}>
                <View style={styles.content}>
                    <View style={[styles.listRow, { marginTop: '10%' }]}>
                        <TouchableOpacity onPress={() => navigation.navigate('Jouney_home')}>
                            <View style={[styles.item, styles.Shadow]}>
                                <Image
                                    style={styles.iconhome}
                                    source={require('../assets/placeholder.png')}

                                />
                                <Text style={styles.Text}>เดินทางไกล</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Family')}>
                            <View style={[styles.item, styles.Shadow]}>
                                <Image source={require('../assets/user-1.png')} style={styles.iconhome} />
                                <Text style={styles.Text}>สมาชิก</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.listRow}>
                        <TouchableOpacity onPress={() => navigation.navigate('History')}>
                            <View style={[styles.item, styles.Shadow]}>
                                <Image source={require('../assets/history.png')} style={styles.iconhome} />
                                <Text style={styles.Text}>ประวัติ</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                            <View style={[styles.item, styles.Shadow]}>
                                <Image source={require('../assets/setting.png')} style={styles.iconhome} />
                                <Text style={styles.Text}>ตั้งค่า</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <Button
                    title="test"
                    buttonStyle={[styles.btnLogin, styles.Shadow, { marginTop: hp('2%'), width: wp('50%') }]}
                    onPress={() => navigation.navigate('Login')}
                    titleStyle={{ fontSize: hp('2%') }}
                /> */}
            </View>


        </View>


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
        height: hp('90%'),
        width: wp('100%'),
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#00ff00',
        fontSize: hp('50%')
    },
    content: {
        width: wp('80%'),
        height: wp('80%'),
        // alignItems : 'stretch',
        // alignItems: 'center',
        // backgroundColor: '#00ffff',
    },
    listRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // marginTop: '2%'
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
        margin: '2%',
        marginTop: '4%',
        color: '#ffff',
        fontSize: hp('2%')
    },
    iconhome: {
        width: '70%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    }
})