import _, { isEqual } from "lodash";
import * as moment from "moment";
import * as firebase from "src/firebase";
import {
  CATEGORY,
  COLLECTION,
  TYPE,
  GROUP,
  Service_Provider,
} from "src/utils/_constants";

class PaymentService {
  // Get payments:
  // Get All: Group = ''.
  // Get pay to customer: group = customer
  // Get by family: group id
  getPayments = async (eventId, group, evtGroups) => {
    const pmCollection = _.toLower(eventId) + COLLECTION.PAYMENT;
    let paymentRefs = null;

    if (group === GROUP.ALL) {
      paymentRefs = firebase.db.collection(pmCollection);
    } else if (group == GROUP.CUSTOMER) {
      paymentRefs = firebase.db
        .collection(pmCollection)
        .where("payTo", "==", group);
    } else {
      var paidList = this.getPaidList(eventId, group, evtGroups);
      var recievedList = this.getRecievedList(eventId, group, evtGroups);
      return _.union(paidList, recievedList);
    }

    let payments = await paymentRefs.get();
    return this.setPaymentResponse(payments.docs, evtGroups);
  };

  getPaidList = async (eventId, group, evtGroups) => {
    const pmCollection = _.toLower(eventId) + COLLECTION.PAYMENT;
    let paymentRefs = await firebase.db
      .collection(pmCollection)
      .where("payBy", "==", group)
      .get();

    return this.setPaymentResponse(paymentRefs.docs, evtGroups);
  };

  getRecievedList = async (eventId, group, evtGroups) => {
    const pmCollection = _.toLower(eventId) + COLLECTION.PAYMENT;
    let paymentRefs = await firebase.db
      .collection(pmCollection)
      .where("payTo", "==", group)
      .get();

    return this.setPaymentResponse(paymentRefs.docs, evtGroups);
  };

  setPaymentResponse = (docs, evtGroups) => {
    return docs.map((doc) => {
      const grp1 = _.find(evtGroups, ["id", doc.data().payBy]);
      const grp2 = _.find(evtGroups, ["id", doc.data().payTo]);

      return {
        id: doc.id,
        name: doc.data().name,
        date: doc.data().date,
        payBy: doc.data().payBy,
        payTo: doc.data().payTo,
        payByName: grp1.name,
        payToName: _.isEmpty(grp2) ? Service_Provider : grp2.name,
        payFor: doc.data().payFor,
      };
    });
  };
}

export default new PaymentService();
