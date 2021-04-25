import axios from "axios";

import {
  TANGGAPAN_LIST_REQUEST,
  TANGGAPAN_LIST_SUCCESS,
  TANGGAPAN_LIST_FAIL,
  TANGGAPAN_LIST_USER_REQUEST,
  TANGGAPAN_LIST_USER_SUCCESS,
  TANGGAPAN_LIST_USER_FAIL,
  TANGGAPAN_DELETE_REQUEST,
  TANGGAPAN_DELETE_SUCCESS,
  TANGGAPAN_DELETE_FAIL,
  TANGGAPAN_DETAILS_REQUEST,
  TANGGAPAN_DETAILS_SUCCESS,
  TANGGAPAN_DETAILS_FAIL,
  TANGGAPAN_STATUS_REQUEST,
  TANGGAPAN_STATUS_SUCCESS,
  TANGGAPAN_STATUS_FAIL,
  TANGGAPAN_ADD_REQUEST,
  TANGGAPAN_ADD_SUCCESS,
  TANGGAPAN_ADD_FAIL,
} from "../constants/Tanggapan";

export const listPengaduan = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TANGGAPAN_LIST_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/pengaduan/all`, config);

    dispatch({
      type: TANGGAPAN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TANGGAPAN_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const listTanggapan = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TANGGAPAN_LIST_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tanggapan/`, config);

    dispatch({
      type: TANGGAPAN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TANGGAPAN_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const listTanggapanPetugas = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TANGGAPAN_LIST_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tanggapan/byPetugas`, config);

    dispatch({
      type: TANGGAPAN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TANGGAPAN_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const deletePengaduanAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TANGGAPAN_DELETE_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    await axios.delete(`/api/tanggapan/${id}/pengaduan`, config);

    dispatch({
      type: TANGGAPAN_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TANGGAPAN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const deleteTanggapan = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TANGGAPAN_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/tanggapan/${id}/hasil`, config);

    dispatch({
      type: TANGGAPAN_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TANGGAPAN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const deleteTanggapanAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TANGGAPAN_DELETE_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    await axios.delete(`/api/tanggapan/${id}/hasil`, config);

    dispatch({
      type: TANGGAPAN_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TANGGAPAN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getPengaduanDetailsAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TANGGAPAN_DETAILS_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tanggapan/${id}/pengaduan`, config);

    dispatch({
      type: TANGGAPAN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TANGGAPAN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const statusTanggapan = (tanggapans) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TANGGAPAN_STATUS_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/pengaduan/${tanggapans._id}/validasi`,
      tanggapans,
      config
    );

    dispatch({
      type: TANGGAPAN_STATUS_SUCCESS,
    });
    dispatch({
      type: TANGGAPAN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TANGGAPAN_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const addTanggapan = (report) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TANGGAPAN_ADD_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/tanggapan/${report._id}/tanggapi`,
      report,
      config
    );

    dispatch({
      type: TANGGAPAN_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TANGGAPAN_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const listUserTanggapan = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TANGGAPAN_LIST_USER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tanggapan/${id}/hasil`, config);

    dispatch({
      type: TANGGAPAN_LIST_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TANGGAPAN_LIST_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
