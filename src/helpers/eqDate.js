import moment from "moment";

export default {
  displayDate(d) {
    let dateNow = moment();
    var dMoment = moment(d);
    if (dMoment.year() != dateNow.year()) {
      return dMoment.format("dddd, D MMM YYYY");
    }
    return dMoment.format("dddd, D MMM ");
  },
  sameWithToday(d) {
    let dateNow = moment();

    if (dateNow.format("YYYY-MM-DD") == d) {
      return true;
    } else {
      return false;
    }
  },
};
