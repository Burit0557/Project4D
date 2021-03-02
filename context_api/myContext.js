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


        }
    }

    setDataUser = (dataUser) => {
        console.log('dataUser:', dataUser.Username , dataUser.Email)
        this.setState({
            dataUser: dataUser
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

    updateUser = async() =>{
        const temp = JSON.stringify(this.state.dataUser)
        console.log(this.state.dataUser)
        try {
            await AsyncStorage.setItem('@dataUser', temp)
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

                    setDataUser: this.setDataUser,
                    setImage: this.setImage,
                    setName: this.setName,
                    updateUser: this.updateUser,
                }}
            >
                {this.props.children}
            </CategoryContext.Provider>
        )
    }
}


export { MyContext, CategoryContext }

