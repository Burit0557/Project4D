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
    const [historyDetail, setHistoryDetail] = useState(
        Context.historyDetail
    )

    const [Data, setData] = useState([])
    const [allData, setallData] = useState([])
    const [date, setDate] = useState({
        dateStart: '',
        dateEnd: ''
    })
    const GOOGLE_MAPS_APIKEY = Context.GOOGLE_MAPS_APIKEY;

    useEffect(() => {

    }, []);

    getdate_string = (str) => {
        let date = new Date(str)
        // let time = Date.parse(date);
        // time = time + (7 * 3600 * 1000)
        // date = new Date(time)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        return `${day}-${month}-${year}`
    }

    gettime_string = (str) => {
        let date = new Date(str)
        // let time = Date.parse(date);
        // time = time + (7 * 3600 * 1000)
        // date = new Date(time)
        let hours = date.getHours()
        let minute = date.getMinutes()
        if (hours < 10) {
            hours = '0' + hours
        }
        if (minute < 10) {
            minute = '0' + minute
        }
        return `${hours} : ${minute}`
    }

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
                centerComponent={{ text: 'ประวัติ', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <View style={styles.body}>
                <View style={styles.content}>
                    <View style={{
                        width: wp('80%'), flexDirection: 'row', backgroundColor: '#0E77BF',
                        height: hp('10%'), borderRadius: 10, marginTop: hp('5%')
                    }} >
                        <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={[styles.Text, { fontSize: hp('2.25%') }]}>วัน-เดือน-ปี</Text>
                            <Text style={[styles.Text, { fontSize: hp('2.25%') }]}>{getdate_string(historyDetail.time)}</Text>
                        </View>
                        <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={[styles.Text, { fontSize: hp('2.25%') }]}>เวลา</Text>
                            <Text style={[styles.Text, { fontSize: hp('2.25%') }]}>{gettime_string(historyDetail.time)}</Text>
                        </View>

                    </View>
                    <View style={{
                        width: wp('80%'), backgroundColor: '#0E77BF', alignItems: 'center',
                        height: hp('60%'), borderRadius: 10, marginTop: hp('5%')
                    }}>
                        <Text style={[styles.Text, { fontSize: hp('2.25%'), marginTop: hp('1%') }]}>ตำแหน่งที่มีการหลับ</Text>
                        <View style={{ height: hp('50%'), width: wp('80%'), marginTop: hp('1%') }}>
                            <MapView
                                style={styles.map}
                                provider={PROVIDER_GOOGLE}
                                region={{
                                    latitude: historyDetail.latitude, //historyDetail.latitude ? historyDetail.latitude : 0,//historyDetail.latitude, 
                                    longitude: historyDetail.longitude,//historyDetail.longitude ? historyDetail.longitude : 0,//historyDetail.longitude,
                                    latitudeDelta: 0.004,
                                    longitudeDelta: 0.004,
                                }}
                            // showsUserLocation={true}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: historyDetail.latitude,
                                        longitude: historyDetail.longitude,
                                    }}

                                />

                            </MapView>
                        </View>
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
    leftCard: {
        width: '70%',
        height: hp('10%'),
        margin: 0,
        backgroundColor: '#0E77BF',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    rightCard: {
        width: '30%',
        height: hp('10%'),
        margin: 0,
        backgroundColor: '#014D81',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,

    },
    iconhome: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateStyle: {
        height: hp('6%'),
        flex: 1,
        //backgroundColor: '#fff',
        color: 'white',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    btn: {
        //alignSelf: 'center',
        backgroundColor: '#014D81',
        width: wp('35.2%'),
        height: hp('6%'),
        borderRadius: 10,
        //borderWidth:1
    },
    textbt: {
        fontSize: hp('2.25%')
    },
    textshow: {
        color: '#000',
        fontSize: hp('2.25%'),
        paddingBottom: 0,
        textAlign: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})