import { Customer, CustomerResponseDto } from '../../../shared/models/customer';
import { ICustomerHttpService } from './iCustomerHttpService';
import axios from 'axios';

const customerMicroserviceEndpoint = process.env.CUSTOMER_MICROSERVICE_URL;

export class CustomerHttpService implements ICustomerHttpService {
  async updateCustomer(customer: Customer) {
    try {
      const response = await axios.put<CustomerResponseDto>(
        customerMicroserviceEndpoint,
        customer,
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating customer: ${customerMicroserviceEndpoint}`,
        error.message,
      );
      throw error;
    }
  }

  async createCustomer(customer: Customer) {
    try {
      const response = await axios.post<CustomerResponseDto>(
        customerMicroserviceEndpoint,
        customer,
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error creating customer: ${customerMicroserviceEndpoint}`,
        error.message,
      );
      throw error;
    }
  }

  async getCustomer(id: Customer['id']) {
    try {
      const response = await axios.get<CustomerResponseDto>(
        `${customerMicroserviceEndpoint}/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  }
}
