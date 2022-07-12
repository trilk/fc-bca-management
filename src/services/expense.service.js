import _, { isEqual } from "lodash";
import * as firebase from "src/firebase";
import {
  CATEGORIES,
  COLLECTION,
  TYPE,
  GROUP,
  Service_Provider,
} from "src/utils/_constants";

class ExpenseService {
  //Get expenses by event, group family, category and type
  getExpenses = async (eventId, group, evtGroups, category = "", isPrivate) => {
    const result = {
      totalFee: 0,
      data: [],
    };
    const exCollection = _.toLower(eventId) + COLLECTION.EXPENSE;
    let expenseRefs = firebase.db.collection(exCollection);

    if (category !== "") {
      expenseRefs = expenseRefs.where("category", "==", category);
    }

    if (isPrivate !== undefined) {
      expenseRefs = expenseRefs.where("isPrivate", "==", isPrivate);
    }

    const expenseList = await expenseRefs.get();

    expenseList.docs.forEach((doc) => {
      const data = doc.data();
      let fee = -1;

      if (group !== GROUP.ALL && !_.isEmpty(data[group])) {
        fee = data[group].fee;
      }

      if (group === GROUP.ALL) {
        fee = data.totalFee;
      }

      if (fee >= 0) {
        const grp = _.find(evtGroups, ["id", data.payBy]);
        const cat = _.find(CATEGORIES, ["id", data.category]);
        result.totalFee += fee;

        result.data.push({
          date: data.date.toDate(),
          name: data.name,
          totalFee: fee,
          isPrivate: data.isPrivate,
          category: cat,
          payBy: grp,
          note: data.note,
        });
      }
    });

    return result;
  };
}

export default new ExpenseService();
