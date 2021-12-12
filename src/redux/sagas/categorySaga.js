import { takeLatest, call, put } from 'redux-saga/effects'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../actions'
import { fetchCategories, addCategory, editCategory, removeCategory } from '../../api'

function* getCategoriesSaga() {
  try {
    const categories = yield call(fetchCategories)
    yield put(getCategories.getCategoriesSuccess(categories.data))
  } catch (error) {
    yield put(getCategories.getCategoriesFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* createCategorySaga(action) {
  try {
    const category = yield call(addCategory, action.payload.data)
    yield put(createCategory.createCategorySuccess(category.data))
  } catch (error) {
    yield put(createCategory.createCategoryFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* updateCategorySaga(action) {
  try {
    const category = yield call(editCategory, action.payload.data)
    yield put(updateCategory.updateCategorySuccess(category.data))
  } catch (error) {
    yield put(updateCategory.updateCategoryFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* deleteCategorySaga(action) {
  console.log('🚀 ~ file: categorySaga.js ~ line 33 ~ function*deleteCategorySaga ~ action', action)
  try {
    yield call(removeCategory, action.payload.id)
    yield put(deleteCategory.deleteCategorySuccess(action.payload.id))
  } catch (error) {
    yield put(deleteCategory.deleteCategoryFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* categorySaga() {
  yield takeLatest(getCategories.getCategoriesRequest, getCategoriesSaga)
  yield takeLatest(createCategory.createCategoryRequest, createCategorySaga)
  yield takeLatest(updateCategory.updateCategoryRequest, updateCategorySaga)
  yield takeLatest(deleteCategory.deleteCategoryRequest, deleteCategorySaga)
}

export default categorySaga
