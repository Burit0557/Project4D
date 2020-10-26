import React, { useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, TextInput } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'

export default function login({ navigation }) {
    const [input, setInput] = useState({
        username: '',
        password: ''
    })
    loginFunction = () =>{
        navigation.navigate('Home')
    }
    return (
        <View style={styles.container}>
            <View style={styles.logo} >
            </View>
            <View style={[styles.listRow, { marginTop: hp('7%') }]}>
                <ImageBackground source={require('../assets/settings.png')} style={styles.smallIcon} />
                <TextInput
                    style={styles.textInput}
                    value={input.username}
                    onChangeText={(text) => setInput({ ...input, username: text })}
                    placeholder="Username"
                />
            </View>
            <View style={styles.listRow}>
                <ImageBackground source={require('../assets/settings.png')} style={styles.smallIcon} />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    value={input.password}
                    onChangeText={(text) => setInput({ ...input, password: text })}
                    placeholder="Password"
                />
            </View>
            <Button
                title="Sign in"
                buttonStyle={[styles.btnLogin, styles.Shadow, { marginTop: hp('7%') }]}
                onPress={() => loginFunction()}
                titleStyle={{ fontSize: hp('2%') }}
            />
            <Text style={styles.textForgot}>Forgot your password?</Text>
            <View style={[styles.line, { marginTop: hp('1.5%') }]} />
            <Text style={[styles.Text, { marginTop: hp('1.5%') }]}>Don't have an account?</Text>
            <Button
                title="Sign up"
                buttonStyle={[styles.btnLogin, styles.Shadow, { marginTop: hp('2%'), width: wp('50%') }]}
                onPress={() => loginFunction()}
                titleStyle={{ fontSize: hp('2%') }}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        height: hp('25%'),
        width: wp('70%'),
        alignSelf: 'center',
        borderRadius: 15,
        marginTop: hp('10%'),
        backgroundColor: '#DBCCCC',
    },
    listRow: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp('2%')
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
        borderWidth: 0,
    },
    Text: {
        color: '#12283D',
        fontSize: hp('2%'),
        alignSelf: 'center',
    },
    textInput: {
        width: wp('70%') - hp('5%') - 10,
        color: '#000',
        height: wp('8%'),
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        fontSize: hp('3%'),
        paddingBottom: 0,
        marginLeft: 10,
    },
    btnLogin: {
        alignSelf: 'center',
        backgroundColor: '#014D81',
        width: wp('30%'),
        height: hp('5%'),
        borderRadius: 10,
    },
    textForgot: {
        margin: '1%',
        color: '#12283D',
        fontSize: hp('2%'),
        borderBottomWidth: 1,
        borderColor: '#12283D',
        alignSelf: 'center',
        marginTop: hp('5%'),
        paddingBottom: 0,
    },
    line: {
        width: wp('70%'),
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        alignSelf: 'center',
    },
})