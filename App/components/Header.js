import { StyleSheet, Text, View, Image } from 'react-native';
import Logo from "../../assets/logo.svg"
import Hamburger from "../../assets/hamburger.svg"
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js'

const Header = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <Hamburger/>
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