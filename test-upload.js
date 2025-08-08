const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Test the upload endpoint
async function testUpload() {
    try {
        // Create a simple test image buffer
        const testImageBuffer = Buffer.from('fake-image-data');
        
        const formData = new FormData();
        formData.append('image', testImageBuffer, {
            filename: 'test.jpg',
            contentType: 'image/jpeg'
        });

        const response = await axios.post('http://localhost:8080/api/upload', formData, {
            headers: {
                ...formData.getHeaders(),
                'Authorization': 'Bearer test-token' // You'll need a real token
            }
        });

        console.log('Upload test response:', response.data);
    } catch (error) {
        console.error('Upload test failed:', error.response?.data || error.message);
    }
}

// Test server health
async function testServerHealth() {
    try {
        const response = await axios.get('http://localhost:8080/');
        console.log('Server health check:', response.data);
    } catch (error) {
        console.error('Server health check failed:', error.message);
    }
}

// Run tests
async function runTests() {
    console.log('Testing server health...');
    await testServerHealth();
    
    console.log('\nTesting upload endpoint...');
    await testUpload();
}

runTests();
