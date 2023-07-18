import moment from "moment";
import eqDate from "../helpers/eqDate";
import eqHttp from "./eqHttp";
import staticData from "@/helpers/eqStaticData";
const storageHost = import.meta.env.VITE_HOST_STORAGE;
const backEndHost = import.meta.env.VITE_HOST_API;

const endpoint = {
  getFeeds: storageHost + "/feeds-bymonth.json",
  getListDate: storageHost + "/date-list/{segmentId}.json",
  getLeaderboard: storageHost + "/leaderboard/{segmentId}/{date}.json",
  get: storageHost + "/segments/{segmentId}.json",
  getList: storageHost + "/segment-list.json",
  crudSegment: backEndHost + "/segment",
  getHistory: storageHost + "/history/{segmentId}/{athleteId}.json",
};

export default {
  async getFeeds() {
    let notUseCache = true;

    if (eqDate.isMorning()) {
      notUseCache = true;
    }

    return await eqHttp.get(endpoint.getFeeds, null, notUseCache).then((feeds) => {
      feeds.forEach((feed) => {
        let dayOfWeek = moment(feed.DateId).day();
        let segmentFounds = staticData.segmentRaceList.filter((o) => o.day == dayOfWeek);

        if (segmentFounds) {
          segmentFounds.forEach((segmentFound) => {
            feed.Segments.forEach((segment) => {
              if (segment.SegmentId == segmentFound.segmentId) {
                segment.IsRace = true;
              }
            });
          });
        }
      });

      return feeds;
    });
  },
  async getListDate(id, notUseCache) {
    let param = {
      segmentId: id,
    };
    notUseCache = true;

    return await eqHttp.getJson(endpoint.getListDate, param, notUseCache).catch((error) => {
      if (error.response.status == 403) {
        return [];
      } else {
        return eqHttp.showError(error);
      }
    });
  },
  async getLeaderboard(id, date) {
    let notUseCache = false;

    if (eqDate.sameWithToday(date)) {
      notUseCache = true;
    }

    let param = {
      segmentId: id,
      date: date,
    };
    return await eqHttp.getJson(endpoint.getLeaderboard, param, notUseCache);
  },

  async getHistory(segmentId, athleteId) {
    let notUseCache = false;
    let param = {
      segmentId: segmentId,
      athleteId: athleteId,
    };

    let result = await eqHttp.getJson(endpoint.getHistory, param, notUseCache);

    if (!!result == false) {
      result = {
        Items: [],
      };
    }
    let today = new Date();

    // if today is salasa
    if (today.getDay() != 2) {
      return result;
    }

    // minggu lalu
    today.setDate(today.getDate() - 7);

    // ada gak di history ?
    var prevSalasaDateId = moment(today).format("YYYY-MM-DD");
    var mustFillDate = !result.Items.some((o) => o.ActivityDate == prevSalasaDateId);

    // kudu di isi kekosongan
    if (mustFillDate) {
      var currentDate = new Date();
      var minDate = new Date("2023-06-06");
      while (currentDate > minDate) {
        currentDate.setDate(currentDate.getDate() - 7);

        var currentDateId = moment(currentDate).format("YYYY-MM-DD");
        var anyPrevSalasa = result.Items.some((o) => o.ActivityDate == currentDateId);

        if (anyPrevSalasa) {
          break;
        } else {
          result.Items.push({
            ActivityDate: currentDateId,
          });
        }
      }
    }

    // sort desc
    result.Items.sort((a, b) => b.ActivityDate.localeCompare(a.ActivityDate));

    return result;
  },

  async get(id) {
    var url = endpoint.get;

    let param = {
      segmentId: id,
    };
    var result = await eqHttp.getJson(url, param);

    result.Name = result.Name.replace("Comme//Studios™ Speed Demon Series // ", "");
    return result;
  },

  async getList(isRealtime) {
    var url = endpoint.getList;
    let notUseCache = false;
    if (eqDate.isMorning()) {
      notUseCache = true;
    }
    if (isRealtime) {
      notUseCache = true;
    }
    let results = await eqHttp.get(url, null, notUseCache);

    results.forEach((item) => {
      item.Name = item.Name.replace("Comme//Studios™ Speed Demon Series // ", "");
    });

    return results;
  },

  async add(segmentId) {
    return await eqHttp.post(endpoint.crudSegment, {
      id: segmentId,
    });
  },

  async edit(param) {
    return await eqHttp.put(endpoint.crudSegment, param);
  },

  async delete(segmentId) {
    return await eqHttp.delete(endpoint.crudSegment, {
      segmentId: segmentId,
    });
  },
};
