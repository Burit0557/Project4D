import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'

export default function home({ navigation }) {
    data = [
        {
            number: 1,
            name: 'a'
        },
        {
            number: 2,
            name: 'a'
        },
        {
            number: 3,
            name: 'a'
        },
        {
            number: 4,
            name: 'a'
        },
        {
            number: 5,
            name: 'a'
        },
        {
            number: 6,
            name: 'a'
        },
        {
            number: 7,
            name: 'a'
        },
        {
            number: 8,
            name: 'a'
        },
        {
            number: 9,
            name: 'a'
        },
        {
            number: 10,
            name: 'a'
        },
    ]

    
    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                // leftContainerStyle={{ marginBottom: '5%' }}
                leftComponent={{ style: { borderWidth: 1, width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('3%') } }}
                centerComponent={{ text: 'ดูประวัติ', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.content}>
                        {
                            data.map((item, index) => {
                                return (
                                    < View key={index} style={styles.listRow}>
                                        <View style={styles.leftCard}>
                                            <Text style={styles.Text}>วัน-เดือน-ปี</Text>
                                            <Text style={styles.Text}>{item.number}</Text>
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
})