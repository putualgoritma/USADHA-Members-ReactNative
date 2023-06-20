export const add_to_reseller = (value, count) => {
  return {type: 'ADD_TO_RESELLER', valueItem: value, count: count};
};

export const change_to_qty_reseller = (value, id, harga, typeOperator, bv) => {
  return {
    type: 'CHANGE_TO_QTY_RESELLER',
    valueItem: value,
    id: id,
    harga: harga,
    typeOperator: typeOperator,
    bv: bv,
  };
};

export const delete_reseller = (id = null) => {
  return {type: 'DELETE_RESELLER', id: id};
};

export const delete_reseller_all = () => {
  return {type: 'DELETE_RESELLER_All'};
};

export const selected_reseller = (id = null, value) => {
  return {type: 'SELECTED_RESELLER', id: id, value: value};
};

export const check_out_reseller = () => {
  return {type: 'CHECK_OUT_RESELLER'};
};


export const add_to_amaintain = (value, count) => {
  return {type: 'ADD_TO_AMAINTAIN', valueItem: value, count: count};
};

export const change_to_qty_amaintain = (value, id, harga, typeOperator, bv) => {
  return {
    type: 'CHANGE_TO_QTY_AMAINTAIN',
    valueItem: value,
    id: id,
    harga: harga,
    typeOperator: typeOperator,
    bv: bv,
  };
};

export const delete_amaintain = (id = null) => {
  return {type: 'DELETE_AMAINTAIN', id: id};
};

export const delete_amaintain_all = () => {
  return {type: 'DELETE_AMAINTAIN_All'};
};

export const selected_amaintain = (id = null, value) => {
  return {type: 'SELECTED_AMAINTAIN', id: id, value: value};
};

export const check_out_amaintain = () => {
  return {type: 'CHECK_OUT_AMAINTAIN'};
};

export const add_to_package = (value, count) => {
  return {type: 'ADD_TO_PACKAGE', valueItem: value, count: count};
};

export const change_to_package_qty = (value, id, harga, bv, weight, typeOperator) => {
  return {
    type: 'CHANGE_TO_PACKAGE_QTY',
    valueItem: value,
    id: id,
    harga: harga,
    typeOperator: typeOperator,
    bv: bv,
    weight: weight,
  };
};

export const delete_package = (id = null) => {
  return {type: 'DELETE_PACKAGE', id: id};
};

export const delete_package_all = () => {
  return {type: 'DELETE_PACKAGE_All'};
};

export const selected_package = (id = null, value) => {
  return {type: 'SELECTED_PACKAGE', id: id, value: value};
};

export const check_out_package = () => {
  return {type: 'CHECK_OUT_PACKAGE'};
};

export const add_to_cart = (value, count) => {
  return {type: 'ADD_TO_CART', valueItem: value, count: count};
};

export const change_to_qty = (value, id, harga, typeOperator) => {
  return {
    type: 'CHANGE_TO_QTY',
    valueItem: value,
    id: id,
    harga: harga,
    typeOperator: typeOperator,
  };
};

export const delete_cart = (id = null) => {
  return {type: 'DELETE_CART', id: id};
};

export const delete_cart_all = () => {
  return {type: 'DELETE_CART_All'};
};

export const selected_cart = (id = null, value) => {
  return {type: 'SELECTED', id: id, value: value};
};

export const check_out_keranjang = () => {
  return {type: 'CHECK_OUT_KERANJANG'};
};

export const token_api = (token) => {
  return {type : 'TOKEN_API', token}
}

export const count_hu = (hu) => {
  return {type : 'COUNT_HU', hu}
}

export const status_up = (sup) => {
  return {type : 'STATUS_UP', sup}
}

export const dataScan = (ds) => {
  return {type : 'DATASCAN', ds}
}

export const dataSlot = (dsl) => {
  return {type : 'DATASLOT', dsl}
}
