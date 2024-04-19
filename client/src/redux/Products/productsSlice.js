import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    isAdding: false,
    error: null,
    isAdded: false,
    isFetching: false,
    fetchError: null,
    isEditing: false,
    editError: null,
    isEdited: false,
    isDeleting: false,
    deleteError: null,
    isDeleted: false
};

const categoriesSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProductStart(state) {
            state.isAdding = true;
            state.error = null;
        },
        addProductSuccess(state) {
            state.isAdding = false;
            state.isAdded = true;
        },
        addProductFailure(state, action) {
            state.isAdding = false;
            state.error = action.payload;
        },
        fetchProductsStart(state) {
            state.isFetching = true;
            state.fetchError = null;
        },
        fetchProductsSuccess(state, action) {
            state.isFetching = false;
            state.products = action.payload;
        },
        fetchProductsFailure(state, action) {
            state.isFetching = false;
            state.fetchError = action.payload;
        },
        editProductStart(state) {
            state.isEditing = true;
            state.editError = null;
        },
        editProductSuccess(state) {
            state.isEditing = false;
            state.isEdited = true;
        },
        editProductFailure(state, action) {
            state.isEditing = false;
            state.editError = action.payload;
        },
        deleteProductStart(state) {
            state.isDeleting = true;
            state.deleteError = null;
        },
        deleteProductSuccess(state) {
            state.isDeleting = false;
            state.isDeleted = true;
        },
        deleteProductFailure(state, action) {
            state.isDeleting = false;
            state.deleteError = action.payload;
        },
    },
});

export const {
    addProductStart,
    addProductSuccess,
    addProductFailure,
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    editProductStart,
    editProductSuccess,
    editProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
