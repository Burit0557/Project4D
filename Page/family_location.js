import React, { useState, useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'
import { API } from './axios';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { CategoryContext } from '../context_api/myContext';

export default function history_detail({ navigation }) {
    const Context = useContext(CategoryContext)

    const [dataUser, setdataUser] = useState(
        Context.dataUser
    )

    const [friendSetting, setFriendSetting] = useState(
        Context.friendSetting
    )

    const [dataUserSetting, setdataUserSetting] = useState(
        Context.dataUserSetting
    )

    const [MyPlaces, setMyPlaces] = useState({
        latitude: 13.728567,
        longitude: 100.774061,
    })

    const [NoAcces, setNoAcces] = useState(true)
    const [api, setapi] = useState(false)
    const GOOGLE_MAPS_APIKEY = Context.GOOGLE_MAPS_APIKEY;

    useEffect(() => {
        API.get('/get_friend_acces', data = {
            params: {
                username: dataUser.Username,
                friend_user: friendSetting.Username,
            }
        })
            .then(result => {
                console.log(result.data)
                let data = result.data[0]
                if (data.position_acces === 1) {
                    API.get('/friend_location', data = {
                        params: {
                            username: friendSetting.Username
                        }
                    })
                        .then(result => {
                            console.log(result.data)
                            let data = result.data[0]
                            if (data) {
                                setMyPlaces({
                                    latitude: data.latitude ? data.latitude : 13.728567,
                                    longitude: data.longitude ? data.longitude : 100.774061,
                                })
                                setNoAcces(false)
                            }

                        })
                        .catch(error => {
                            console.log(error)
                            setNoAcces(true)
                        });
                }
                else {
                    setNoAcces(true)
                }
            })
            .catch(error => console.log(error));

    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            console.log("call API")
            API.get('/get_friend_acces', data = {
                params: {
                    username: dataUser.Username,
                    friend_user: friendSetting.Username,
                }
            })
                .then(result => {
                    console.log(result.data)
                    let data = result.data[0]
                    if (data.position_acces === 1) {
                        API.get('/friend_location', data = {
                            params: {
                                username: friendSetting.Username
                            }
                        })
                            .then(result => {
                                console.log(result.data)
                                let data = result.data[0]
                                if (data) {
                                    setMyPlaces({
                                        latitude: data.latitude ? data.latitude : 13.728567,
                                        longitude: data.longitude ? data.longitude : 100.774061,
                                    })
                                    setNoAcces(false)
                                }

                            })
                            .catch(error => {
                                console.log(error)
                                setNoAcces(true)
                            });
                    }
                    else {
                        setNoAcces(true)
                    }
                })
                .catch(error => console.log(error));
            setapi(true)
        }, 30000)
        return () => clearInterval(intervalId); //This is important
    }, [api, setapi])




    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
                centerComponent={{ text: 'ตำแหน่ง', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <View style={styles.body}>
                <View style={styles.content}>
                    <View style={{
                        width: wp('80%'), backgroundColor: '#0E77BF', alignItems: 'center',
                        height: hp('70%'), borderRadius: 10, marginTop: hp('5%')
                    }}>
                        <Text style={[styles.Text, { fontSize: hp('2.25%'), marginTop: hp('1%') }]}>ตำแหน่งปัจจุบันของ</Text>
                        <Text style={[styles.Text, { fontSize: hp('2.25%'), marginTop: hp('1%') }]}>{friendSetting.name === '' ? friendSetting.Username : friendSetting.name}</Text>
                        {NoAcces ?
                            <View style={{ height: hp('55%'), width: wp('80%'), marginTop: hp('1%'), alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
                                <Text style={[styles.Text, { fontSize: hp('2.25%'), marginTop: hp('1%'), color: '#000000' }]}>ไม่สามารถดูตำแหน่งปัจจุบันได้</Text>
                            </View>
                            :
                            <View style={{ height: hp('55%'), width: wp('80%'), marginTop: hp('1%') }}>
                                <MapView
                                    style={styles.map}
                                    provider={PROVIDER_GOOGLE}
                                    region={{
                                        latitude: MyPlaces.latitude,
                                        longitude: MyPlaces.longitude,
                                        latitudeDelta: 0.004,
                                        longitudeDelta: 0.004,
                                    }}
                                // showsUserLocation={true}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: MyPlaces.latitude,
                                            longitude: MyPlaces.longitude,
                                        }}

                                    />

                                </MapView>
                            </View>

                        }
                    </View>

                </View>
            </View>


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
    Text: {
        margin: '1%',
        color: '#ffff',
        fontSize: hp('2%')
    },
    iconhome: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})