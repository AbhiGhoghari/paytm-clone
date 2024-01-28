import {atom} from 'recoil'
export const user = atom({
    key:'user',
    default:{
        username:'',
        firstname:'',
        lastname:''
    }
})

export const popup = atom({
    key:'popup',
    default:false
})