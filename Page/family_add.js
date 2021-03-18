import React, { useState, useContext, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, BackHandler } from 'react-native';
import { Button, Image, Icon, Header, Avatar } from 'react-native-elements'
import { API } from './axios';
import { CategoryContext } from '../context_api/myContext';

export default function family_add({ navigation }) {
    data = [
        {
            name: "",
            Username: 'LetMePlay4',
            image: ""
        },
        {
            name: "",
            Username: 'LetMePlay4',
            image: ""
        },
        {
            name: "",
            Username: 'LetMePlay4',
            image: ""
        },

    ]

    const Context = useContext(CategoryContext)
    const [input, setInput] = useState({
        username: ''
    })

    const [found, setFound] = useState(false)
    const [isLoad, setIsLoad] = useState(true)

    const [dataUser, setdataUser] = useState(
        Context.dataUser
    )

    const [dataFriend, setDataFriend] = useState({
        name: "",
        image: "",
        Username: "Username",
    })

    const [dataFriendReq, setDataFriendReq] = useState([])

    const [imgScr, setimgScr] = useState(require('../assets/profile-user.png'))


    findUser = () => {
        console.log(input.username)
        API.get('/get_user', data = {
            params: {
                username: input.username.toLowerCase()
            }
        })
            .then(res => {
                console.log(res.data[0].Username)
                if (res.data[0]) {
                    setDataFriend(res.data[0])
                    if (res.data[0].image !== '') {
                        setimgScr({ uri: `data:image/jpg;base64,${res.data[0].image}` })
                    }
                    setFound(true)
                }

            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 404) {
                    Alert.alert('ผิดพลาด', 'ไม่พบ USERNAME ที่ต้องการ')
                    setFound(false)
                }
            })

    }

    addFriend = () => {
        if (dataUser.Username === dataFriend.Username) {
            Alert.alert('ผิดพลาด', 'ไม่สามารถเพิ่ม USERNAME คนนี้ได้');
        }
        else {
            API.post('/friend_req', data = {
                username: dataUser.Username,
                friend_user: dataFriend.Username,
            })
                .then(res => {
                    setInput({
                        ...input,
                        username: ""
                    })
                    setFound(false)
                    Alert.alert('สำเร็จ', 'คำขอเป็นเพื่อนสำเร็จ')

                })
                .catch(error => {
                    console.log(error.response.status)
                    if (error.response.status === 409) {
                        Alert.alert('ผิดพลาด', 'คำขอได้ถูกขอไปแล้ว')
                    }
                    if (error.response.status === 459) {
                        console.log("test")
                        Alert.alert('ผิดพลาด', 'เป็นเพื่อนกันแล้ว')
                    }
                })
        }
    }

    getRequest = () => {
        API.get('/get_friend_req', data = {
            params: {
                username: dataUser.Username
            }
        })
            .then(res => {
                console.log(res.data.length)
                if (res.data.length > 0) {
                    setDataFriendReq(res.data)
                    console.log("test")
                }
            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 404) {

                }
            })

    }

    const backAction = () => {
        console.log("test")
        //   navigation.replace('Family')
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        getRequest()
        setIsLoad(false)
        return () => backHandler.remove();
    }, [])

    Friend_confirm = (friend_user) => {
        API.post('/add_friend', data = {
            username: dataUser.Username,
            friend_user: friend_user,
        })
            .then(res => {
                setDataFriendReq(dataFriendReq.filter(item => item.Username !== friend_user))
                Alert.alert('สำเร็จ', 'เป็นเพื่อนสำเร็จ')
                //navigation.replace('Family')

            })
            .catch(error => {
                console.log(error)
                // if (error.response.status === 409) {
                //     Alert.alert('ผิดพลาด', 'คำขอได้ถูกขอไปแล้ว')
                // }

            })
    }
    Friend_cancel = (friend_user) => {
        API.post('/delete_friend_req', data = {
            username: dataUser.Username,
            friend_user: friend_user,
        })
            .then(res => {
                setDataFriendReq(dataFriendReq.filter(item => item.Username !== friend_user))
                // Alert.alert('สำเร็จ', 'เป็นเพื่อนสำเร็จ')

            })
            .catch(error => {
                console.log(error)
                // if (error.response.status === 409) {
                //     Alert.alert('ผิดพลาด', 'คำขอได้ถูกขอไปแล้ว')
                // }

            })
    }
    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.replace('Family')}>
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
                            {dataFriendReq.map((item, index) => {
                                return (<View key={index} style={styles.select}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={[styles.profile, { backgroundColor: '#c4c4c4', marginRight: '5%' }]}>
                                            <Image style={styles.profile}
                                                source={item.image === "" ?
                                                    require('../assets/profile-user.png')
                                                    : { uri: `data:image/jpg;base64,${item.image}` }} />
                                        </View>
                                        <Text style={styles.Text}>{item.name === "" ? item.Username : item.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Button
                                            title="ยอมรับ"
                                            buttonStyle={[styles.btnCF, { backgroundColor: '#49BB21', }]}
                                            onPress={() => Friend_confirm(item.Username)}
                                            titleStyle={{ fontSize: hp('1.5%') }}
                                        /><Button
                                            title="ปฏิเสธ"
                                            buttonStyle={[styles.btnCF, { backgroundColor: '#EA2626', }]}
                                            onPress={() => Friend_cancel(item.Username)}
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
                            <TouchableOpacity style={styles.btnSeachbox} onPress={() => findUser()}>
                                <Icon name='search' type='Fontisto' color='#fff' size={hp('5%')} />
                            </TouchableOpacity>
                        </View>
                        {
                            found ?
                                <View style={{ alignItems: 'center', marginTop: '10%' }}>
                                    <View style={[styles.profile2, { backgroundColor: '#c4c4c4', }]}>
                                        <Image source={imgScr} style={styles.profile2} />
                                    </View>
                                    <Text style={[styles.Text, { color: '#014D81', marginTop: '5%' }]}>{dataFriend.name === '' ? dataFriend.Username : dataFriend.name}</Text>
                                    <Button
                                        title="เพิ่มสมาชิก"
                                        buttonStyle={[styles.btnAdd, styles.Shadow, { marginTop: hp('2%'), width: wp('22%') }]}
                                        onPress={() => addFriend()}
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