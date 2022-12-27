import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import Button from './Button';

const ErrorOverview = ({ message, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>
        An error occured. Please try again later.
      </Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onPress}>Try again</Button>
    </View>
  );
};

export default ErrorOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
