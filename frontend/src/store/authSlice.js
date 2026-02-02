import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../services/authApi';


export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.login({ email, password });

      const { token, user } = response.data.data;
      
      localStorage.setItem('token', token);
      
      return { token, user };
    } catch (error) {
       if (error.response && error.response.data) {
           return rejectWithValue(error.response.data);
       }
      return rejectWithValue({ message: 'Login failed' });
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);

      if (response.data.data) {

        return response.data;
      }
      return response.data; 
    } catch (error) {
       if (error.response && error.response.data) {
           return rejectWithValue(error.response.data);
       }
      return rejectWithValue({ message: 'Registration failed' });
    }
  }
);

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authApi.me();
            return response.data.data;
        } catch (error) {
            localStorage.removeItem('token');
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async () => {
        localStorage.removeItem('token');
        return;
    }
);

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
          state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
          state.user = null;
          state.token = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
          state.token = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
