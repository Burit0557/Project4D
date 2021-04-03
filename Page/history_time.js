import React, { useState, useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'
import { API } from './axios';
import DatePicker from 'react-native-datepicker'

import { CategoryContext } from '../context_api/myContext';

export default function history({ navigation }) {
    const Context = useContext(CategoryContext)

    const [dataUser, setdataUser] = useState(
        Context.dataUser
    )
    const [DataTime, setDataTime] = useState(
        Context.DataTime
    )

    const [Data, setData] = useState([])


    useEffect(() => {
        temp =   Context.historyTime.sort(function (a, b) {
            return stringtonum(gettime_string(b.time)) - stringtonum(gettime_string(a.time))
        })
        console.log(temp)
        setData(temp)
    }, []);

    stringtonum = (str) => {
        let minute = str.slice(4, 6)
        let hours = str.slice(0, 3)
        return parseInt(hours) * 60 + parseInt(minute)
    }

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

    goDetail = (data) => {
        console.log(data)
        Context.setHistoryDetail(data)
        navigation.navigate('History_detail')
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
            {/* <ScrollView> */}
            <View style={styles.body}>
                <View style={styles.content}>
                    <View style={{
                        width: wp('80%'), height: hp('10%'), marginTop: hp('5%'),
                        alignItems: 'center', justifyContent: 'center', backgroundColor: '#014D81',
                        borderRadius: 10, marginBottom: hp('3%'),
                    }}>
                        <Text style={[styles.Text, { fontSize: hp('2.5%') }]}>การง่วงนอน</Text>
                        <Text style={[styles.Text, { fontSize: hp('2.5%') }]}>{`วันที่ ${getdate_string(DataTime)}`}</Text>
                    </View>

                </View>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.content}>
                            {
                                Data.length === 0 ?
                                    <View style={{ alignSelf: 'center' }}><Text style={styles.textshow}>ไม่มีประวัติการง่วงนอน</Text></View>
                                    :
                                    Data.map((item, index) => {
                                        return (
                                            <TouchableOpacity key={index} onPress={() => goDetail(item)}>
                                                <View style={styles.listRow}>
                                                    <View style={styles.leftCard}>
                                                        <Text style={styles.Text}>ชั่วโมง-นาที</Text>
                                                        <Text style={styles.Text}>{gettime_string(item.time)}</Text>
                                                    </View>
                                                    <View style={styles.rightCard}>
                                                        <Text style={styles.Text}>รายละเอียด</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                            }

                        </View>
                    </View>


                    <View style={{ height: hp('10%') }}>

                    </View>
                </ScrollView>
            </View >
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
})