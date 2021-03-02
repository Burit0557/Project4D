import React, { useState, useContext } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, TextInput,Alert } from 'react-native';
import { Button, Image, Icon, Header } from 'react-native-elements'

export default function register({ navigation }) {
    const [input, setInput] = useState('')

    renderLeftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                <View style={{ width: wp('6%'), height: wp('6%'), color: '#fff', marginLeft: wp('3%') }}>
                    <Image source={require('../assets/previous.png')} style={styles.smallIcon} />
                </View>
            </TouchableOpacity>)
    }

    const Resetvalue = () =>
    Alert.alert(
      "ตั้งค่าเริ่มต้น ?",
      "ต้องการกลับไปเป็นค่าเริ่มต้นใช่หรือไม่",
      [
        {
          text: "ยกเลิก",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "ยืนยัน", onPress: () => console.log("Reset")}  //navigation.navigate('Login') }
      ],
      { cancelable: false }
    );

    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                leftComponent={this.renderLeftComponent()}
                centerComponent={{ text: 'อุปกรณ์', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <ScrollView>
                <View style={styles.body}>
                    <View style={{ margin: hp('5%') }}>
                        <Text style={styles.text}>สามารถดูขนาดตาของท่านได้จากจอ</Text>
                    </View>
                    <View style={{ borderWidth: 1, width: wp('80%'), height: wp('47%'), padding: 0 }}>
                        <Image source={require('../assets/EAR.png')} style={styles.addimage} />
                    </View>
                    <View style={styles.bgInput}>
                        <Text style={[styles.text, { marginLeft: 5 }]}>ค่าขนาดดวงตา</Text>
                        <TextInput
                            style={styles.textInput}
                            value={input}
                            onChangeText={(text) => setInput(text)}
                        // placeholder="Username"
                        />
                    </View>
                    <View style={{ width: wp('80%'),flexDirection: 'row', justifyContent: 'center'  }}>
                        <Button
                            title="ค่าเริ่มต้น"
                            buttonStyle={[styles.btreset, styles.Shadow, { marginTop: hp('5%') , marginRight :  wp('12%')}]}
                            onPress={() => {Resetvalue()}}
                            titleStyle={{ fontSize: hp('2%') }}
                        />

                        <Button
                            title="บันทึก"
                            buttonStyle={[styles.btsave, styles.Shadow, { marginTop: hp('5%') }]}
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
    text: {
        color: '#12283D',
        fontSize: hp('2%'),
        paddingBottom: 0,
    },
    textInput: {
        color: '#000',
        width: '100%',
        height: '80%',
        fontSize: hp('2.5%'),
        paddingBottom: 0,
        // marginLeft: 10,
        borderRadius: 15,
        backgroundColor: '#C4C4C4'
    },
    bgInput: {
        // flexDirection: 'row',
        marginTop: hp('5%'),
        // backgroundColor: '#0E77BF',
        width: wp('80%'),
        height: hp('5%'),
        justifyContent: 'center',
    },
    btsave: {
        backgroundColor: '#49BB21',
        width: wp('29%'),
        height: hp('5%'),
        borderRadius: 15,
    },
    btreset: {
        backgroundColor: '#EA2626',
        width: wp('29%'),
        height: hp('5%'),
        borderRadius: 15,
    },
    addimage: {
        height: '100%',
        width: '100%',
    },
})