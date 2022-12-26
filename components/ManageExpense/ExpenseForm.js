import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../UI/Button';
import Input from './Input';

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonText,
  defaultValues,
}) => {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues?.amount?.toString() || '',
    date:
      defaultValues?.date
        ?.toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('-') || '',
    description: defaultValues?.description || '',
  });

  const InputHandler = (inputIdentifier, enteredText) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteredText,
      };
    });
  };

  const submitHandler = () => {
    // convert date type DD-MM-YYYY to new Date()
    const dateParts = inputValues.date.split('-');
    const expenseData = {
      amount: parseFloat(inputValues.amount),
      description: inputValues.description,
      date: new Date(dateParts[2], dateParts[1] - 1, dateParts[0]),
    };
    onSubmit(expenseData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Expense Form</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            placeholder: '0.00',
            onChangeText: InputHandler.bind(this, 'amount'),
            value: inputValues.amount,
          }}
          style={styles.rowInput}
        />
        <Input
          label='Date'
          textInputConfig={{
            placeholder: 'DD-MM-YYYY',
            maxLength: 10,
            onChangeText: InputHandler.bind(this, 'date'),
            value: inputValues.date,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          placeholder: 'Description',
          multiline: true,
          // autoCorrect: true,
          // autoCapitalize: 'sentences',
          onChangeText: InputHandler.bind(this, 'description'),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button mode='flat' onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonText}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    // marginTop: 10,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
