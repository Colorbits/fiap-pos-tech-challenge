import { MockCustomerRepository } from '../../../infrastructure/repositories/customer';
import { Customer } from '../../../shared/models';
import { CustomerService } from './customerService';

const customerDto: Customer = {
  id: 1,
  name: 'John Doe',
  document: '00000000000',
  phoneNumber: '41 999999999',
  email: 'gabriel.f.umbelino@gmail.com',
};

describe('Customer Service', () => {
  let customerService: CustomerService;
  let mockCustomerRepository: MockCustomerRepository;

  beforeEach(async () => {
    mockCustomerRepository = new MockCustomerRepository();
    customerService = new CustomerService(mockCustomerRepository);
  });

  it('should create a customer', async () => {
    const createdCustomer = await customerService.create(customerDto);

    expect(createdCustomer).toBeDefined();
    expect(createdCustomer.id).toBeDefined();
    expect(createdCustomer.name).toBe(customerDto.name);
    expect(createdCustomer.document).toBe(customerDto.document);
    expect(createdCustomer.phoneNumber).toBe(customerDto.phoneNumber);
  });

  it('should list all customers', async () => {
    await customerService.create(customerDto);
    const allCustomers = await customerService.findAll();
    expect(allCustomers.length).toBe(1);
  });

  it('get customer by Id', async () => {
    const createdCustomer = await customerService.create(customerDto);
    const allCustomers = await customerService.find({
      id: createdCustomer.id,
    });
    expect(allCustomers.length).toBe(1);
  });
});
