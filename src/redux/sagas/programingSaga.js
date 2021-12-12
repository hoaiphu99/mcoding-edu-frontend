import { takeLatest, call, put } from 'redux-saga/effects'
import { getPrograming } from '../actions'
import { fetchPrograming } from '../../api'

function* getProgramingSaga() {
  try {
    const programLanguages = yield call(fetchPrograming)
    yield put(getPrograming.getProgramingSuccess(programLanguages.data))
  } catch (error) {
    yield put(getPrograming.getProgramingFailure(error.response && error.response.data ? error.response.data : error))
  }
}

function* programingSaga() {
  yield takeLatest(getPrograming.getProgramingRequest, getProgramingSaga)
}

export default programingSaga
