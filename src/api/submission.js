import axios, { endpoints } from 'src/utils/axios';

export const CreateRevenueExpenseApi = async (data) => {
  try {
    const response = await axios.post(endpoints.auth.create, data);
    console.log('Response:', response);
    return response.data.data;
  } catch (error) {
    console.error('Error creating submission:', error);
    throw error;
  }
};
