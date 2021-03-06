import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDER } from "../contants";
import { bake_cookie, read_cookie } from "sfcookies";
const reminder = (action) => {
  let { text, dueDate } = action;
  return {
    id: Math.random(),
    text,
    dueDate,
  };
};
const removeById = (state = [], id) => {
  const reminders = state.filter((reminder) => reminder.id !== id);
  console.log("reducer removeById", reminders);
  return reminders;
};
const reminders = (state = [], action) => {
  let reminders = null; //gia tri ban dau
  state = read_cookie("reminder");
  switch (action.type) {
    case ADD_REMINDER: {
      reminders = [...state, reminder(action)];
      bake_cookie("reminder", reminders);
      return reminders;
    }
    case DELETE_REMINDER: {
      reminders = removeById(state, action.id);
      bake_cookie("reminder", reminders);
      return reminders;
    }
    case CLEAR_REMINDER: {
      reminders = [];
      bake_cookie("reminder", reminders);
      return reminders;
    }
    default:
      return state;
  }
};

export default reminders;
