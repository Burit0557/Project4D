import React, { useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'



export default function forgotpass({ navigation }) {
    const [input, setInput] = useState('')


    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={{ width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('4%') }}>
                    <Image source={require('../assets/previous.png')} style={styles.iconhome} />
                </View>
            </TouchableOpacity>)
    }

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'Password Reset', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('3%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />

            {/* <View style={{flex: 1, flexDirection: 'row' ,maxHeight: hp('15%'), borderWidth:1}}>
                <View style={{backgroundColor:'#aaa', width: wp('15%'), height: '100%', color: '#fff', margin: wp('0%') }}>
                    {renderLeftComponent()}
                </View>
                <View style={{backgroundColor:'#bbb', width: wp('70%'), height: '100%', color: '#fff', margin: wp('0%') }}></View>
                <View style={{backgroundColor:'#ccc', width: wp('15%'), height: '100%', color: '#fff', margin: wp('0%') }}></View>
            </View> */}

            <ScrollView>
                <View style={styles.body}>
                    <View style={{ width: '80%'}} >
                        <Text style={[styles.Text,{ marginTop: hp('3%')}]}>กรอก Username หรือ Email ที่คุณใช้ลงทะเบียน
เพื่อส่งข้อมูลในการตั้งรหัสผ่านใหม่ไปยัง Email </Text>
                    </View>


                    <View style={styles.Input}>
                        <Text style={{ fontSize: hp('1.5%') }}>Email address หรือ username</Text>
                        <TextInput
                            style={styles.textInput}
                            value={input}
                            onChangeText={(text) => setInput(text)}
                        // placeholder="Username"
                        />
                    </View>
                    <Button
                        title="ส่ง"
                        buttonStyle={[styles.Shadow, styles.btnLogin, { marginTop: hp('7%') }]}
                        onPress={() => loginFunction()}
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
        fontSize: hp('50%'),


    },
    content: {
        width: wp('80%'),
    },
    Input: {
        // flexDirection: 'row',
        marginTop: hp('3%'),
        // backgroundColor: '#0E77BF',
        width: wp('80%'),
        height: hp('5%'),
        borderRadius: 10,
        justifyContent: 'center',
    },
    Shadow: {

        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 12,
        },
        shadowOpacity: 0.8,
        shadowRadius: 16.00,

        elevation: 24,
    },
    smallIcon: {
        width: hp('5%'),
        height: hp('5%'),
        borderWidth: 1,
        marginLeft: wp('2%')
    },
    textInput: {
        color: '#000',
        width: '100%',
        height: '80%',
        fontSize: hp('3%'),
        paddingBottom: 0,
        // marginLeft: 10,
        backgroundColor: '#C4C4C4'
    },
    btnLogin: {
        alignSelf: 'center',
        backgroundColor: '#014D81',
        width: wp('30%'),
        height: hp('5%'),
        borderRadius: 10,


    },
    Text: {
        margin: '2%',
        marginTop: '4%',
        color: '#12283D',
        fontSize: hp('2%')
    },
    button: {
        borderRadius: 25,
        // paddingTop: 5,
        // paddingBottom: 5,
        // paddingLeft: 50,
        // paddingRight: 50,
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
    test: {
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 12,
        },
        shadowOpacity: 0.8,
        shadowRadius: 16.00,

        elevation: 24,
    },
    iconhome: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',       
    },
})