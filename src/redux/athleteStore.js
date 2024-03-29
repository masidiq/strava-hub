import { createSlice, current, original } from "@reduxjs/toolkit";
export const athleteSlice = createSlice({
  name: "listAthlete",
  initialState: {
    list: [],
    availableFilters: [],
    filteredList: [],
    filter: {
      isWomen: {
        isActive: false,
        total: 0,
      },
      isMan: {
        isActive: false,
        total: 0,
      },
    },
    asem: 5,
  },
  reducers: {
    set: (state, action) => {
      state.list = action.payload;
      state.filteredList = state.list;

      populateAgeFilters(state);
    },

    doFilter: (state, action) => {
      let filteredList = state.list;
      // FILTER BY GENDER
      if (action.payload == "women") {
        state.filter.isWomen.isActive = !state.filter.isWomen.isActive;
      }

      if (action.payload == "man") {
        state.filter.isMan.isActive = !state.filter.isMan.isActive;
      }

      if (state.filter.isWomen.isActive != state.filter.isMan.isActive) {
        filteredList = state.list.filter(
          (o) => o.IsWomen == state.filter.isWomen.isActive
        );
      }

      // FILTER BY AGE
      const oneFilter = state.availableFilters.find(
        (o) => o.code == action.payload
      );
      if (oneFilter) {
        oneFilter.isActive = !oneFilter.isActive;
      }

      const filterActives = state.availableFilters.filter((o) => o.isActive);

      if (filterActives.length > 0) {
        let filterCodes = filterActives.map((item) => item.code);

        state.filteredList = filteredList.filter((o) =>
          filterCodes.includes(o.Class)
        );
      } else {
        state.filteredList = filteredList;
      }
    },
  },
});

function populateAgeFilters(state) {
  let newFilters = [];

  //1. Reset
  state.filter.isMan.isActive = false;
  state.filter.isMan.total = 0;

  state.filter.isWomen.isActive = false;
  state.filter.isWomen.total = 0;

  state.list.forEach((athlete) => {
    let oneFilter = newFilters.find((o) => o.code == athlete.Class);

    if (oneFilter == null) {
      let filterName = athlete.Class;
      let filterShortName = athlete.Class;
      switch (athlete.Class) {
        case "0_19":
          filterName = "U19 tahun";
          filterShortName = "U19";
          break;
        case "0_24":
          filterName = "U24 tahun";
          filterShortName = "U24";
          break;
        case "20_24":
          filterName = "20-24 tahun";
          break;
        case "25_34":
          filterName = "25-34 tahun";
          break;
        case "35_44":
          filterName = "35-44 tahun";
          break;
        case "45_54":
          filterName = "45-54 tahun";
          break;
        case "55_64":
          filterName = "55-64 tahun";
          break;
        case "55+":
          filterName = "55 tahun ++";
          break;
        case "65_69":
          filterName = "65-70 tahun";
          break;
        case "70_74":
          filterName = "70-74 tahun";
          break;
        case "75_plus":
          filterName = "75 tahun ++";
          filterShortName = "75++";
          break;
      }

      if (filterName == null) {
        filterName = "Tidak diketahui";
      }

      if (filterShortName != null) {
        filterShortName = filterShortName.replace("_", "-");
      } else {
        filterShortName = "?";
      }

      oneFilter = {
        code: athlete.Class,
        name: filterName,
        shortName: filterShortName,
        total: 1,
        isActive: false,
      };
      newFilters.push(oneFilter);
    } else {
      oneFilter.total++;
    }

    if (athlete.IsWomen) {
      state.filter.isWomen.total++;
    } else {
      state.filter.isMan.total++;
    }
  });
  newFilters = newFilters.sort((a, b) => {
    // nilai null paling terakhir
    if (a.code == null) {
      return 1;
    }
    if (b.code == null) {
      return -1;
    }

    if (a.code < b.code) {
      return -1;
    }
    if (a.code > b.code) {
      return 1;
    }
    return 0;
  });
  state.availableFilters = newFilters;
}
export const { set, doFilter, fixedTodoToggled } = athleteSlice.actions;
export default athleteSlice.reducer;
