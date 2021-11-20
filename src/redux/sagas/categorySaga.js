import { takeLatest, call, put } from 'redux-saga/effects'
import { getCategories } from '../actions'
import { fetchCategories } from '../../api'

function* getCategoriesSaga() {
  try {
    const categories = yield call(fetchCategories)
    yield put(getCategories.getCategoriesSuccess(categories.data))
  } catch (error) {
    yield put(getCategories.getCategoriesFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* categorySaga() {
  yield takeLatest(getCategories.getCategoriesRequest, getCategoriesSaga)
}

export default categorySaga
