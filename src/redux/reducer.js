// /ini contoh state secara global

import {combineReducers} from '@reduxjs/toolkit';

//  const initialState = {
//     name : 'fajar'
//  }

// const reducer = (state = initialState, action)=>{ //kirim nilai initiallState ke state
//     return state; //dan hasilkan nilai state saat reducer ini dipanggil di store,js
// };

const User = {};
const UserReducer = (state = User, action) => {
  //kirim nilai initiallState ke state
  if (action.type === 'SET_DATA_USER') {
    state = action.value
    // console.log('reducer user',state)
  };
  return state; //dan hasilkan nilai state saat reducer ini dipanggil di store,js
};

// const initialStateLogin = {
//   title: 'Login Page',
//   desc: 'ini aalah desc ntuk Login',
// };
// const LoginReducer = (state = initialStateLogin, action) => {
//   //kirim nilai initiallState ke state
//   return state; //dan hasilkan nilai state saat reducer ini dipanggil di store,js
// };

const initialPackageItem = {
  item: [],
  total: 0,
  count: 0,
  bv: 0,
  totalWeight: 0,
};
const PackageReducer = (state = initialPackageItem, action) => {
  // console.log('initial reducer',initialPackageItem.length)
  if (action.type === 'ADD_TO_PACKAGE') {
    // return (
    state.item[state.item.length] = action.valueItem;
    state.total = state.total + action.valueItem.harga;
    state.bv = state.bv + action.valueItem.bv;
    state.totalWeight = state.totalWeight + action.valueItem.weight;
    state.count = state.count + action.count;

    // item[item.length] = {ID:'3',Name:'Some name 3',Notes:'NOTES 3'};
    // )

    // console.log('count keranajang', state.count)
  } else if (action.type === 'CHANGE_TO_PACKAGE_QTY') {
    if (action.valueItem < 0) {
      action.valueItem = 0;
    }
    state.item.map((paket) => {
      if (paket.id === action.id) {
        paket.qty = action.valueItem;
        paket.harga = action.harga;
        // console.log('qty reducer', totalHarga);

        if (action.typeOperator == 'MIN') {
          state.total = state.total - action.harga;
          state.bv = state.bv - action.bv;
          state.totalWeight = state.totalWeight - action.weight;
          paket.qty  = paket.qty - 1
          if (state.total < 0) {
            state.total = 0;
          }
          if (state.bv < 0) {
            state.bv = 0;
          }
          if (state.totalWeight < 0) {
            state.totalWeight = 0;
          }
            // console.log(paket.qty)
        } else if (action.typeOperator == 'PLUSH') {
          state.total = state.total + action.harga;
          state.bv = state.bv + action.bv;
          state.totalWeight = state.totalWeight + action.weight;
          paket.qty  = paket.qty + 1
          if (state.total < 0) {
            state.total = 0;
          }
          if (state.bv < 0) {
            state.bv = 0;
          }
          if (state.totalWeight < 0) {
            state.totalWeight = 0;
          }
          // console.log('ini plush pada state', state.total);
        }
      }
      // state.total = state.total + x.harga
      // state.total = 0
      // console.log(state);
      
    });
  } else if (action.type === 'DELETE_PACKAGE') {
    var itemArray = state.item;
    for (var i = 0; i < state.item.length; i++) {
      if (itemArray[i].id === action.id) {
        state.total = state.total - (itemArray[i].harga * itemArray[i].qty);
        state.bv = state.bv - (itemArray[i].bv * itemArray[i].qty);
        state.totalWeight = state.totalWeight - (itemArray[i].weight * itemArray[i].qty);
        state.item.splice(i, 1);
        state.count = state.count - 1;
        // console.log(itemArray[i].qty)
      }
    }
  } else if (action.type === 'SELECTED_PACKAGE') {
    if (action.id !== null) {
      state.item.map((paket) => {
        if (paket.id == action.id) {
          paket.selected = action.value;
        }
      });
    } else {
      state.item.map((paket) => {
        paket.selected = action.value;
      });
    }
  } else if (action.type === 'DELETE_PACKAGE_All') {
    // var itemArray = state.item;
    // var i = 0;
    // while (i < itemArray.length) {
    //   if (itemArray[i].selected === true) {
    //     state.total = state.total - (itemArray[i].harga * itemArray[i].qty);
    //     state.bv = state.bv - (itemArray[i].bv * itemArray[i].qty);
    //     state.totalWeight = state.totalWeight - (itemArray[i].weight * itemArray[i].qty);
    //     itemArray.splice(i, 1);
    //   } else {
    //     ++i;
    //   }
    //   console.log(i);
    // }
    // state.count = state.item.length;
    // // return itemArray;
    state.item = [];
    state.total = 0;
    state.count = 0;
    state.bv = 0;
    state.totalWeight = 0;
  } else if (action.type === 'CHECK_OUT_PACKAGE') {
    state.item = [];
    state.total = 0;
    state.count = 0;
    state.bv = 0;
    state.totalWeight = 0;
  }
  //kirim nilai initiallState ke state
  return state; //dan hasilkan nilai state saat reducer ini dipanggil di store,js
};

