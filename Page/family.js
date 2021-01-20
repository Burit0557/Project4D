import React, { useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'

export default function history({ navigation }) {
    data = [
        {
            number: 1,
            name: 'LetMePlay1'
        },
        {
            number: 2,
            name: 'LetMePlay2'
        },
        {
            number: 3,
            name: 'LetMePlay3'
        },

    ]
    const [passed, setPassed] = useState('')
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
                centerComponent={{ text: 'สมาชิก', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
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
                                    passed == item.name
                                        ?
                                        <View key={index} style={styles.box}>
                                            <TouchableOpacity onPress={() => setPassed('')} >
                                                <View style={{ flexDirection: 'row', }}>
                                                    <View style={[styles.leftCard, { backgroundColor: '#014D81' }]}>
                                                        <Text style={styles.Text}>{item.name}</Text>
                                                    </View>
                                                    <View style={styles.rightCard}>
                                                        <View style={{ width: wp('5%'), height: wp('5%'), color: '#fff', }}>
                                                            <Image source={require('../assets/down-arrow.png')} style={styles.icondown} />
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity >
                                                <View style={styles.select}>
                                                    <View style={{ width: wp('7%'), height: wp('7%'), color: '#fff', marginRight: '3%' }}>
                                                        <Image source={require('../assets/history.png')} style={styles.icondown} />
                                                    </View>
                                                    <Text style={styles.Text}>ประวัติ</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity >
                                                <View style={styles.select}>
                                                    <View style={{ width: wp('7%'), height: wp('7%'), color: '#fff', marginRight: '3%' }}>
                                                        <Image source={require('../assets/placeholder.png')} style={styles.icondown} />
                                                    </View>
                                                    <Text style={styles.Text}>ตำแหน่ง</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity >
                                                <View style={styles.select}>
                                                    <View style={{ width: wp('7%'), height: wp('7%'), color: '#fff', marginRight: '3%' }}>
                                                        <Image source={require('../assets/setting.png')} style={styles.icondown} />
                                                    </View>
                                                    <Text style={styles.Text}>ตั้งค่า</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <TouchableOpacity key={index} onPress={() => setPassed(item.name)} >
                                            <View style={styles.listRow}>
                                                <View style={styles.leftCard}>
                                                    <Text style={styles.Text}>{item.name}</Text>
                                                </View>
                                                <View style={styles.rightCard}>
                                                    <View style={{ width: wp('5%'), height: wp('5%'), color: '#fff', }}>
                                                        <Image source={require('../assets/down-arrow.png')} style={styles.icondown} />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                )
                            })
                        }
                    </View>
                    <Button
                        title="เพิ่มสมาชิก"
                        buttonStyle={[styles.btnLogin, styles.Shadow, { marginTop: hp('2%'), width: wp('25%') }]}
                        onPress={() => navigation.navigate('Family-Add')}
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
        width: wp('70%'),
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
        width: '80%',
        height: hp('6%'),
        margin: 0,
        backgroundColor: '#0E77BF',
        justifyContent: 'center',
        alignItems: "flex-start",
        paddingStart: '5%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    rightCard: {
        width: '20%',
        height: hp('6%'),
        margin: 0,
        backgroundColor: '#014D81',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,

    },
    select: {
        flexDirection: 'row',
        width: '100%',
        height: hp('6%'),
        backgroundColor: '#0E77BF',
        justifyContent: 'flex-start',
        alignItems: "center",
        paddingStart: '5%',
        marginBottom: 3,

    },
    box: {
        backgroundColor: '#014D81',
        marginTop: hp('2%'),
        borderRadius: 10,
        paddingBottom: 10,
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
})