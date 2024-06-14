import {createSlice } from '@reduxjs/toolkit';
import { getProduct } from './saleActions'

// create slice

const name = 'sale';
const initialState = createInitialState();
const reducers = createReducers();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        loading: false,
        salelines: [], // for user object
        total_amount: 0, // for storing the JWT
        remaining_amount: 0,
        amount_collected: 0,
        payments: [],
        success: false, // for monitoring the registration process.
    }
}

function createReducers() {
    return {
        changeProductQuantity,
        removeProduct,
        setAmount,
        clearSale
    };

    function removeProduct(state, action) {
        state.loading = false;
        let temp;
        state.salelines = state.salelines.filter((item) => {
            if(item.reference !== action.payload.reference){
                return item;
            }else{
                temp=item;
            }
        })
        state.total_amount = state.total_amount - temp.amount;
        state.remaining_amount = state.total_amount - state.amount_collected;
    }

    function changeProductQuantity(state, action) {
        let found;
        state.salelines = state.salelines.map((item) =>{
            if((item.reference === action.payload.reference)){
                found = item;
                action.payload.signe ==1 ? item.quantite++ : item.quantite--;
                item.amount = item.price * item.quantite
            }
            found = item ;
            return item
        })
        state.total_amount = action.payload.signe ==1 ? state.total_amount + found.price : state.total_amount - found.price;
        state.remaining_amount = state.total_amount - state.amount_collected;
    }

    function setAmount(state, action){
        if(state.salelines.length>0){
            let mode_exists = false;
            let collected = 0;
            state.payments = state.payments.map((item) =>{
                if(item.name===action.payload.mode){
                    item.amount = Number(action.payload.value)
                    mode_exists = true;
                }
                collected = collected + Number(item.amount);
                return item;
            })
            if(!mode_exists){
                state.payments.push({name:action.payload.mode, amount: Number(action.payload.value)})
                collected = collected + Number(action.payload.value);
            }
            state.amount_collected = collected
            state.remaining_amount = state.total_amount - state.amount_collected
        }
    }

    function clearSale(state){
        state.salelines = [];
        state.total_amount = 0; // for storing the JWT
        state.remaining_amount= 0;
        state.amount_collected= 0;
        state.payments= [];
    }
}

function createExtraReducers() {
    return (builder) => {
        product();

        function product() {
            var { pending, fulfilled, rejected } = getProduct;
            builder
                .addCase(pending, (state) => {
                    state.loading = true
                    state.error = null
                })
                .addCase(fulfilled, (state, action) => {
                    state.loading = false
                    let found;
                    let total;
                    state.salelines = state.salelines.map((item) =>{
                        if((item.reference === action.payload.product.reference)){
                            found = item;
                            item.quantite = item.quantite + Number(action.payload.quantity) ;
                            item.amount = item.price * item.quantite
                            total = item.amount;
                        }
                        return item
                    })
                    if(!found){
                        total = action.payload.product.price * Number(action.payload.quantity);
                        state.salelines.push({
                            reference: action.payload.product.reference,
                            name: action.payload.product.name,
                            price: action.payload.product.price,
                            image: action.payload.product.image,
                            quantite: Number(action.payload.quantity),
                            amount: total,
                            discount:[]
                        })
                    }
                    
                    state.total_amount = state.total_amount + total;
                    state.remaining_amount = state.total_amount - state.amount_collected;

                    // store user details and basic auth data in local storage to keep user logged in between page refreshes
                    //localStorage.setItem('user', JSON.stringify(user));
                    // get return url from location state or default to home page
                    // const { from } = history.location.state || { from: { pathname: '/' } };
                    // history.navigate(from);
                })
                .addCase(rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                });
        }
    };
}

export const { changeProductQuantity, removeProduct, setAmount, clearSale} = slice.actions
export default slice.reducer