const initialResellerItem = {
  item: [],
  total: 0,
  count: 0,
  bv: 0,
};
const ResellerReducer = (state = initialResellerItem, action) => {
  // console.log('initial reducer',initialResellerItem.length)
  if (action.type === 'ADD_TO_RESELLER') {
    // return (
    state.item[state.item.length] = action.valueItem;
    state.total = state.total + action.valueItem.harga;
    state.count = state.count + action.count;
    state.bv = state.bv + action.valueItem.bv;

    // item[item.length] = {ID:'3',Name:'Some name 3',Notes:'NOTES 3'};
    // )

    // console.log('count keranajang', state.count)
  } else if (action.type === 'CHANGE_TO_QTY_RESELLER') {
    if (action.valueItem < 0) {
      action.valueItem = 0;
    }
    state.item.map((reseller) => {
      if (reseller.id === action.id) {
        reseller.qty = action.valueItem;
        reseller.harga = action.harga;
        // console.log('qty reducer', totalHarga);

        if (action.typeOperator == 'MIN') {
          state.total = state.total - action.harga;
          reseller.qty  = reseller.qty - 1
          state.bv = state.bv - action.bv;
          if (state.total < 0) {
            state.total = 0;
          }
          if (state.bv < 0) {
            state.bv = 0;
          }
            // console.log(reseller.qty)
        } else if (action.typeOperator == 'PLUSH') {
          state.total = state.total + action.harga;
          state.bv = state.bv + action.bv;
          if (state.bv < 0) {
            state.bv = 0;
          }
          console.log('ini plush pada state', state.total);
        }
      }
      // state.total = state.total + x.harga
      // state.total = 0
      // console.log(state);
      
    });
  } else if (action.type === 'DELETE_RESELLER') {
    var itemArray = state.item;
    for (var i = 0; i < state.item.length; i++) {
      if (itemArray[i].id === action.id) {
        state.total = state.total - (itemArray[i].harga * itemArray[i].qty);
        state.bv = state.bv - (itemArray[i].bv * itemArray[i].qty);
        state.item.splice(i, 1);
        state.count = state.count - 1;
        // console.log(itemArray[i].qty)
      }
    }
  } else if (action.type === 'SELECTED_RESELLER') {
    if (action.id !== null) {
      state.item.map((reseller) => {
        if (reseller.id == action.id) {
          reseller.selected = action.value;
        }
      });
    } else {
      state.item.map((reseller) => {
        reseller.selected = action.value;
      });
    }
  } else if (action.type === 'DELETE_RESELLER_All') {
    // var itemArray = state.item;
    // var i = 0;
    // while (i < itemArray.length) {
    //   if (itemArray[i].selected === true) {
    //     state.total = state.total - (itemArray[i].harga * itemArray[i].qty);
    //     state.bv = state.bv - (itemArray[i].bv * itemArray[i].qty);
    //     itemArray.splice(i, 1);
    //   } else {
    //     ++i;
    //   }
    //   console.log(i);
    // }
    // state.count = state.item.length;
    // // return itemArray;
    state.item = [];
    state.total = 0;
    state.count = 0;
    state.bv = 0;
  } else if (action.type === 'CHECK_OUT_RESELLER') {
    state.item = [];
    state.total = 0;
    state.count = 0;
    state.bv = 0;
  }
  //kirim nilai initiallState ke state
  return state; //dan hasilkan nilai state saat reducer ini dipanggil di store,js
};

