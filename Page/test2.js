/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */

import React, {
    useState,
    useEffect,
} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    NativeModules,
    NativeEventEmitter,
    Button,
    Platform,
    PermissionsAndroid,
    FlatList,
    TouchableHighlight,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';


import RNBluetoothClassic, {
    BluetoothDevice
} from 'react-native-bluetooth-classic';

// import { BleManager } from 'react-native-ble-plx';

const App = () => {
    const [isScanning, setIsScanning] = useState(false);
    const peripherals = new Map();
    const [list, setList] = useState([]);
    const [Ble, setBle] = useState({})


    const startScan = async () => {
        console.log('DeviceListScreen::getBondedDevices');
        try {

            bonded = await RNBluetoothClassic.getBondedDevices();
            console.log('DeviceListScreen::getBondedDevices found', bonded);

            setList(bonded)
            // device = bonded[2]
            // device.connect()
            // device.write('Q', "ascii")
            // try {
            //     address = bonded[7].address
            //     console.log("address", address)
            //     device = await RNBluetoothClassic.getConnectedDevice(address);
            //     if (device.isConnected()) {
            //         console.log("cccccccc")
            //     }
            // } catch (err) {
            //     console.log(err)
            // }
            // ""address": "60:F4:45:63:F5:9D"
        } catch (error) {
            setList([]);
            console.log(error)
        }
    }

    const handleStopScan = () => {
        console.log('Scan is stopped');
        setIsScanning(false);
    }

    const handleDisconnectedPeripheral = (data) => {
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);
            setList(Array.from(peripherals.values()));
        }
        console.log('Disconnected from ' + data.peripheral);
    }

    const handleUpdateValueForCharacteristic = (data) => {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    }

    const retrieveConnected = () => {
        BleManager.getConnectedPeripherals([]).then((results) => {
            if (results.length == 0) {
                console.log('No connected peripherals')
            }
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var peripheral = results[i];
                peripheral.connected = true;
                peripherals.set(peripheral.id, peripheral);
                setList(Array.from(peripherals.values()));
            }
        });
    }

    const handleDiscoverPeripheral = (peripheral) => {
        console.log('Got ble peripheral', peripheral);
        if (!peripheral.name) {
            peripheral.name = 'NO NAME';
        }
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
    }

    const testPeripheral = async (peripheral) => {
        try {

            peripheral.connect()
                .then(res => {
                    peripheral.onDataReceived((data) => onReceivedData(data))
                })


            
            setBle(peripheral)
            // console.log(device)
        }
        catch (error) {
            console.log(error)
        }

    }

    const writeData = () => {
        Ble.write(" ear 1258 ", "ascii")
    }
    const onReceivedData = (data) => {
        console.log(data)
    }

    const checkConnect = (event) => {
        console.log(event.device)
    }

    useEffect(() => {
        // if (Platform.OS === 'android' && Platform.Version >= 23) {
        //     PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
        //         if (result) {
        //             console.log("Permission is OK");
        //         } else {
        //             PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
        //                 if (result) {
        //                     console.log("User accept");
        //                 } else {
        //                     console.log("User refuse");
        //                 }
        //             });
        //         }
        //     });
        // }
        //console.log('test')
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
            if (result) {
                console.log("Permission is OK");
            } else {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                    if (result) {
                        console.log("User accept");
                    } else {
                        console.log("User refuse");
                    }
                });
            }
        });




        //console.log(BluetoothDevice.isConnected())

        // if (Platform.OS === 'android' && Platform.Version >= 29) {
        //     PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
        //         if (result) {
        //             console.log("Permission is OK");
        //         } else {
        //             PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
        //                 if (result) {
        //                     console.log("User accept");
        //                 } else {
        //                     console.log("User refuse");
        //                 }
        //             });
        //         }
        //     });
        // }

        return (() => {
            console.log('unmount');
        })
    }, []);

    const renderItem = (item) => {
        // console.log(item)
        const color = item.connected ? 'green' : '#fff';
        return (
            <TouchableHighlight onPress={() => testPeripheral(item)}>
                <View style={[styles.row, {}]}>
                    <Text style={{ fontSize: 12, textAlign: 'center', color: '#333333', padding: 10, backgroundColor: color }}>{item.name}</Text>
                    <Text style={{ fontSize: 10, textAlign: 'center', color: '#333333', padding: 2 }}>RSSI: {item.rssi}</Text>
                    <Text style={{ fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20 }}>{item.id}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    {global.HermesInternal == null ? null : (
                        <View style={styles.engine}>
                            <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                    )}
                    <View style={styles.body}>

                        <View style={{ margin: 10 }}>
                            <Button
                                title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
                                onPress={() => startScan()}
                            />
                        </View>

                        <View style={{ margin: 10 }}>
                            <Button title="Retrieve connected peripherals" onPress={() => retrieveConnected()} />
                        </View>

                        <View style={{ margin: 10 }}>
                            <Button title="Write" onPress={() => writeData()} />
                        </View>

                        {(list.length == 0) &&
                            <View style={{ flex: 1, margin: 20 }}>
                                <Text style={{ textAlign: 'center' }}>No peripherals</Text>
                            </View>
                        }

                    </View>
                </ScrollView>
                <FlatList
                    data={list}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;