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
    const [friendSetting, setFriendSetting] = useState(
        Context.friendSetting
    )

    const [Data, setData] = useState([])
    const [allData, setallData] = useState([])
    const [AllTempData, setAllTempData] = useState([])
    const [date, setDate] = useState({
        dateStart: '',
        dateEnd: ''
    })

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
                if (data.history_acces === 1) {
                    API.get('/get_history', data = {
                        params: {
                            username: friendSetting.Username
                        }
                    })
                        .then(result => {
                            console.log(result.data)
                            let data = result.data
                            if (result.data) {
                                data = data.sort(function (a, b) {
                                    return stringtonum(getdate_string(b.time)) - stringtonum(getdate_string(a.time))
                                })
                                setAllTempData(data)
                                GroupBy(data);
                                // setData(data);
                                // setallData(data);
                            }

                        })
                        .catch(error => console.log(error));
                }
                else {
                    setData([]);
                    setallData([]);
                }
            })
            .catch(error => console.log(error));
    }, []);

    getAll = () => {
        setData(allData)
        setDate({
            dateStart: '',
            dateEnd: ''
        })
        // for (i = 1; i <= 12; i++) {
        //     var temp =  new Date(2021, 2,i)
        //     API.post('/add_history', data = {
        //         username : dataUser.Username,
        //         latitude : 13.7286,
        //         langtitude : 100.774,
        //         time : temp
        //     })
        // }
    }

    searchData = () => {
        let temp1 = []
        if (date.dateStart === '' && date.dateEnd !== '') {
            temp1 = allData.filter(item => stringtonum(getdate_string(item.time)) <= stringtonum(date.dateEnd))
        }
        if (date.dateStart !== '' && date.dateEnd === '') {
            temp1 = allData.filter(item => stringtonum(getdate_string(item.time)) >= stringtonum(date.dateStart))
        }
        if (date.dateStart !== '' && date.dateEnd !== '') {
            temp1 = allData.filter(item => stringtonum(getdate_string(item.time)) >= stringtonum(date.dateStart))
            temp1 = temp1.filter(item => stringtonum(getdate_string(item.time)) <= stringtonum(date.dateEnd))
        }
        setData(temp1);
    }
    stringtonum = (str) => {
        let year = str.slice(7, 10)
        let month = str.slice(3, 5)
        let day = str.slice(0, 2)
        return parseInt(year) * 10000 + parseInt(month) * 100 + parseInt(day)
    }

    GroupBy = (data) => {
        groups = [];
        for (i = 0; i < data.length; i++) {
            if (!groups[getdate_string(data[i].time)]) {
                groups[getdate_string(data[i].time)] = data[i];
            }
        }
        groupArrays = Object.keys(groups).map((date) => {
            return {
              ...groups[date]
            };
          });
        console.log(groupArrays)
        setData(groupArrays);
        setallData(groupArrays);
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

    goTime = (data) => {
        console.log(data)
        groups = [];
        AllTempData.forEach(item =>{
            if(getdate_string(item.time) === getdate_string(data.time)){
                groups.push(item)
            }
        })
        console.log(groups)
        Context.setDataTime(data.time)
        Context.setHistoryTime(groups)
        navigation.navigate('History_time')
    }

    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Family')}>
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
                        borderRadius: 10
                    }}>
                        <Text style={[styles.Text, { fontSize: hp('2.5%') }]}>ประวัติของ</Text>
                        <Text style={[styles.Text, { fontSize: hp('2.5%') }]}>{friendSetting.name === '' ? friendSetting.Username : friendSetting.name}</Text>
                    </View>
                    <View style={{ width: wp('80%'), flexDirection: 'row', marginTop: hp('5%') }} >
                        <DatePicker
                            style={styles.dateStyle}
                            customStyles={{
                                dateText: {
                                    marginLeft: 36,
                                    fontSize: hp('2.25%'),
                                    //color: '#fff'
                                },
                                placeholderText: {
                                    fontSize: hp('2.25%'),
                                    color: 'rgba(0, 0, 0, 0.55)'

                                },
                                dateInput: {
                                    borderWidth: 0,
                                },
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                }
                            }}
                            allowFontScaling={true}
                            date={date.dateStart}
                            mode="date"
                            placeholder="เลือกวัน"
                            format="DD-MM-YYYY"
                            minDate="01-01-2021"
                            maxDate="31-12-2031"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={true}
                            onDateChange={(temp) => { setDate({ ...date, dateStart: temp }) }}
                        />
                        <View style={{ width: '8%', marginHorizontal: '2%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: hp('2.25'), alignSelf: 'center' }}>ถึง</Text>
                        </View>
                        <DatePicker
                            style={styles.dateStyle}
                            customStyles={{
                                dateText: {
                                    marginLeft: 36,
                                    fontSize: hp('2.25%'),
                                    //color: '#fff'
                                },
                                placeholderText: {
                                    fontSize: hp('2.25%'),
                                    color: 'rgba(0, 0, 0, 0.55)'
                                },
                                dateInput: {
                                    borderWidth: 0,
                                },
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                }
                            }}
                            allowFontScaling={false}
                            date={date.dateEnd}
                            mode="date"
                            placeholder="เลือกวัน"
                            format="DD-MM-YYYY"
                            minDate="01-01-2021"
                            maxDate="31-12-2031"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={true}
                            onDateChange={(temp) => { setDate({ ...date, dateEnd: temp }) }}
                        />

                    </View>
                    <View style={{ width: wp('80%'), flexDirection: 'row', marginTop: hp('2%'), marginBottom: hp('3%'), }} >
                        <Button
                            title="ดูทั้งหมด"
                            buttonStyle={[styles.btn, styles.Shadow, {}]}
                            onPress={() => { getAll() }}
                            titleStyle={styles.textbt}
                        />
                        <View style={{ width: '8%', marginHorizontal: '2%' }}></View>
                        <Button
                            title="ค้นหา"
                            buttonStyle={[styles.btn, styles.Shadow,]}
                            onPress={() => { searchData() }}
                            titleStyle={styles.textbt}
                        />
                    </View>

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
                                        <TouchableOpacity key={index} onPress={() => goTime(item)}>
                                            <View style={styles.listRow}>
                                                <View style={styles.leftCard}>
                                                    <Text style={styles.Text}>วัน-เดือน-ปี</Text>
                                                    <Text style={styles.Text}>{getdate_string(item.time)}</Text>
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

                {/* </View>
                </View> */}
                <View style={{ height: hp('10%') }}>

                </View>
            </ScrollView>
            {/* </ScrollView> */}

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