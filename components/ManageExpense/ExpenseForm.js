import { View } from 'react-native';
import Input from './Input';

const ExpenseForm = () => {
  const amountInputHandler = () => {};

  return (
    <View>
      <Input
        label='Amount'
        textInputConfig={{
          keyboardType: 'decimal-pad',
          placeholder: '0.00',
          onChangeText: amountInputHandler,
        }}
      ></Input>
      <Input
        label='Date'
        textInputConfig={{
          placeholder: 'DD-MM-YYYY',
          maxLength: 10,
          onChangeText: amountInputHandler,
        }}
      ></Input>
      <Input
        label='Description'
        textInputConfig={{
          placeholder: 'Description',
          multiline: true,
          // autoCorrect: true,
          // autoCapitalize: 'sentences',
        }}
      ></Input>
    </View>
  );
};

export default ExpenseForm;
