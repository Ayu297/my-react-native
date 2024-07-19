import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

  
  const initialState = {
    employees: [],
    status: null,
    error: null,
  };
  
  export const fetchEmployees = createAsyncThunk(
    "employee/fetchEmployees",
    async (_, { rejectedWithValue }) => {
      try {
        const response = await axiosInstance.get("/employee");
      
        return response.data;
      } catch (e) {
        return rejectedWithValue(error.response.data);
      }
    }
  );


  export const createEmployee = createAsyncThunk(
    "employee/createEmployee",
    async (employee, { rejectedWithValue }) => {
      try {

        const headers =  { 
          "Content-Type": "multipart/form-data", 
          Accept: "*/*", 
          "Accept-Encoding": "gzip, deflate, br", 
          Connection: "keep-alive", 
        }
        const formData = new FormData(); 
        formData.append("employee", JSON.stringify(employee)); 
        formData.append("image", null); 
        const response = await axiosInstance.post("/employee", formData, {
          headers: headers
        });
      
        return response.data;
      } catch (e) {
        return rejectedWithValue(error.response.data);
      }
    }
  );

  export const updateEmployee = createAsyncThunk(
    "employee/updateEmployee",
    async (employee, { rejectedWithValue }) => {
      try {

        const headers =  { 
          "Content-Type": "multipart/form-data", 
          Accept: "*/*", 
          "Accept-Encoding": "gzip, deflate, br", 
          Connection: "keep-alive", 
        }
        const formData = new FormData(); 
        formData.append("employee", JSON.stringify(employee)); 
        formData.append("image", null); 
        const response = await axiosInstance.put("/employee", formData, {
          headers: headers
        });
      
        return response.data;
      } catch (e) {
        return rejectedWithValue(error.response.data);
      }
    }
  );
  
  // export const updateEmployee = createAsyncThunk(
  //   "employee/updateEmployee",
  //   async (employee, { rejectedWithValue }) => {
  //     try {
  //       const response = await axiosInstance.put("/employee", employee);
  //       return response.data;
  //     } catch (e) {
  //       return rejectedWithValue(error.response.data);
  //     }
  //   }
  // );
  
  export const deleteEmployee = createAsyncThunk(
    "employee/deleteEmployee",
    async (id, { rejectedWithValue }) => {
      try {
        const response = await axiosInstance.delete(`/employee/${id}`);
        return response.data;
      } catch (e) {
        return rejectedWithValue(error.response.data);
      }
    }
  );
  
  const employeeSlice = createSlice({
    name: "employee",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchEmployees.fulfilled, (state, action) => {
          (state.status = "succeeded"), (state.employees = action.payload.data);
        })
        .addCase(createEmployee.fulfilled, (state, action) => {
          (state.status = "succeeded"), state.employees.push(action.payload);
        })
        .addCase(updateEmployee.fulfilled, (state, action) => {
          const index = state.employees.findIndex(
            (employee) => employee.id === action.payload.id
          );
          if (index !== -1) {
            state.employees[index] = action.payload;
          }
          state.status = "succeeded";
        })
        .addCase(deleteEmployee.fulfilled, (state, action) => {
          state.employees = state.employees.filter(
            (emp) => emp.id !== action.meta.arg
          );
          state.status = "succeeded";
        })
        .addMatcher(
          (action) => action.type.endsWith("/rejected"),
          (state, action) => {
            state.error = action.payload
            state.status = "failed";
          }
        );
    },
  });
  
  export default employeeSlice.reducer;
  