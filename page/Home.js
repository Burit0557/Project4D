import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, ImageBackground,Image, StyleSheet, TouchableOpacity ,Im} from 'react-native';
import { Button, Icon, Header } from 'react-native-elements'

export default function home({ navigation }) {
    return (
        <View style={styles.container}>
            <Header
                containerStyle={{ height: hp('15%') }}
                // leftContainerStyle={{ marginBottom: '5%' }}
                leftComponent={{ Icon: 'g_translate', color: '#fff', }}
                centerComponent={{ text: 'NAME’s App', style: { color: '#fff', fontWeight: 'bold', fontSize: hp('5%'), } }}
                // rightComponent={{ text: 'แจ้งเตือน', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
                // barStyle="dark-content"
                backgroundColor='#014D81'
            />
            <View style={styles.body}>
                <View style={styles.content}>
                    <View style={[styles.listRow, { marginTop: '10%' }]}>
                        <TouchableOpacity onPress={() => navigation.navigate('History')}>
                            <View style={[styles.item, styles.Shadow]}>
                                <Image
                                    style={styles.iconhome}
                                    source={require('../assets/placeholder.png')}

                                />
                                <Text style={styles.Text}>เดินทางไกล</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Family')}>
                            <View style={[styles.item, styles.Shadow]}>
                                <Image source={require('../assets/user-1.png')} style={styles.iconhome} />
                                <Text style={styles.Text}>สมาชิก</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.listRow}>
                        <TouchableOpacity onPress={() => navigation.navigate('History')}>
                            <View style={[styles.item, styles.Shadow]}>
                                <Image source={require('../assets/history.png')} style={styles.iconhome} />
                                <Text style={styles.Text}>ประวัติ</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('History')}>
                            <View style={[styles.item, styles.Shadow]}>
                                <Image source={require('../assets/setting.png')} style={styles.iconhome} />
                                <Text style={styles.Text}>ตั้งค่า</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Button
                    title="test"
                    buttonStyle={[styles.btnLogin, styles.Shadow, { marginTop: hp('2%'), width: wp('50%') }]}
                    onPress={() => navigation.navigate('Login')}
                    titleStyle={{ fontSize: hp('2%') }}
                />
            </View>


        </View>


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
        height: hp('90%'),
        width: wp('100%'),
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#00ff00',
        fontSize: hp('50%')
    },
    content: {
        width: wp('80%'),
        // alignItems: 'center',
        // backgroundColor: '#00ffff',
    },
    listRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // marginTop: '2%'
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
    item: {
        width: wp('35%'),
        height: wp('35%'),
        backgroundColor: '#0E77BF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: '5%',

    },
    Text: {
        margin: '2%',
        marginTop: '4%',
        color: '#ffff',
        fontSize: hp('2%')
    },
    iconhome: {
        width: '70%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    }
})