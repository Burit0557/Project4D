import React, { useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'
import { useSafeArea } from 'react-native-safe-area-context';
import { and } from 'react-native-reanimated';

export default function register({ navigation }) {
    const [input, setInput] = useState({
        username: '',
        password: '',
        email: '',
    })

    // const [show, setShow] = useState(false)
    // const [showStUser, setShowStUser] = useState(true)
    // const [showUserNA, setShowUserNA] = useState(false)
    // const [showUserNE, setShowUserNE] = useState(false)

    // const [show, setShow] = useState({
    //     showUserST: true,
    //     showUserNA: false,
    //     showUserNE: false,
    // })

    const [showUser, setShowUser] = useState({
        text: "คุณสามารถใช้อักษรภาษาอังกฤษ , ตัวเลข",
        color: '#1D1414',
        hide : false
    })

    //var letters = /^[0-9a-zA-Z]+$/;

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
        if (check) {
            navigation.navigate('Login')
        }
    }

    const checkInput = (text) => {
        console.log(text)
        //console.log(text.length)
        var letters = /^[0-9a-zA-Z]+$/
        if(text ==null){
            return false
        }
        else if(text.length == 1 && text.match(letters)){
            return true
        }
        // if (text >= 'A' && text <= 'Z') {
        //     return true
        // }
        // else if (text >= 'a' && text <= 'z') {
        //     return true
        // }
        // else if (text >= '0' && text <= '9') {
        //     return true
        // }
        else {
            return false
        }

    }


    const checkFirst = (textF) => {
        if (textF >= '0' && textF <= '9') {
            setShowUser({hide : false, color: '#FF0000', text: "ขออภัย Username ต้องขึ้นต้นด้วยตัวอักษร" })
            //setShowUserNA(true)
            
        }
    }
    const checkUser = (text) => {
        //Username สามารถใช้ อักษรภาษาอังกฤษ, 0-9, เท่านั้น  โดยมี 6-15 ตัว
        checktext = false
        if(text == ''){
            setShowUser({ hide : false,color: '#1D1414', text: "คุณสามารถใช้อักษรภาษาอังกฤษ , ตัวเลข" })
        }
        // text == '' ?
        //     (
        //         //console.log("text"),
        //         //setShowUser({ hide : false,color: '#1D1414', text: "คุณสามารถใช้อักษรภาษาอังกฤษ , ตัวเลข" })
        //         //setShowStUser(true),
        //        // setShowUserNA(false)
        //         //checkF = true
        //         //setShow({...show,showUserST:true,showUserNA:false})
        //     )
        //     :
        //     (
        //         setShowStUser(false)
        //     )


        //console.log(text[0])
        
        if (text.length < 16) {
            console.log(text.length)
            console.log(text)

            //console.log(text[text.length - 1])
            checktext = checkInput(text[text.length - 1])
            if (checktext || text.length == 0) {
                //console.log(checkF)
                if (text.length > 0 && text.length < 6) {
                    setShowUser({ hide : false,color: '#FF0000', text: "ขออภัย Username ต้องมีความยาวระหว่าง 6 ถึง 15 ตัวอักษร" })
                }
                if(text.length > 5){
                    setShowUser({...showUser,hide:true })
                }

                setInput({ ...input, username: text })
                checkFirst(text[0])
                // if(checkF){
                //     console.log('hello2')
                //     checkF = checkFirst(text[0])
                //     console.log(checkF)
                // }
            }

        }

        // (
        //     console.log('over')
        // )


        // text.length >5 ?
        //     (
        //         setShow(true),
        //         setShow(false),
        //         setShow(true),
        //         console.log('3'+1+2)
        //     )
        //     :
        //     (
        //         setShow(false)
        //     )

        //setInput({ ...input, username: text })
    }

    const checkPass = (text) => {
        // Password สามารถใช้ a-z, A-Z, 0-9, เท่านั้น pass ต้องเริ่มต้นและจบด้วยตัวอักษรหรือตัวเลข และต้องมีตัวอักษรอย่างน้อยหนึ่งตัว โดยมี 8-100 ตัว
        // if(text.length > 5){
        //     setShow(true)
        // }
        // else{
        //     setShow(false)
        // }
        text.length > 5 ?
            (
                setShow(true),
                setShow(false),
                setShow(true)
                //console.log('3' + 1 + 2)
            )
            :
            (
                setShow(false)
            )

        setInput({ ...input, password: text })

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
                        <View style={styles.content}>
                            <View style={styles.Input}>
                                <View style={{ width: wp('8%'), height: wp('8%') }}>
                                    <Image source={require('../assets/profile-user.png')} style={styles.smallIcon} />
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    value={input.username}
                                    onChangeText={checkUser}
                                    //onChangeText={(text) => setInput({ ...input, username: text })}                                    
                                    placeholder="Username"
                                />
                            </View>

                            {!showUser.hide ?
                                <Text style={{ color: showUser.color, fontSize: hp('1.5%') }}>{showUser.text}</Text>
                                :
                                <View></View>
                            }
                            


                            {/* {showStUser ?
                                <Text style={{ color: '#1D1414', fontSize: hp('1.5%') }}>สามารถใช้อักษรภาษาอังกฤษ , 0-9 โดยต้องขึ้นต้นด้วยตัวอักษร และมีความยาว 6-15 ตัว </Text>
                                :
                                <View>
                                    {showUserNA ?
                                        <Text style={styles.textAlert}>ต้องขึ้นต้นด้วยตัวอักษร</Text>
                                        :
                                        <View></View>
                                    }

                                </View>
                            } */}

                            {/* {showUserFNA ?
                                <Text style={styles.textAlert}>ต้องขึ้นต้นด้วยตัวอักษร</Text>
                                :
                                <View></View>
                            } */}
                        </View>


                        <View style={styles.content}>
                            <View style={styles.Input}>
                                <View style={{ width: wp('8%'), height: wp('8%') }}>
                                    <Image source={require('../assets/padlock.png')} style={styles.smallIcon} />
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    value={input.password}
                                    secureTextEntry={true}
                                    onChangeText={checkPass}
                                    placeholder="Password"
                                />

                            </View>


                        </View>

                        <View style={styles.content}>
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
                                onPress={() => { cfregister() }}
                                titleStyle={{ fontSize: hp('2%') }}
                            />
                        </View>
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
        alignContent: 'center',
        marginBottom: hp('2.5%'),
    },
    Input: {
        flexDirection: 'row',
        //marginBottom: hp('1.5%'),
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
        padding: 0,
        paddingLeft: 5,
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
    textAlert: {
        color: '#FF0000',
        fontSize: hp('1.5%'),
    },
})