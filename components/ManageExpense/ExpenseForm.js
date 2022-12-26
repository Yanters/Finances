import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import Button from '../UI/Button';
import Input from './Input';

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonText,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount?.toString() || '',
      isValid: true,
    },

    date: {
      value:
        defaultValues?.date
          ?.toISOString()
          .split('T')[0]
          .split('-')
          .reverse()
          .join('-') || '',
      isValid: true,
    },
    description: {
      value: defaultValues?.description || '',
      isValid: true,
    },
  });

  const InputHandler = (inputIdentifier, enteredText) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: {
          value: enteredText,
          isValid: true,
        },
      };
    });
  };

  const submitHandler = () => {
    // convert date type DD-MM-YYYY to new Date()
    const dateParts = inputs.date.value.split('-');
    const expenseData = {
      amount: parseFloat(inputs.amount.value),
      description: inputs.description.value,
      date: new Date(dateParts[2], dateParts[1] - 1, dateParts[0]),
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prevState) => {
        return {
          ...prevState,
          amount: {
            ...prevState.amount,
            isValid: amountIsValid,
          },
          date: {
            ...prevState.date,
            isValid: dateIsValid,
          },
          description: {
            ...prevState.description,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Expense Form</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            placeholder: '0.00',
            onChangeText: InputHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label='Date'
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'DD-MM-YYYY',
            maxLength: 10,
            onChangeText: InputHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label='Description'
        invalid={!inputs.description.isValid}
        textInputConfig={{
          placeholder: 'Description',
          multiline: true,
          // autoCorrect: true,
          // autoCapitalize: 'sentences',
          onChangeText: InputHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Please enter valid values for all fields.
        </Text>
      )}
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontSize: 16,
  },
});
