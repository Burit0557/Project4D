import React, { useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'

export default function register({ navigation }) {
    const [input, setInput] = useState({
        username: '',
        password: '',
        email: '',
    })


    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={{ width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('3%') }}>
                    <Image source={require('../assets/previous.png')} style={styles.smallIcon} />
                </View>
            </TouchableOpacity>)
    }
    cfregister = () => {
        check = true
        if(check){
            navigation.navigate('Login')
        }
    }

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'ลงทะเบียน', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <ScrollView>
                <View style={styles.body}>
                    <View style={{ marginTop: hp('9.5%') }}>
                        <View style={styles.Input}>
                            <View style={{ width: wp('8%'), height: wp('8%') }}>
                                <Image source={require('../assets/profile-user.png')} style={styles.smallIcon} />
                            </View>
                            <TextInput
                                style={styles.textInput}
                                value={input.username}
                                onChangeText={(text) => setInput({ ...input, username: text })}
                                placeholder="Username"
                            />
                        </View>
                        <View style={styles.Input}>
                            <View style={{ width: wp('8%'), height: wp('8%') }}>
                                <Image source={require('../assets/padlock.png')} style={styles.smallIcon} />
                            </View>
                            <TextInput
                                style={styles.textInput}
                                value={input.password}
                                secureTextEntry={true}
                                onChangeText={(text) => setInput({ ...input, password: text })}
                                placeholder="Password"
                            />
                        </View>
                        <View style={styles.Input}>
                            <View style={{ width: wp('8%'), height: wp('8%') }}>
                                <Image source={require('../assets/email.png')} style={styles.smallIcon} />
                            </View>
                            <TextInput
                                style={styles.textInput}
                                value={input.email}
                                onChangeText={(text) => setInput({ ...input, email: text })}
                                placeholder="E-mail"
                            />
                        </View>
                        <Button
                            title="ยืนยัน"
                            buttonStyle={[styles.btcf, styles.Shadow, { marginTop: hp('2.5%') }]}
                            onPress={() => {cfregister()}}
                            titleStyle={{ fontSize: hp('2%') }}
                        />
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
    Input: {
        flexDirection: 'row',
        marginBottom: hp('1.5%'),
        backgroundColor: '#0E77BF',
        width: wp('80%'),
        height: hp('6%'),
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
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
    smallIcon: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // width: hp('5%'),
        // height: hp('5%'),
        // borderWidth: 1,
        // marginLeft: wp('2%')
    },
    textInput: {
        color: '#000',
        width: '80%',
        height: '75%',
        fontSize: hp('2.5%'),
        paddingBottom: 0,
        marginLeft: 10,
        backgroundColor: '#C4C4C4'
    },
    btcf: {
        alignSelf: 'center',
        backgroundColor: '#014D81',
        width: wp('40%'),
        height: hp('5%'),
        borderRadius: 15,
    },
})