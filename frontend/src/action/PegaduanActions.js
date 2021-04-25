import axios from "axios";
import {
  PENGADUAN_CREATE_REQUEST,
  PENGADUAN_CREATE_SUCCESS,
  PENGADUAN_CREATE_FAIL,
  PENGADUAN_LIST_USER_REQUEST,
  PENGADUAN_LIST_USER_SUCCESS,
  PENGADUAN_LIST_USER_FAIL,
  PENGADUAN_DELETE_REQUEST,
  PENGADUAN_DELETE_SUCCESS,
  PENGADUAN_DELETE_FAIL,
} from "../constants/Pengaduan";

export const createPengaduan = (report) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PENGADUAN_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/pengaduan`, report, config);

    dispatch({
      type: PENGADUAN_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PENGADUAN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const listUserPengaduan = (tanggapans) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PENGADUAN_LIST_USER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/pengaduan/`, config);

    dispatch({
      type: PENGADUAN_LIST_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PENGADUAN_LIST_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const deletePengaduan = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PENGADUAN_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/pengaduan/${id}`, config);

    dispatch({
      type: PENGADUAN_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PENGADUAN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
