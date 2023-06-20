import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonCustom, Header, HeaderComponent, ItemReseller } from '../../component';
import { colors } from '../../utils/colors';
import { useIsFocused } from '@react-navigation/native';
import {
  change_to_qty_reseller,
  delete_reseller,
  delete_reseller_all,
  selected_reseller,
} from '../../redux';
import { useSelector, useDispatch } from 'react-redux';
import { Rupiah } from '../../helper/Rupiah';
import Axios from 'axios';
import Config from "react-native-config";
function useForceUpdate() {
  const [refresh, setRefresh] = useState(0); // integer state
  return () => setRefresh((refresh) => ++refresh); // update the state to force render
}
import { Numformat } from '../../helper/Numformat';

const Reseller = ({ navigation }) => {
  const [isSelected, setIsSelected] = useState(false);
  const resellerReducer = useSelector((state) => state.ResellerReducer);
  const isFocused = useIsFocused();
  // const [qtyInduk, setQtyInduk] = useState(1);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [cartState, setCartState] = useState(resellerReducer);
  const forceUpdate = useForceUpdate();
  const [bv, setBv] = useState(0);
  const userReducer = useSelector((state) => state.UserReducer);
  const TOKEN = useSelector((state) => state.TokenApi);
  const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
    console.log('cartState', cartState)
    if (isFocused) {
      setTotal(cartState.total);
      setCartState(resellerReducer);
      setBv(cartState.bv);
      setIsSelected(false);
    }
  }, [isFocused, cartState]);


  const quantity = (harga, type, cart, bvv) => {
    if (type === 'MIN') {
      if (cart.qty !== 0) {
        setTotal(resellerReducer.total - harga);
        if (total <= 0) {
          setTotal(0);
        }
        let bve = resellerReducer.bv - bvv
        setBv(bve);
        if (bve <= 0) {
          setBv(0);
        }
      }
    } else if (type === 'PLUSH') {
      setTotal(total + harga);
      let bve = resellerReducer.bv + bvv
      setBv(bve);
      if (bve <= 0) {
        setBv(0);
      }
    }
    // console.log(cart.qty)
    dispatch(change_to_qty_reseller(cart.qty, cart.id, harga, type, bvv));
  };

  // const tampil = () => {
  //   console.log(cartState);
  // };

  //delete item
  const deleteItem = (id, hargaTotal) => {
    dispatch(delete_reseller(id));
    setCartState(resellerReducer);
    setTotal(resellerReducer.total);
    setBv(resellerReducer.bv);
    forceUpdate();
  };

  // delete all item 
  const deleteAll = () => {
    dispatch(delete_reseller_all());
    // alert('asasasasasasas')
    setCartState(resellerReducer);
    setTotal(resellerReducer.total);
    setIsSelected(false);
    setBv(resellerReducer.bv);
    forceUpdate();
  };

  //memilih semua keranjang
  const checkAll = () => {
    var trueFalse;
    if (isSelected === false) {
      trueFalse = true;
    } else {
      trueFalse = false;
    }
    dispatch(selected_reseller(null, trueFalse));
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.contentHeader}>
        <Text style={styles.textKeranjang}>Reseller Order</Text>
        <View style={styles.boxTitle}>
          <View style={styles.title}>
            <CheckBox
              onChange={checkAll}
              value={isSelected}
              onValueChange={setIsSelected}
              style={styles.checkbox}
            />
            <Text>Pilih Semua Barang</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              deleteAll();
            }}>
            <Text style={styles.textHapus}>Hapus</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scroll}>
        {cartState.item.map((cart) => {
          return (
            <ItemReseller
              key={cart.id}
              selected={isSelected}
              // selectedFalse={() => {selectedFalse()}}
              cart={cart}
              btnMin={() => {
                quantity(cart.harga, 'MIN', cart, cart.bv);
              }}
              btnPlush={() => {
                quantity(cart.harga, 'PLUSH', cart, cart.bv);
              }}
              deleteItem={() => {
                deleteItem(cart.id, cart.qty * cart.harga);
              }}
            />
          );
        })}
      </ScrollView>
      <View style={styles.boxTotal}>
        <View>
          <Text style={styles.textTotal}>{Rupiah(total)}</Text>
          <Text style={styles.hargaTotal}>({Numformat(bv / 1000)} bv)</Text>
        </View>
        <ButtonCustom
          name='Tambah'
          width='30%'
          color={colors.btn_primary}
          func={() => { navigation.navigate('Products', { dataForm: null, dataType: 'Reseller', activation_type_id: null }) }}
        />
        <ButtonCustom
          name='CheckOut'
          width='30%'
          color={colors.btn}
          func={() => { navigation.navigate('PackageToken', { dataForm: null, dataType: 'Reseller', activationType: null }) }}
        />

      </View>
    </View>
  );
};

export default Reseller;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  contentHeader: {
    paddingHorizontal: 20,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.disable,
  },
  textKeranjang: {
    fontSize: 25,
    marginBottom: 10,
  },
  boxTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    // justifyContent : 'space-between',
    marginTop: 30,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  textHapus: {
    // marginLeft: 140,
    color: colors.default,
    fontWeight: 'bold',
  },
  line: {
    marginTop: 10,
    borderColor: colors.disable,
    borderWidth: 4,
  },
  boxTotal: {
    // alignItems: "flex-end",
    height: 60,
    // backgroundColor : 'red',
    paddingHorizontal: 20,
    paddingTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.disable,
  },
  textTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hargaTotal: {
    fontSize: 16,
  },
  btnBeli: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  borderBtn: {
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    justifyContent: 'center',
    borderColor: '#ff781f',
    backgroundColor: '#ff781f',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
