import React, { useState, useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Button, Image, Icon, Header, Overlay } from 'react-native-elements';

//import {launchImageLibrary} from 'react-native-image-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { API } from './axios';

import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { CategoryContext } from '../context_api/myContext';


export default function setting_profile({ navigation }) {
    const Context = useContext(CategoryContext)

    const [dataUser, setdataUser] = useState(
        Context.dataUser
    )

    const [input, setInput] = useState({
        name: '',
        new_password: '',
        cfnew_password: '',
        password: '',
    })

    const [profileImage, setImage] = useState({
        imagesrc: require('../assets/profile-user2.png'),
        imgEdit: ''
        //imagesrc: { uri: "../assets/profile-user2.png", }
    })

    const [state, setState] = useState({
        edit: false,
        temp64: '',
        name: ''
    })

    const [visible, setVisible] = useState({
        optionEditimg: false,
        optionEditimg_cf: false,
        editname: false,
        editpass: false,
        visble2: false
    });

    const [showNewPass, setShowNewPass] = useState({
        text: "มีจำนวน 8 ตัวขึ้นไปที่มีทั้งตัวอักษรภาษาอังกฤษและตัวเลขผสมกัน",
        color: '#1D1414',
        hide: true
    })

    const [showcfNewPass, setShowcfNewPass] = useState({
        text: "Password ไม่ตรงกัน กรุณาลองใหม่อีกครั้ง",
        color: '#FF0000',
        hide: true
    })

    const [showPass, setShowPass] = useState({
        text: "ขออภัย password เดิมไม่ถูกต้อง",
        color: '#FF0000',
        hide: true
    })



    useEffect(() => {

        if (dataUser.image !== '') {
            setImage({
                ...profileImage,
                imagesrc: { uri: `data:image/jpg;base64,${dataUser.image}` }
            })
        }

        if (dataUser.name !== '') {
            setState({
                ...state,
                name: dataUser.name
            })
        }
        if (dataUser.name === '') {
            setState({
                ...state,
                name: dataUser.Username
            })
        }

        // API.get('/get_image', body = {
        //     params: {
        //         username: 'Burit1234'
        //     }
        // })
        //     .then(res => {
        //         //console.log(res.data[0].image)
        //         if (res.data[0].image === undefined) {
        //             return;
        //         }
        //         if (res.data[0].image !== "") {
        //             setImage({
        //                 ...profileImage,
        //                 imagesrc: { uri: `data:image/jpg;base64,${res.data[0].image}` }
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         //Alert.alert('ผิดพลาด','ไม่สามารถเข้าสู่ระบบได้')
        //     })

        // API.get('/get_name', body = {
        //     params: {
        //         username: 'Burit1234'
        //     }
        // })
        //     .then(res => {
        //         console.log(res.data[0].name)
        //         if (res.data[0].name === undefined) {
        //             return;
        //         }
        //         if (res.data[0].name !== "") {
        //             setState({
        //                 ...state,
        //                 name: res.data[0].name
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         //Alert.alert('ผิดพลาด','ไม่สามารถเข้าสู่ระบบได้')
        //     })

    }, ([]))


    const saveimage = () => {
        API.post('/add_image', body = {
            username: dataUser.Username,
            image: state.temp64,
        })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.status)
                    setImage({
                        ...profileImage,
                        imagesrc: profileImage.imgEdit
                    })

                    Context.setImage(state.temp64)
                    Context.updateUser()

                    setVisible({
                        ...visible,
                        optionEditimg: false,
                        optionEditimg_cf: false
                    })
                    //Alert.alert('บันทึกสำเร็จ', 'เปลี่ยนรูปสำเร็จ', [{ text: "ตกลง" }], { cancelable: true })
                }
            })
            .catch(error => {
                console.log(error)
                //Alert.alert('ผิดพลาด','ไม่สามารถเข้าสู่ระบบได้')
            })
    }

    const API_Deleteimage = () => {
        API.post('/add_image', body = {
            username: dataUser.Username,
            image: '',
        })
            .then(res => {
                setImage({
                    imagesrc: require('../assets/profile-user2.png'),
                    imgEdit: ''
                })

                Context.setImage('')
                Context.updateUser()

                setVisible({
                    ...visible,
                    optionEditimg: false,
                    optionEditimg_cf: false
                })

            })
            .catch(error => {
                console.log(error)
                //Alert.alert('ผิดพลาด','ไม่สามารถเข้าสู่ระบบได้')
            })
    }




    const savename = () => {
        API.post('/add_name', body = {
            username: dataUser.Username,
            name: input.name,
        })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.status)
                    setState({
                        ...state,
                        name: input.name
                    })
                    Context.setName(input.name)
                    Context.updateUser()
                    toggleOverlayEditname()
                    Alert.alert('บันทึกสำเร็จ', 'เปลี่ยนชื่อสำเร็จ', [{ text: "ตกลง" }], { cancelable: true })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const saveNewpass = () => {
        API.post('/new_password', body = {
            username: dataUser.Username,
            password: input.password,
            new_password: input.new_password
        })
            .then(res => {
                console.log(res)
                if (res.status !== 200) {
                    console.log('Wrong password')
                }
                else {
                    Alert.alert('บันทึกสำเร็จ', 'เปลี่ยนรหัสผ่านสำเร็จ', [{ text: "ตกลง" }], { cancelable: true })
                    toggleOverlayEditpass()
                }

            })
            .catch(error => {
                console.log(error)
                // Alert.alert('ผิดพลาด','ไม่สามารถเข้าสู่ระบบได้')

                setShowPass({ ...showPass, hide: false })
                setInput({
                    ...input,
                    password: '',
                    new_password: '',
                    cfnew_password: ''
                })


            })
    }


    const toggleOverlayoptionEditimg = () => {
        setVisible({
            ...visible,
            optionEditimg: !visible.optionEditimg
        });
    };

    const toggleOverlayoptionEditimg_cf = () => {
        setVisible({
            ...visible,
            optionEditimg_cf: !visible.optionEditimg_cf
        });
    };

    const toggleOverlayEditname = () => {
        setVisible({
            ...visible,
            editname: !visible.editname
        });
    };

    const toggleOverlayEditpass = () => {
        setVisible({
            ...visible,
            editpass: !visible.editpass
        });
        setInput({
            ...input,
            password: '',
            new_password: '',
            cfnew_password: ''
        })
        setShowPass({ ...showPass, hide: true })
        setShowNewPass({
            text: "มีจำนวน 8 ตัวขึ้นไปที่มีทั้งตัวอักษรภาษาอังกฤษและตัวเลขผสมกัน",
            color: '#1D1414',
            hide: true
        })
        setShowcfNewPass({ ...showcfNewPass, hide: true })
    };


    changeImage = () => {
        //toggleOverlayoptionEditimg()
        const options = {
            quality: 0.8, maxWidth: 270, maxHeight: 270, mediaType: 'photo', includeBase64: true,
            // storageOptions: {
            //     skipBackup: true, waitUntilSaved: true, path: 'images', CameraRoll: true
            // }
        }
        launchImageLibrary(options, response => {
            if (response.error) {
                console.log(error)
            } else if (!response.didCancel) {
                console.log(response)

                setState({
                    ...state,
                    temp64: response.base64
                })

                // toggleOverlay1()

                setImage({
                    ...profileImage,
                    imgEdit: { uri: response.uri, }
                })

                toggleOverlayoptionEditimg_cf()

                //Alert.alert('เปลี่ยนรูปโปรไฟล์', 'บันทึกรูปสำเร็จ')
            }
        })
    }

    deletimg = () => {
        Alert.alert(
            "แก้ไขรูปโปรไฟล์",
            "ต้องลบรูปโปรไฟล์ใช่หรือไม่",
            [
                {
                    text: "ยกเลิก",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "ยืนยัน", onPress: () => {
                        toggleOverlayoptionEditimg()
                        setState({
                            ...state,
                            temp64: ''
                        })
                        API_Deleteimage()
                    }
                }
            ],
            { cancelable: false }
        );
    }


    const checkcfPass = () => {
        if (input.cfnew_password !== input.new_password) {
            setShowcfNewPass({ ...showcfNewPass, hide: false })
            return false
        }
        return true
    }

    const checkPass = () => {
        var letters = /[a-zA-Z]/
        var number = /[0-9]/
        if (input.new_password.length < 8) {
            setShowNewPass({ hide: false, color: '#FF0000', text: "ขออภัย Password ต้องมีความยาว 8 ตัวขึ้นไป" })
            return false
        }
        //console.log('l', input.new_password.match(letters), 'n', input.new_password.match(number))
        if (!input.new_password.match(letters) || !input.new_password.match(number)) {
            setShowNewPass({ hide: false, color: '#FF0000', text: "ขออภัย Password ต้องมีตัวอักษรและตัวเลข" })
            return false
        }
        return true
    }

    const vaildateNewpass = () => {
        if (input.password === '' || input.new_password === '' || input.cfnew_password === '') {
            Alert.alert(
                "เปลี่ยนรหัสผ่านไม่สำเร็จ",
                "กรุณากรอกข้อมูลให้ครบทุกช่อง",
                [
                    { text: "ตกลง" }
                ],
                { cancelable: true }
            );
            setInput({
                ...input,
                password: '',
                new_password: '',
                cfnew_password: ''
            })
            return
        }

        let conditionPass = checkPass()
        let conditioncfPass = checkcfPass()

        if (!conditionPass || !conditioncfPass) {
            setInput({
                ...input,
                password: '',
                new_password: '',
                cfnew_password: ''
            })
            return
        }

        if (conditionPass && conditioncfPass) {
            saveNewpass()
        }
    }

    const checkInput = (text) => {
        var letters = /^[0-9a-zA-Z]+$/
        if (text == null) {
            return false
        }
        else if (text.length == 1 && text.match(letters)) {
            return true
        }
        else {
            return false
        }

    }

    const inputName = (text) => {
        if (text.length < 21) {
            setInput({ ...input, name: text })
        }
    }

    const inputPass = (text) => {
        checktext = false

        if (text.length < 50) {
            if (text.length == 0) {
                setInput({ ...input, password: text })
            }
            else {
                checktext = checkInput(text[text.length - 1])
                if (checktext) {
                    setInput({ ...input, password: text })
                }
            }

        }
    }

    const inputNewPass = (text) => {
        checktext = false

        if (text.length < 50) {

            if (text.length == 0) {
                setInput({ ...input, new_password: text })
            }
            else {
                checktext = checkInput(text[text.length - 1])
                if (checktext) {
                    setInput({ ...input, new_password: text })
                }
            }

        }
    }

    const inputcfNewPass = (text) => {
        checktext = false

        if (text.length < 50) {

            if (text.length == 0) {
                setInput({ ...input, cfnew_password: text })
            }
            else {
                checktext = checkInput(text[text.length - 1])
                if (checktext) {
                    setInput({ ...input, cfnew_password: text })
                }
            }

        }
    }


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
                    <View style={{ margin: hp('7%'), }}>
                        <View style={{ width: wp('36%'), height: wp('36%') }}>
                            <Image style={[styles.profile, { resizeMode: 'cover' }]} source={profileImage.imagesrc} />


                        </View>
                        <TouchableOpacity onPress={() => toggleOverlayoptionEditimg()} >
                            <Text style={[styles.textprofile, { marginTop: hp('1.5%') }]}>แก้ไขโปรไฟล์</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.bgInput}>
                        <View style={{ width: '100%' }}>
                            <Text style={styles.textInput}>ชื่อเล่น</Text>
                            <TouchableOpacity onPress={() => {
                                toggleOverlayEditname()
                                setInput({
                                    ...input,
                                    name: state.name
                                })
                            }} >
                                <View style={styles.bgtext}>
                                    <Text style={styles.textshow}>{state.name}</Text>
                                    <Text style={styles.textedit}>แก้ไข</Text>
                                </View>
                            </TouchableOpacity>

                            {/* <TextInput
                                editable={state.edit}
                                style={styles.Input}
                                value={input.nickname}
                                onChangeText={inputName}
                            //placeholder="Username"
                            /> */}
                        </View>

                        <View style={{ width: '100%' }}>
                            <Text style={styles.textInput}>รหัสผ่าน</Text>
                            <TouchableOpacity onPress={() => toggleOverlayEditpass()} >
                                <View style={styles.bgtext}>
                                    <Text style={styles.textshow}>เปลี่ยนรหัสผ่านใหม่</Text>
                                    <Text style={styles.textedit}>แก้ไข</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </View>


                </View>


                {/* --------------------------------optionEditimg-------------------------------- */}
                <Overlay key={1} isVisible={visible.optionEditimg} onBackdropPress={toggleOverlayoptionEditimg} overlayStyle={styles.overlay_head}>
                    <View style={{ width: wp('42%'), padding: hp('0.7%'), justifyContent: 'center' }}>

                        <TouchableOpacity onPress={() => {
                            changeImage()
                        }} >
                            <View style={{ marginBottom: ('10%'), justifyContent: 'center' }}>
                                <Text style={{ fontSize: hp('2%') }}>เลือกรูปภาพ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => deletimg()} >
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ fontSize: hp('2%') }}>ลบ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Overlay>

                {/* --------------------------------optionEditimg_cf-------------------------------- */}
                <Overlay key={2} isVisible={visible.optionEditimg_cf} overlayStyle={styles.overlay_head}>
                    <View style={styles.overlay_body}>

                        <View style={styles.overlat_show}>
                            <View style={{ width: wp('36%'), height: wp('36%') }}>
                                <Image style={[styles.profile, { resizeMode: 'cover' }]} source={profileImage.imgEdit} />
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Button
                                    title="บันทึก"
                                    buttonStyle={[styles.btsave, styles.Shadow, { marginRight: wp('15%') }]}
                                    onPress={() => {
                                        saveimage()
                                    }}
                                    titleStyle={{ fontSize: hp('2%') }}
                                />

                                <Button
                                    title="ยกเลิก"
                                    buttonStyle={[styles.btcancel, styles.Shadow,]}
                                    onPress={() => {
                                        toggleOverlayoptionEditimg_cf()

                                    }}
                                    titleStyle={{ fontSize: hp('2%') }}
                                />

                            </View>
                        </View>
                    </View>
                </Overlay>

                {/* --------------------------------Editname-------------------------------- */}
                <Overlay key={3} isVisible={visible.editname} onBackdropPress={toggleOverlayEditname} overlayStyle={styles.overlay_head}>
                    <View style={styles.overlay_body}>
                        <View style={styles.overlat_show}>
                            <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>แก้ไขชื่อเล่น</Text>
                            <TextInput
                                style={styles.Input}
                                value={input.name}
                                onChangeText={inputName}
                            //placeholder="Username"
                            />
                        </View>

                        <Button
                            title="บันทึก"
                            buttonStyle={[styles.btsave, styles.Shadow,]}
                            onPress={() => {
                                savename()
                            }}
                            titleStyle={{ fontSize: hp('2%') }}
                        />

                    </View>
                </Overlay>

                {/* --------------------------------Editpassword-------------------------------- */}
                <Overlay key={4} isVisible={visible.editpass} onBackdropPress={toggleOverlayEditpass} overlayStyle={styles.overlay_head}>
                    <View style={styles.overlay_body}>
                        <View style={styles.overlat_show}>
                            <View style={{ width: '95%', marginBottom: ('5%') }}>
                                <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>รหัสผ่านเดิม</Text>
                                <TextInput
                                    style={styles.Input}
                                    value={input.password}
                                    onChangeText={inputPass}
                                    onFocus={() => setShowPass({ ...showPass, hide: true })}
                                //placeholder="กรุณากรอกรหัสผ่านเดิม"
                                />
                                {!showPass.hide ?
                                    <Text style={{ color: showPass.color, fontSize: hp('1.5%') }}>{showPass.text}</Text>
                                    :
                                    <View></View>
                                }
                            </View>

                            <View style={{ width: '95%', marginBottom: ('5%') }}>
                                <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>รหัสผ่านใหม่</Text>
                                <TextInput
                                    style={styles.Input}
                                    value={input.new_password}
                                    onChangeText={inputNewPass}
                                    onFocus={() => setShowNewPass({ ...showNewPass, hide: false })}
                                    onBlur={() => setShowNewPass({
                                        text: "มีจำนวน 8 ตัวขึ้นไปที่มีทั้งตัวอักษรภาษาอังกฤษและตัวเลขผสมกัน",
                                        color: '#1D1414',
                                        hide: true
                                    })}
                                //placeholder="รหัสผ่านใหม่"
                                />

                                {!showNewPass.hide ?
                                    <Text style={{ color: showNewPass.color, fontSize: hp('1.5%') }}>{showNewPass.text}</Text>
                                    :
                                    <View></View>
                                }
                            </View>

                            <View style={{ width: '95%' }}>
                                <Text style={[styles.textInput, { color: '#000', alignSelf: 'flex-start', }]}>ยืนยันรหัสผ่านใหม่</Text>
                                <TextInput
                                    style={styles.Input}
                                    value={input.cfnew_password}
                                    onChangeText={inputcfNewPass}
                                    onFocus={() => setShowcfNewPass({ ...showcfNewPass, hide: true })}
                                //placeholder="ยืนยันรหัสผ่านใหม่"
                                />

                                {!showcfNewPass.hide ?
                                    <Text style={{ color: showcfNewPass.color, fontSize: hp('1.5%') }}>{showcfNewPass.text}</Text>
                                    :
                                    <View></View>
                                }
                            </View>

                            <Button
                                title="บันทึก"
                                buttonStyle={[styles.btsave, styles.Shadow,]}
                                onPress={() => {
                                    vaildateNewpass()
                                }}
                                titleStyle={{ fontSize: hp('2%') }}
                            />
                        </View>
                    </View>
                </Overlay>

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
    bgtext: {
        flexDirection: 'row',
        marginBottom: hp('3%'),
        backgroundColor: '#0E77BF',
        width: '100%',
        height: hp('4.5%'),
        //borderRadius: 15,
        alignItems: 'center',
        // justifyContent: 'center',
        justifyContent: 'space-between',
        paddingRight: '5%',
        paddingLeft: '5%'
    },
    textshow: {
        fontSize: hp('2%'),
    },

    textedit: {
        color: '#000000BF',
        borderColor: '#0000007F',
        fontSize: hp('1.8%'),
        borderWidth: wp('0.2%'),
        padding: wp('1%')
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
    textprofile: {
        color: '#0E77BF',
        fontSize: hp('2%'),
        marginTop: hp('0.2%'),
        alignSelf: 'center'
    },
    btsave: {
        //alignSelf: 'center',
        backgroundColor: '#49BB21',
        width: wp('29%'),
        height: hp('5%'),
        borderRadius: 15,
        marginTop: hp('6%')
    },
    btcancel: {
        backgroundColor: '#EA2626',
        width: wp('29%'),
        height: hp('5%'),
        borderRadius: 15,
        marginTop: hp('6%')
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
    },
    Input: {
        flexDirection: 'row',
        fontSize: hp('2%'),
        paddingLeft: ('5%'),
        //marginBottom: hp('1.5%'),
        backgroundColor: '#0E77BF',
        width: '100%',
        height: hp('5%'),
        //borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',

    },
    overlay_head: {
        borderRadius: 15,
    },
    overlay_body: {
        width: wp('80%'),
        padding: hp('0.7%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp('2.5%')
    },
    overlat_show: {
        width: '95%',
        marginTop: hp('2%'),
        alignItems: 'center',
        justifyContent: 'center'
    },
})