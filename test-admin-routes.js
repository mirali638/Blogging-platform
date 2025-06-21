// Test script for admin routes
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api/userdashboard/users';

// Test data
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123'
};

let adminToken = '';
let testUserId = '';

async function testAdminRoutes() {
  try {
    console.log('🧪 Testing Admin Routes...\n');

    // 1. Create a test user
    console.log('1. Creating test user...');
    const signupResponse = await axios.post(`${API_BASE}/signup`, testUser);
    console.log('✅ User created successfully\n');

    // 2. Login as admin (you'll need to use an existing admin account)
    console.log('2. Logging in as admin...');
    const loginResponse = await axios.post(`${API_BASE}/login`, {
      email: 'admin@blogplatform.com', // Replace with your admin email
      password: 'adminpassword' // Replace with your admin password
    });
    adminToken = loginResponse.data.token;
    console.log('✅ Admin login successful\n');

    // 3. Get all users
    console.log('3. Getting all users...');
    const usersResponse = await axios.get(`${API_BASE}/all`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log(`✅ Found ${usersResponse.data.length} users`);
    testUserId = usersResponse.data.find(u => u.email === testUser.email)?._id;
    console.log(`Test user ID: ${testUserId}\n`);

    if (testUserId) {
      // 4. Update user role
      console.log('4. Testing role update...');
      const roleResponse = await axios.put(`${API_BASE}/${testUserId}/role`, 
        { role: 'admin' },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      console.log('✅ Role updated successfully:', roleResponse.data.role);

      // 5. Update user status
      console.log('\n5. Testing status update...');
      const statusResponse = await axios.put(`${API_BASE}/${testUserId}/status`,
        { status: 'banned' },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      console.log('✅ Status updated successfully:', statusResponse.data.status);

      // 6. Delete user
      console.log('\n6. Testing user deletion...');
      const deleteResponse = await axios.delete(`${API_BASE}/${testUserId}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      console.log('✅ User deleted successfully');

    } else {
      console.log('❌ Test user not found');
    }

    console.log('\n🎉 All admin route tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
    console.error('Headers:', error.response?.headers);
  }
}

// Run the test
testAdminRoutes(); 