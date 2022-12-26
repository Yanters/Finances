import { useLayoutEffect } from 'react';
import { Text } from 'react-native';

const ManageExpenseScreen = ({ route, navigation }) => {
  const  expenseId  = route.params?.expenseId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  return <Text>Manage Expense</Text>;
};

export default ManageExpenseScreen;
