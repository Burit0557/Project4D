import React from 'react'
import AsyncStorage from '@react-native-community/async-storage';

const CategoryContext = React.createContext();

class MyContext extends React.Component {
    constructor() {
        super()
        this.state = {
            login: false,


            dataUser: {
                User_id: 0,
                Username: '',
                Password: '',
                name: '',
                Email: '',
                image: '',
            },

            dataUserSetting: {
                bluetooth_name: 'raspberrypi',
                EAR: "0.275",
                distance: "160",
                rest_hour: '2',
                rest_min: '00',
                up_min: '00',
                up_sec: '30',
            }


        }
    }

    setDataUser = (dataUser) => {
        console.log('dataUser:', dataUser.Username, dataUser.Email)
        this.setState({
            dataUser: dataUser
        });
    }

    setDataUserSetting = (dataUserSetting) => {
        console.log('dataUserSetting:')
        this.setState({
            dataUserSetting: dataUserSetting
        });
    }

    setImage = (image) => {
        this.setState({
            dataUser: {
                ...this.state.dataUser,
                image: image
            }
        })
    }

    setName = (name) => {
        this.setState({
            dataUser: {
                ...this.state.dataUser,
                name: name
            }
        })
    }

    setEAR = (EAR) => {
        this.setState({
            dataUserSetting: {
                ...this.state.dataUserSetting,
                EAR: EAR
            }
        })
    }

    setRest_dis = (distance) => {
        this.setState({
            dataUserSetting: {
                ...this.state.dataUserSetting,
                distance: distance
            }
        })
    }

    setRest_time = (rest_hour, rest_min) => {
        this.setState({
            dataUserSetting: {
                ...this.state.dataUserSetting,
                rest_hour: rest_hour,
                rest_min: rest_min
            }
        })
    }

    setUpLocation = (up_min, up_sec) => {
        this.setState({
            dataUserSetting: {
                ...this.state.dataUserSetting,
                up_min: up_min,
                up_sec: up_sec
            }
        })
    }

    setBluetooth = (bluetooth_name) => {
        this.setState({
            dataUserSetting: {
                ...this.state.dataUserSetting,
                bluetooth_name: bluetooth_name,
            }
        })
    }

    updateUser = async () => {
        const temp = JSON.stringify(this.state.dataUser)
        console.log(this.state.dataUser)
        try {
            await AsyncStorage.setItem('@dataUser', temp)
            console.log('saveData successfully saved')
        } catch (e) {
            console.log('Failed to save the saveData to the storage')
        }
    }

    updateUserSetting = async () => {
        const temp = JSON.stringify(this.state.dataUserSetting)
        console.log(this.state.dataUserSetting)
        try {
            await AsyncStorage.setItem('@dataUserSetting', temp)
            console.log('saveData successfully saved')
        } catch (e) {
            console.log('Failed to save the saveData to the storage')
        }
    }




    render() {
        return (
            <CategoryContext.Provider
                value={{
                    user_id: this.state.dataUser.user_id,
                    login: this.state.login,
                    dataUser: this.state.dataUser,
                    dataUserSetting: this.state.dataUserSetting,

                    setDataUser: this.setDataUser,
                    setImage: this.setImage,
                    setName: this.setName,
                    updateUser: this.updateUser,
                    setDataUserSetting: this.setDataUserSetting,

                    setEAR: this.setEAR,
                    setRest_dis: this.setRest_dis,
                    setRest_time:this.setRest_time,
                    setUpLocation:this.setUpLocation,
                    setBluetooth:this.setBluetooth,
                    updateUserSetting:this.updateUserSetting

                }}
            >
                {this.props.children}
            </CategoryContext.Provider>
        )
    }
}


export { MyContext, CategoryContext }

