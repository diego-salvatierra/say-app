import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Logo from "../../assets/logo.svg"
import Hamburger from "../../assets/hamburger.svg"
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js'
import { DrawerActions } from '@react-navigation/native';

const Header = (navigation) => {
  navigation = navigation.navigation
  return (
    <View style={styles.container}>
      <Logo />
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Hamburger/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingTop: 30,
    paddingLeft: 20,
  }
});

export default Header;