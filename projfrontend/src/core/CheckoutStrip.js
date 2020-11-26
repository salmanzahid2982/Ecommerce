import React,{useState,useEffect} from 'react'
import { isAutheticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';


const CheckoutStrip=({products,setReload=f=>f,reload=undefined})=> {
    const [data, setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })

    const token=isAutheticated()&&isAutheticated().token
    const userId=isAutheticated()&&isAutheticated().user._id

    const getFinalAmount=()=>{
        let amount=0;
        products.map(p=>{
            amount=amount+p.price
        });
        return amount
    }

    const showStripeButton=()=>{
        return isAutheticated()?(
            <button className="btn btn-success">Pay with Stripe</button>
        ):(
            <link to="signin">
                <button className="btn btn-warning">Signin</button>
            </link>
        )
    }

    return (
        <div>
            <h3 className="text-white">Stripe Chekout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default CheckoutStrip;
