// store/search/searchSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SearchState {
	search: string;
}

const initialState: SearchState = {
	search: "",
};

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload;
		},
	},
});

// Exporta la acción y el reducer
export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
