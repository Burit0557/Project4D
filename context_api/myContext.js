import React from 'react'
import AsyncStorage from '@react-native-community/async-storage';

const CategoryContext = React.createContext();

class MyContext extends React.Component {
    constructor() {
        super()
        this.state = {
            login : false,

            dataUser: {
                user_id: 0,
                password: '',
                name: '',
                e_mail: '',
            },


        }
    }

    setDataUser = (dataUser) => {
        console.log('dataUser:', dataUser)
        this.setState({
            dataUser: dataUser
        });
    }

    


    render() {
        return (
            <CategoryContext.Provider
                value={{
                    user_id: this.state.dataUser.user_id,

                    login : this.state.login,
                    
                }}
            >
                {this.props.children}
            </CategoryContext.Provider>
        )
    }
}


export { MyContext, CategoryContext }

