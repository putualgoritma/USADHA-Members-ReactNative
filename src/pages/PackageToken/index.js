import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonCustom, Header2, Releoder } from '../../component';
import { Input } from '../../component/Input';
import { colors } from '../../utils/colors';
import Axios from 'axios';
import Config from "react-native-config";
import {
  delete_package_all,
  add_to_package,
  delete_cart_all,
  add_to_cart,
  delete_reseller_all,
  add_to_reseller,
} from '../../redux';
import { useSelector, useDispatch } from 'react-redux';

var colorbtn = colors.disable
const PackageToken = ({ navigation, route }) => {
  const [loading, setLoading] = useState(null)
  const isFocused = useIsFocused()
  const dataForm = (typeof route.params !== 'undefined') ? route.params.dataForm : null;
  const dataType = (typeof route.params !== 'undefined') ? route.params.dataType : 'Checkout';
  const TOKEN = useSelector((state) => state.TokenApi);
  const dispatch = useDispatch();
  const cartReducer = useSelector((state) => dataType == 'Checkout' ? state.CartReducer : dataType == 'Amaintain' ? state.AmaintainReducer : dataType == 'Reseller' ? state.ResellerReducer : state.PackageReducer);
  const [cartState, setCartState] = useState(cartReducer);

  const [form, setForm] = useState({
    token: '',
  })

  const handleToken = () => {
    if (form.token != '') {
      let token_type = 'activation'
      if (dataType == 'Jaringan') {
        token_type = 'activation'
      }
      if (dataType == 'Checkout') {
        token_type = 'ro'
      }
      if (dataType == 'Reseller') {
        token_type = 'reseller'
      }
      setLoading(true)
      Axios.get(Config.API_TOKEN_VALID + `?token=${form.token}` + `&type=${token_type}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Accept': 'application/json',
          }
        }
      ).then((result) => {
        if (result.data.status == true) {
          console.log('cartState', cartState)
          console.log('result.data', result.data.data.products)
          if (dataType == 'Jaringan') {
            dispatch(delete_package_all());
          }
          if (dataType == 'Checkout') {
            dispatch(delete_cart_all());
          }
          if (dataType == 'Reseller') {
            dispatch(delete_reseller_all());
          }
          result.data.data.products.map((cartval, index) => {
            let item = {}
            item.id = cartval.id
            item.namaProduct = cartval.name
            item.harga = parseInt(cartval.price)
            item.selected = false
            item.qty = 1
            item.note = ''
            item.img = ''
            item.status = 'pending'
            item.weight = 0
            item.bv = 0
            console.log('item', item)
            if (dataType == 'Jaringan') {
              dispatch(add_to_package(item, 1));
            }
            if (dataType == 'Checkout') {
              dispatch(add_to_cart(item, 1));
            }
            if (dataType == 'Reseller') {
              dispatch(add_to_reseller(item, 1));
            }
          })
          navigation.navigate('CheckOut', { dataAgen: { id: result.data.data.agents.id, name: result.data.data.agents.name }, dataForm: dataForm, dataType: dataType, activationType: result.data.data.activation_type_id, tokenSale: form.token })
          // setOrders(null);
          // dispatch(check_out_keranjang());
          // alert('Pesanan anda sedang di buat')
          // navigation.navigate('Package', { dataForm: form, dataType: 'Jaringan' })
          setLoading(false)
        } else {
          alert(result.data.message)
        }
        setLoading(false)
      }).catch((error) => {
        //alert(' ' + error);
        console.log('err', error.request._response)
        alert('pesanan gagal di buat')
        setLoading(false)
      });
    } else {
      if (dataType == 'Jaringan') {
        navigation.navigate('Package', { dataForm: dataForm, dataType: dataType })
      }
      if (dataType == 'Checkout') {
        if (cartState.item.length == 0) {
          alert('Keranjang Kosong!')
          navigation.navigate('Dashboard')
        } else {
          navigation.navigate('Agen', { dataForm: null, dataType: 'Checkout', activationType: null })
        }
      }
      if (dataType == 'Reseller') {
        if (cartState.item.length == 0) {
          alert('Keranjang Kosong!')
          navigation.navigate('Reseller')
        } else {
          navigation.navigate('Agen', { dataForm: null, dataType: 'Reseller', activationType: null })
        }
      }
    }
  }

  const onInputChange = (input, value) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  colorbtn = colors.btn

  useEffect(() => {
    console.log('dataForm', dataForm)
    console.log('dataType', dataType)
  }, [isFocused])

  if (loading) {
    return (
      <Releoder />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header2 title='Token' btn={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.textTitle}>Masukkan Token</Text>

          <View style={{ flexDirection: 'row' }}>
            <Text> </Text>
          </View>

          <View style={{ marginBottom: 70 }}>
            <Input
              placeholder='Token'
              title="Token"
              keyboardType="numeric"
              value={form.token}
              onChangeText={(value) => onInputChange('token', value)}
            />
            <Text style={styles.textRed}> *kosongkan jika tidak menggunakan token</Text>

            <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
              <ButtonCustom
                name='Selanjutnya'
                width='100%'
                color={colors.btn}
                func={() => handleToken()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView  >
  );
};

export default PackageToken;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingBottom: 10,
  },
  form: {
    paddingHorizontal: 30,
    marginTop: 25,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 10,
  },
  textRed: {
    fontSize: 10,
    color: 'red',
  },
  login: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  textLogin: {
    letterSpacing: 2,
    color: colors.dark,
  },
  textMasuk: {
    color: colors.default,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  titlelabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  selectPicker: {
    marginVertical: 10,
  },
  pickerBorder: {
    borderBottomWidth: 1,
    borderColor: colors.default,
    marginVertical: 20,
  },
  containerPicker: {
    marginHorizontal: 30,
  },
  textBank: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  textInput: {
    borderBottomWidth: 1,
    paddingVertical: 15,
    borderColor: colors.default,
  },
  containerInput: {
    marginBottom: 20,
  },
  titlelabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  box: {
    marginBottom: 10
  },
  agen: {
    padding: 20,
    marginBottom: 10,
    borderWidth: 3,
    // borderColor : colors.disable,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 0,
  },
  pilihPaket: {
    marginBottom: 5
  },
  borderLogin: {
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: colors.btn,
    borderColor: colors.btn,
    shadowColor: '#000',
  },
  borderLogin1: {
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: colors.btn,
    borderColor: colors.btn,
    shadowColor: '#000',
  },
  textBtnLogin: {
    color: '#ffffff',
    fontSize: 18,
  },
  header: {
    backgroundColor: colors.default,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  textHeader: {
    fontSize: 20,
    color: '#39311d',
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#ffffff'
  },
  bell: {
    fontSize: 20,
    color: 'white',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
