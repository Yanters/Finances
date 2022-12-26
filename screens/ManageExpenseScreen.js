import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';

const ManageExpenseScreen = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const expensesCtx = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    expensesCtx.removeExpense(expenseId);
    navigation.goBack();
  };

  const cancelExpenseHandler = () => {
    navigation.goBack();
  };

  const saveExpenseHandler = () => {
    if (isEditing) {
      expensesCtx.updateExpense(expenseId, {
        description: 'Updated Expense',
        amount: 22.22,
        date: new Date(),
      });
    } else {
      expensesCtx.addExpense({
        description: 'New Expense',
        amount: 22.22,
        date: new Date(),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button
          mode='flat'
          onPress={cancelExpenseHandler}
          style={styles.button}
        >
          Cancel
        </Button>
        <Button onPress={saveExpenseHandler} style={styles.button}>
          {isEditing ? 'Save' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
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
