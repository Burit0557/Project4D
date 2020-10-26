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
                <View style={{ borderWidth: 1, width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('3%') }}></View>
            </TouchableOpacity>)
    }

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'Sign up', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.Input}>
                        <ImageBackground source={require('../assets/settings.png')} style={styles.smallIcon} />
                        <TextInput
                            style={styles.textInput}
                            value={input.username}
                            onChangeText={(text) => setInput({ ...input, username: text })}
                            placeholder="Username"
                        />
                    </View>
                    <View style={styles.Input}>
                        <ImageBackground source={require('../assets/settings.png')} style={styles.smallIcon} />
                        <TextInput
                            style={styles.textInput}
                            value={input.password}
                            secureTextEntry={true}
                            onChangeText={(text) => setInput({ ...input, password: text })}
                            placeholder="Password"
                        />
                    </View>
                    <View style={styles.Input}>
                        <ImageBackground source={require('../assets/settings.png')} style={styles.smallIcon} />
                        <TextInput
                            style={styles.textInput}
                            value={input.email}
                            onChangeText={(text) => setInput({ ...input, email: text })}
                            placeholder="E-mail"
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
        marginTop: hp('2%'),
        backgroundColor: '#0E77BF',
        width: wp('80%'),
        height: hp('5%'),
        borderRadius: 10,
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
        width: hp('5%'),
        height: hp('5%'),
        borderWidth: 1,
        marginLeft: wp('2%')
    },
    textInput: {
        color: '#000',
        width: '75%',
        height: '80%',
        fontSize: hp('3%'),
        paddingBottom: 0,
        marginLeft: 10,
        backgroundColor: '#C4C4C4'
    },
    btnLogin: {
        alignSelf: 'center',
        backgroundColor: '#014D81',
        width: wp('30%'),
        height: hp('5%'),
        borderRadius: 10,
    },
})