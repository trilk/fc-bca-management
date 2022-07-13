import _, { isEqual } from "lodash";
import moment from "moment";
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
  getExpenses = async (eventId, group, evtGroups, category = "", type = '') => {
    const result = {
      totalFee: 0,
      data: [],
    };
    const exCollection = _.toLower(eventId) + COLLECTION.EXPENSE;
    let expenseRefs = firebase.db.collection(exCollection);

    if (category !== "") {
      expenseRefs = expenseRefs.where("category", "==", category);
    }

    if (type !== '') {
      expenseRefs = expenseRefs.where("type", "==", type);
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
          id: doc.id,
          date: data.date,
          name: data.name,
          totalFee: fee,
          type: data.type,
          category: cat,
          payBy: grp,
          note: data.note,
        });
      }
    });

    return result;
  };

  addExpense = async (eventId, expenseObj) => {
    const exCollection = _.toLower(eventId) + COLLECTION.EXPENSE;

    try {

      return true;
    } catch (error) {
      console.error("Error adding document: ", error);
      return false;
    }    
  }

  updateExpense = async (eventId, expenseObj) => {
    const exCollection = _.toLower(eventId) + COLLECTION.EXPENSE;
    let result = null;
    const expenseDoc = this.calculateFee(expenseObj)

    try {
      if(expenseObj.id === '') {
        result = await firebase.db.collection(exCollection).add(expenseDoc)
      } else {
        result = await firebase.db.collection(exCollection).doc(expenseDoc.id).set(expenseDoc)
      }

    } catch (error) {
      console.error("Error adding document: ", error);
    }

    return result;
  }

  calculateFee = (expenseObj) => {
    let totalFee = 0; 
    let personFee = 0

    if(expenseObj.type === TYPE.GROUP_SHARE) {
      personFee = totalFee / expenseObj.groups.length
    } else if (expenseObj.type === TYPE.PERSON_SHARE) {
      const personCount = _.sumBy(expenseObj.groups, 'count')

      personFee = personCount > 0 ? totalFee / personCount : 0
    }

    let expenseDoc = {
      id: expenseObj.id,
      name: expenseObj.name,
      date: moment(expenseObj.date).format('DD/MM/YYYY'),
      category: expenseObj.category,
      note: expenseObj.note,
      payBy: expenseObj.payBy,
      type: expenseObj.type, 
      totalFee: 0
    }

    expenseObj.groups.forEach(grp => {
      if(expenseObj.type === TYPE.PRIVATE) {
        totalFee += grp.fee
      }
      expenseDoc[grp.id] = {
        count: grp.count,
        fee: expenseObj.type === TYPE.PRIVATE ? grp.fee : Math.round(personFee * grp.count)
      }
    });

    expenseDoc.totalFee = expenseObj.type === TYPE.PRIVATE ? totalFee : expenseObj.totalFee
    return expenseDoc
  }
}

export default new ExpenseService();
