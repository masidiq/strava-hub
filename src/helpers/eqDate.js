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

  displayTime(d) {
    if (!d) {
      return "";
    }
    var dMoment = moment(d);
    return dMoment.format("HH:mm");
  },
  sameWithToday(d) {
    let dateNow = moment();

    if (dateNow.format("YYYY-MM-DD") == d) {
      return true;
    } else {
      return false;
    }
  },
  isMorning() {
    var currentHour = moment().format("HH");

    if (currentHour >= 6 && currentHour < 12) {
      return true;
    } else {
      return false;
    }
  },
};