const initialAmaintainItem = {
  item: [],
  total: 0,
  count: 0,
  bv: 0,
};
const AmaintainReducer = (state = initialAmaintainItem, action) => {
  // console.log('initial reducer',initialAmaintainItem.length)
  if (action.type === 'ADD_TO_AMAINTAIN') {
    // return (
    state.item[state.item.length] = action.valueItem;
    state.total = state.total + action.valueItem.harga;
    state.count = state.count + action.count;
    state.bv = state.bv + action.valueItem.bv;

    // item[item.length] = {ID:'3',Name:'Some name 3',Notes:'NOTES 3'};
    // )

    // console.log('count keranajang', state.count)
  } else if (action.type === 'CHANGE_TO_QTY_AMAINTAIN') {
    if (action.valueItem < 0) {
      action.valueItem = 0;
    }
    state.item.map((amaintain) => {
      if (amaintain.id === action.id) {
        amaintain.qty = action.valueItem;
        amaintain.harga = action.harga;
        // console.log('qty reducer', totalHarga);

        if (action.typeOperator == 'MIN') {
          state.total = state.total - action.harga;
          amaintain.qty  = amaintain.qty - 1
          state.bv = state.bv - action.bv;
          if (state.total < 0) {
            state.total = 0;
          }
          if (state.bv < 0) {
            state.bv = 0;
          }
            // console.log(amaintain.qty)
        } else if (action.typeOperator == 'PLUSH') {
          state.total = state.total + action.harga;
          state.bv = state.bv + action.bv;
          if (state.bv < 0) {
            state.bv = 0;
          }
          console.log('ini plush pada state', state.total);
        }
      }
      // state.total = state.total + x.harga
      // state.total = 0
      // console.log(state);
      
    });
  } else if (action.type === 'DELETE_AMAINTAIN') {
    var itemArray = state.item;
    for (var i = 0; i < state.item.length; i++) {
      if (itemArray[i].id === action.id) {
        state.total = state.total - (itemArray[i].harga * itemArray[i].qty);
        state.bv = state.bv - (itemArray[i].bv * itemArray[i].qty);
        state.item.splice(i, 1);
        state.count = state.count - 1;
        // console.log(itemArray[i].qty)
      }
    }
  } else if (action.type === 'SELECTED_AMAINTAIN') {
    if (action.id !== null) {
      state.item.map((amaintain) => {
        if (amaintain.id == action.id) {
          amaintain.selected = action.value;
        }
      });
    } else {
      state.item.map((amaintain) => {
        amaintain.selected = action.value;
      });
    }
  } else if (action.type === 'DELETE_AMAINTAIN_All') {
    // var itemArray = state.item;
    // var i = 0;
    // while (i < itemArray.length) {
    //   if (itemArray[i].selected === true) {
    //     state.total = state.total - (itemArray[i].harga * itemArray[i].qty);
    //     state.bv = state.bv - (itemArray[i].bv * itemArray[i].qty);
    //     itemArray.splice(i, 1);
    //   } else {
    //     ++i;
    //   }
    //   console.log(i);
    // }
    // state.count = state.item.length;
    // // return itemArray;
    state.item = [];
    state.total = 0;
    state.count = 0;
    state.bv = 0;
  } else if (action.type === 'CHECK_OUT_AMAINTAIN') {
    state.item = [];
    state.total = 0;
    state.count = 0;
    state.bv = 0;
  }
  //kirim nilai initiallState ke state
  return state; //dan hasilkan nilai state saat reducer ini dipanggil di store,js
};

