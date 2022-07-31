import { createSlice, current, original } from "@reduxjs/toolkit";
export const athleteSlice = createSlice({
  name: "listAthlete",
  initialState: {
    list: [],
    availableFilters: [],
    filteredList: [],
    asem: 5,
  },
  reducers: {
    set: (state, action) => {
      state.list = action.payload;

      state.filteredList = state.list;
      let newFilters = [];
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
            case "65_70":
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
    },

    doFilter: (state, action) => {
      const oneFilter = state.availableFilters.find(
        (o) => o.code == action.payload
      );
      if (oneFilter) {
        oneFilter.isActive = !oneFilter.isActive;
      }

      const filterActives = state.availableFilters.filter((o) => o.isActive);

      if (filterActives.length > 0) {
        let filterCodes = filterActives.map((item) => item.code);

        state.filteredList = state.list.filter((o) =>
          filterCodes.includes(o.Class)
        );
      } else {
        state.filteredList = state.list;
      }
    },
  },
});
export const { set, doFilter, fixedTodoToggled } = athleteSlice.actions;
export default athleteSlice.reducer;
