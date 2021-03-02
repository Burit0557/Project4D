import React, { useState, useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'
import axios from 'axios';

export default function history({ navigation }) {
    data = [
        {
            time: 1,
            name: 'a'
        },
        {
            time: 2,
            name: 'a'
        },
        {
            time: 3,
            name: 'a'
        },
        {
            time: 4,
            name: 'a'
        },
        {
            time: 5,
            name: 'a'
        },
        {
            time: 6,
            name: 'a'
        },
        {
            time: 7,
            name: 'a'
        },
        {
            time: 8,
            name: 'a'
        },
        {
            time: 9,
            name: 'a'
        },
        {
            time: 10,
            name: 'a'
        },
    ]

    const [Data, setData] = useState(data)

    useEffect(() => {
        // async function fetchData() {
        // const result = await axios.get('161.246.5.53/api/history');
        // console.log(result.data)
        // setData(result.data);
        // }

        // fetchData();
        axios.get('http://161.246.5.138:443/api/history')
            .then(result => {
                console.log(result.data)
                let data = result.data
                data = data.sort(function(a, b) {
                    return a.time - b.time
                })
                console.log("sortttttttttttttttt")
                console.log(data)
                setData(data);
            })
            .catch(error => console.log(error));

    }, []);

    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
                centerComponent={{ text: 'ดูประวัติ', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.content}>
                        {
                            Data.map((item, index) => {
                                return (
                                    < View key={index} style={styles.listRow}>
                                        <View style={styles.leftCard}>
                                            <Text style={styles.Text}>วัน-เดือน-ปี</Text>
                                            <Text style={styles.Text}>{item.time}</Text>
                                        </View>
                                        <View style={styles.rightCard}>
                                            <Text style={styles.Text}>รายละเอียด</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
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
})