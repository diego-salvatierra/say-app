import { StyleSheet, Text, View, Image } from 'react-native';
import Logo from "../../assets/logo.svg"
import Hamburger from "../../assets/hamburger.svg"

const Header = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <Hamburger />
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
  }
});

export default Header;