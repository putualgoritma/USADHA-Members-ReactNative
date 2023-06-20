import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ButtonCustom, Header, HeaderComponent, ItemAmaintain} from '../../component';
import {colors} from '../../utils/colors';
import {useIsFocused} from '@react-navigation/native';
import {
  change_to_qty_amaintain,
  delete_amaintain,
  delete_amaintain_all,
  selected_amaintain,
} from '../../redux';
import {useSelector, useDispatch} from 'react-redux';
import {Rupiah} from '../../helper/Rupiah';
import Axios from 'axios';
import Config from "react-native-config";
function useForceUpdate() {
  const [refresh, setRefresh] = useState(0); // integer state
  return () => setRefresh((refresh) => ++refresh); // update the state to force render
}
import { Numformat } from '../../helper/Numformat';

const AutoMaintain = ({navigation}) => {
  const [isSelected, setIsSelected] = useState(false);
  const amaintainReducer = useSelector((state) => state.AmaintainReducer);
  const isFocused = useIsFocused();
  // const [qtyInduk, setQtyInduk] = useState(1);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [cartState, setCartState] = useState(amaintainReducer);
  const forceUpdate = useForceUpdate();
  const [bv, setBv] = useState(0);
  const [bvmin, setBvmin] = useState(0);
  const userReducer = useSelector((state) => state.UserReducer);
  const TOKEN = useSelector((state) => state.TokenApi);
  const [isLoading, setIsLoading] = useState(false);
  
  
  useEffect(() => {
    console.log('cartState',cartState)
    if(isFocused){
      setTotal(cartState.total);
      setCartState(amaintainReducer);
      setBv(cartState.bv);
      setIsSelected(false);
      getData();      
    }
  }, [isFocused, cartState]);

  const getData = async () => {
    //console.log('dataType',dataType)    
    Promise.all([getAutoMaintain()]).then(res => {
      console.log('getAutoMaintain',res)
      console.log('bv', bv)
      setBvmin(res[0])
      setIsLoading(false)
    }).catch(e => {
      //alert('not promise'+e.request._response)
      console.log('not promise', e)
      setIsLoading(false)
    })
  };

  const getAutoMaintain = () => {
    const promise2 = new Promise((resolve, reject) => {
      Axios.get(Config.API_AUTO_MAINTAIN + `?customer_id=${userReducer.id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Accept': 'application/json'
        }
      })
        .then((result) => {
          //alert('getAutoMaintain')
          console.log('getAutoMaintain', result.data.data)
          //setActBalance(result.data.data)
          resolve(result.data.data);
          // getAgen()
        }).catch((e) => {
          alert('koneksi error, mohon buka ulang aplikasinya'+e.request._response)
          reject(e);
          console.log(e);
          // BackHandler.exitApp()
        })
    })
    return promise2;
  }
  
  
  const quantity = (harga, type, cart, bvv) => {
    if (type === 'MIN') {
      if (cart.qty !== 0) {
        setTotal(amaintainReducer.total - harga);
        if (total <= 0) {
          setTotal(0);
        }
        let bve = amaintainReducer.bv - bvv
      setBv(bve);
      if (bve <= 0) {
        setBv(0);
      }
      }
    } else if (type === 'PLUSH') {
      setTotal(total + harga);
      let bve = amaintainReducer.bv + bvv
      setBv(bve);
      if (bve <= 0) {
        setBv(0);
      }
    }
    // console.log(cart.qty)
    dispatch(change_to_qty_amaintain(cart.qty, cart.id, harga, type, bvv));
  };

  // const tampil = () => {
  //   console.log(cartState);
  // };

  //delete item
  const deleteItem = (id, hargaTotal) => {
    dispatch(delete_amaintain(id));
    setCartState(amaintainReducer);
    setTotal(amaintainReducer.total);
    setBv(amaintainReducer.bv);
    forceUpdate();
  };

  // delete all item 
  const deleteAll = () => {
    dispatch(delete_amaintain_all());
    // alert('asasasasasasas')
    setCartState(amaintainReducer);
    setTotal(amaintainReducer.total);
    setIsSelected(false);
    setBv(amaintainReducer.bv);
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
    dispatch(selected_amaintain(null, trueFalse));
  };

  return (
    <View style={styles.container}>
       <HeaderComponent/>
      <View style={styles.contentHeader}>
        <Text style={styles.textKeranjang}>Auto Maintain</Text>
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
            <ItemAmaintain
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
        {bvmin > 0 &&
        <ButtonCustom
          name='Tambah'
          width='30%'
          color={colors.btn_primary}
          func={() => { navigation.navigate('Products', { dataForm: null, dataType: 'Amaintain', activation_type_id: null }) }}
        />      
      }
        {cartState.item.length == 0 || bvmin<=0 ? 
          (   
            <ButtonCustom
              name = 'Checkout'
              width ='30%'
              color= {colors.disable}
              func = {() => alert('Keranjang Kosong')}
            />
          )   
          :
          bvmin > bv ?
            (
              <ButtonCustom
                name='CheckOut'
                width='30%'
                color={colors.disable}
                func={() => alert('BV kurang atau masih dibawah batasan minimum.')}
              />
            )
            :
          ( 
            <ButtonCustom
              name = 'CheckOut'
              width ='30%'
              color= {colors.btn}
              func ={() => { navigation.navigate('Agen', {dataForm: null, dataType : 'Amaintain', activationType : null})}}
            />
          )
        }

      </View>
    </View>
  );
};

export default AutoMaintain;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  contentHeader: {
    paddingHorizontal: 20,
    marginTop : 5,
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
