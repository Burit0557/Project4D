import React, { useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'

export default function register({ navigation }) {
    const [input, setInput] = useState({
        nickname: '',
        new_password: '',
        password: '',
    })

    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                <View style={{ width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('3%') }}>
                    <Image source={require('../assets/previous.png')} style={styles.smallIcon} />
                </View>
            </TouchableOpacity>)
    }
    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'โปรไฟล์', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <ScrollView>
                <View style={styles.body}>
                    <View style={{ margin: hp('7%') }}>
                        <View style={{ borderWidth: 1, width: wp('36%'), height: wp('36%'), borderRadius: 100 }}>
                            <Image source={require('../assets/profile-user2.png')} style={styles.profile} />
                        </View>
                    </View>
                    <View style={styles.bgInput}>
                        <View style={{ width: '100%' }}>
                            <Text style={styles.textInput}>ชื่อเล่น*</Text>
                            <TextInput
                                style={styles.Input}
                                value={input.nickname}
                                onChangeText={(text) => setInput({ ...input, nickname: text })}
                            //placeholder="Username"
                            />
                        </View>
                        <View style={{ width: '100%' }}>
                            <Text style={styles.textInput}>รหัสผ่านใหม่</Text>
                            <TextInput
                                style={styles.Input}
                                value={input.new_password}
                                secureTextEntry={true}
                                onChangeText={(text) => setInput({ ...input, new_password: text })}
                            //placeholder="Password"
                            />
                        </View>
                        <View style={{ width: '100%', marginBottom: 0 }}>
                            <Text style={styles.textInput}>รหัสผ่าน*</Text>
                            <TextInput
                                style={styles.Input}
                                value={input.password}
                                onChangeText={(text) => setInput({ ...input, password: text })}
                            //placeholder="E-mail"
                            />
                        </View>
                    </View>
                    <View style={{width : wp('80%'),alignItems : 'flex-end'}}>
                        <Button
                            title="บันทึก"
                            buttonStyle={[styles.btsave, styles.Shadow, { marginTop: hp('2.5%') }]}
                            //onPress={() => {cfregister()}}
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
        marginBottom: hp('2%'),
        backgroundColor: '#0E77BF',
        width: '100%',
        height: hp('4.5%'),
        fontSize: hp('2%'),
        //borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
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
        color: '#fff',
        fontSize: hp('2%'),
        paddingBottom: 0,
    },
    btsave: {
        //alignSelf: 'center',
        backgroundColor: '#49BB21',
        width: wp('25.5%'),
        height: hp('5%'),
        borderRadius: 15,
    },
    profile: {
        borderRadius: 100,
        height: '100%',
        width: '100%',
    },
    bgInput: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('80%'),
        paddingHorizontal: '4%',
        paddingVertical: '4%',
        borderRadius: 15,
        backgroundColor: '#014D81',
    }
})