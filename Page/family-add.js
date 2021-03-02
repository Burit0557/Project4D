import React, { useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Button, Image, Icon, Header, Avatar } from 'react-native-elements'

export default function history({ navigation }) {
    data = [
        {
            number: 4,
            name: 'LetMePlay4'
        },
        {
            number: 5,
            name: 'LetMePlay5'
        },
        {
            number: 6,
            name: 'LetMePlay6'
        },

    ]
    const [input, setInput] = useState({
        username: ''
    })
    const [found, setFound] = useState(false)
    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Family')}>
                <View style={{ width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('3%') }}>
                    <Image source={require('../assets/previous.png')} style={styles.iconhome} />
                    {/* <Icon name='chevron-back' type='ionicon' color='#fff' size={wp('8%')} /> */}
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
                            <Text style={[styles.Text, { alignSelf: 'center', marginTop: '3%', marginBottom: '3%' }]}>คำขอเป็นสมาชิก</Text>
                            {data.map((itam, index) => {
                                return (<View key={index} style={styles.select}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={[styles.profile, { backgroundColor: '#c4c4c4', marginRight: '5%' }]}>
                                            <Image source={require('../assets/profile-user.png')} style={styles.profile} />
                                        </View>
                                        <Text style={styles.Text}>{itam.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Button
                                            title="ยอมรับ"
                                            buttonStyle={[styles.btnCF, { backgroundColor: '#49BB21', }]}
                                            // onPress={() => navigation.navigate('Login')}
                                            titleStyle={{ fontSize: hp('1.5%') }}
                                        /><Button
                                            title="ปฏิเสธ"
                                            buttonStyle={[styles.btnCF, { backgroundColor: '#EA2626', }]}
                                            // onPress={() => navigation.navigate('Login')}
                                            titleStyle={{ fontSize: hp('1.5%') }}
                                        />
                                    </View>
                                </View>
                                )
                            }
                            )}

                        </View>
                        <View style={[styles.seachbox, { backgroundColor: '#0E77BF', }]}>
                            <TextInput
                                style={styles.textInput}
                                value={input.username}
                                onChangeText={(text) => setInput({ ...input, username: text })}
                                placeholder="Username"
                                placeholderTextColor='rgba(255, 255, 255, 0.5)'
                            />
                            <TouchableOpacity style={styles.btnSeachbox} onPress={() => setFound(true)}>
                                <Icon name='search' type='Fontisto' color='#fff' size={hp('5%')} />
                            </TouchableOpacity>
                        </View>
                        {
                            found ?
                                <View style={{ alignItems: 'center', marginTop: '10%' }}>
                                    <View style={[styles.profile2, { backgroundColor: '#c4c4c4', }]}>
                                        {/* <Image source={require('../assets/profile-user.png')} style={styles.profile2} /> */}
                                    </View>
                                    <Text style={[styles.Text, { color: '#014D81', marginTop: '5%' }]}>NAME123456789</Text>
                                    <Button
                                        title="เพิ่มสมาชิก"
                                        buttonStyle={[styles.btnAdd, styles.Shadow, { marginTop: hp('2%'), width: wp('22%') }]}
                                        onPress={() => loginFunction()}
                                        titleStyle={{ fontSize: hp('2%') }}
                                    />
                                </View>
                                :
                                <View></View>
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
        width: wp('75%'),
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
    btnSeachbox: {
        backgroundColor: '#014D81',
        width: '20%',
        height: '100%',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text: {
        margin: '1%',
        color: '#ffff',
        fontSize: hp('2%')
    },
    select: {
        flexDirection: 'row',
        width: '100%',
        height: hp('6%'),
        backgroundColor: '#0E77BF',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingStart: '5%',
        marginBottom: 3,

    },
    textInput: {
        width: '80%',
        color: '#ffffff',
        height: hp('4%'),
        fontSize: hp('3%'),
        padding: 0,
        // borderWidth: 1,
    },
    seachbox: {
        flexDirection: 'row',
        height: hp('6%'),
        marginTop: hp('3%'),
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingStart: '10%',
        paddingTop: 0,

    },
    box: {
        backgroundColor: '#014D81',
        marginTop: hp('2%'),
        borderRadius: 15,
        paddingBottom: 15,
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
    btnAdd: {
        backgroundColor: '#49BB21',
        height: hp('4%'),
        borderRadius: 25,
    },
    btnCF: {
        height: hp('2.5%'),
        width: wp('15%'),
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '3%',
    },
    profile: {
        borderRadius: 64,
        height: hp('4.5%'),
        width: hp('4.5%'),
    },
    profile2: {
        borderRadius: 64,
        height: hp('10%'),
        width: hp('10%'),
    },
})