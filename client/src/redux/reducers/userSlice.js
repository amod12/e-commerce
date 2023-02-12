import {
  ADD_USER_DETAILS,
  REMOVE_USER_DETAILS_LOGOUT,
} from "../actionTypes/actionTypes";

const initialState = {
  role: "",
  email: "",
  address: "",
  number: "",
  name: "",
  token: "",
  _id: ""
};

const userSlice = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_DETAILS:
      const { name, role, email, _id , token, address, phone } = action.payload;
      return {
        ...state,
        name,
        role,
        token,
        email,
        phone,
        address,
        _id
      };
    case REMOVE_USER_DETAILS_LOGOUT:
      return {
        ...state,
        name: "",
        role: "",
        email: "",
        email: "",
        phone: "",
        token:"",
        _id: ""
      };
    default:
      return state;
  }
};

export default userSlice;