const initialCartItem = {
  item: [],
  total: 0,
  count: 0,
};
const CartReducer = (state = initialCartItem, action) => {
  // console.log('initial reducer',initialCartItem.length)
  if (action.type === 'ADD_TO_CART') {
    // return (
    state.item[state.item.length] = action.valueItem;
    state.total = state.total + action.valueItem.harga;
    state.count = state.count + action.count;

    // item[item.length] = {ID:'3',Name:'Some name 3',Notes:'NOTES 3'};
    // )

    // console.log('count keranajang', state.count)
  } else if (action.type === 'CHANGE_TO_QTY') {
    if (action.valueItem < 0) {
      action.valueItem = 0;
    }
    state.item.map((cart) => {
      if (cart.id === action.id) {
        cart.qty = action.valueItem;
        cart.harga = action.harga;
        // console.log('qty reducer', totalHarga);

        if (action.typeOperator == 'MIN') {
          state.total = state.total - action.harga;
          cart.qty  = cart.qty - 1
          if (state.total < 0) {
            state.total = 0;
          }
            // console.log(cart.qty)
        } else if (action.typeOperator == 'PLUSH') {
          state.total = state.total + action.harga;
          console.log('ini plush pada state', state.total);
        }
      }
      // state.total = state.total + x.harga
      // state.total = 0
      // console.log(state);
      
    });
  } else if (action.type === 'DELETE_CART') {
    var itemArray = state.item;
    for (var i = 0; i < state.item.length; i++) {
      if (itemArray[i].id === action.id) {
        state.total = state.total - (itemArray[i].harga * itemArray[i].qty);
        state.item.splice(i, 1);
        state.count = state.count - 1;
        // console.log(itemArray[i].qty)
      }
    }
  } else if (action.type === 'SELECTED') {
    if (action.id !== null) {
      state.item.map((cart) => {
        if (cart.id == action.id) {
          cart.selected = action.value;
        }
      });
    } else {
      state.item.map((cart) => {
        cart.selected = action.value;
      });
    }
  } else if (action.type === 'DELETE_CART_All') {
    // var itemArray = state.item;
    // var i = 0;
    // while (i < itemArray.length) {
    //   if (itemArray[i].selected === true) {
    //     state.total = state.total - (itemArray[i].harga * itemArray[i].qty);
    //     itemArray.splice(i, 1);
    //   } else {
    //     ++i;
    //   }
    //   console.log(i);
    // }
    // state.count = state.item.length;
    // // return itemArray;
    state.item = [];
    state.total = 0;
    state.count = 0;
  } else if (action.type === 'CHECK_OUT_KERANJANG') {
    state.item = [];
    state.total = 0;
    state.count = 0;
  }
  //kirim nilai initiallState ke state
  return state; //dan hasilkan nilai state saat reducer ini dipanggil di store,js
};

const Token = '';

const TokenApi = (state = Token, action) => {
  //kirim nilai initiallState ke state
  if (action.type === 'TOKEN_API') {
    // console.log(action.token)
    state = action.token
    // console.log('reducer TOken', state)
  }
  return state; //dan hasilkan nilai state saat reducer ini dipanggil di store,js
};

const HU = 1;

const CountHU = (state = HU, action) => {
  //kirim nilai initiallState ke state
  if (action.type === 'COUNT_HU') {
    // console.log(action.token)
    state = action.hu
    // console.log('reducer TOken', state)
  }
  return state; //dan hasilkan nilai state saat reducer ini dipanggil di store,js
};

const stateUP = {};

const StatusUP = (state = stateUP, action) => {
  //kirim nilai initiallState ke state
  if (action.type === 'STATUS_UP') {
    // console.log(action.token)
    state = action.sup
    // console.log('reducer TOken', state)
  }
  return state; //dan hasilkan nilai state saat reducer ini dipanggil di store,js
};

const DS = 0;

const DataScan = (state = DS, action) => {
  //kirim nilai initiallState ke state
  if (action.type === 'DATASCAN') {
    state = action.ds
  }
  return state; //dan hasilkan nilai state saat reducer ini dipanggil di store,js
};

const DSL = 0;

const DataSlot = (state = DSL, action) => {
  //kirim nilai initiallState ke state
  if (action.type === 'DATASLOT') {
    state = action.dsl
  }
  return state; //dan hasilkan nilai state saat reducer ini dipanggil di store,js
};

const reducer = combineReducers({
  UserReducer,
  // LoginReducer,
  CartReducer,
  TokenApi,
  PackageReducer,
  CountHU,
  StatusUP,
  DataScan,
  DataSlot,
  AmaintainReducer,
  ResellerReducer,
});

export default reducer;
