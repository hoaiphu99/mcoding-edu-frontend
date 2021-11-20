import { takeLatest, call, put } from 'redux-saga/effects'
import { getProgramLanguages } from '../actions'
import { fetchProgramingLanguages } from '../../api'

function* getProgramingLanguages() {
  try {
    const programLanguages = yield call(fetchProgramingLanguages)
    yield put(getProgramLanguages.getProgramLanguagesSuccess(programLanguages.data))
  } catch (error) {
    yield put(
      getProgramLanguages.getProgramLanguagesFailure(
        error.response && error.response.data ? error.response.data : error,
      ),
    )
  }
}

function* programingLanguagesSaga() {
  yield takeLatest(getProgramLanguages.getProgramLanguagesRequest, getProgramingLanguages)
}

export default programingLanguagesSaga
