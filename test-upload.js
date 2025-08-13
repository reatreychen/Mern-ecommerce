const axios = require('axios');

// Deployed server URL
const BASE_URL = 'https://mern-ecommerce-server-coral.vercel.app';

// Test server health with more detailed logging
async function testServerHealth() {
    try {
        console.log('🔍 Testing server health...');
        console.log('URL:', `${BASE_URL}/`);
        
        const response = await axios.get(`${BASE_URL}/`);
        
        console.log('Status:', response.status);
        console.log('Headers:', response.headers);
        console.log('Response type:', typeof response.data);
        console.log('Response length:', response.data?.length || 'N/A');
        
        if (typeof response.data === 'string' && response.data.includes('const express')) {
            console.log('❌ ISSUE: Server is returning source code instead of JSON response');
            console.log('This suggests a Vercel configuration problem');
        } else {
            console.log('✅ Server health check:', response.data);
        }
    } catch (error) {
        console.error('❌ Server health check failed:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
        }
    }
}

// Test API endpoints with different approaches
async function testApiEndpoints() {
    const endpoints = [
        '/api/user/register',
        '/api/category/get-category',
        '/api/product/get-product'
    ];
    
    for (const endpoint of endpoints) {
        try {
            console.log(`\n🔍 Testing endpoint: ${endpoint}`);
            const response = await axios.get(`${BASE_URL}${endpoint}`);
            console.log(`✅ ${endpoint}:`, response.status, response.data);
        } catch (error) {
            console.log(`❌ ${endpoint}:`, error.response?.status || 'No response');
            if (error.response?.data) {
                console.log('Error details:', error.response.data);
            }
        }
    }
}

// Test with POST request
async function testPostEndpoint() {
    try {
        console.log('\n🔍 Testing POST endpoint...');
        const response = await axios.post(`${BASE_URL}/api/product/get-product`, {
            page: 1,
            limit: 10
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('✅ POST test:', response.status, response.data);
    } catch (error) {
        console.log('❌ POST test failed:', error.response?.status || 'No response');
        if (error.response?.data) {
            console.log('Error details:', error.response.data);
        }
    }
}

// Check if it's a Vercel serverless function issue
async function testVercelSpecific() {
    try {
        console.log('\n🔍 Testing Vercel-specific endpoints...');
        
        // Test if the API routes are working
        const response = await axios.get(`${BASE_URL}/api/user`);
        console.log('✅ /api/user endpoint:', response.status);
    } catch (error) {
        console.log('❌ /api/user endpoint:', error.response?.status || 'No response');
    }
}

// Run all tests
async function runTests() {
    console.log('🚀 Starting detailed API tests for deployed server...\n');
    
    await testServerHealth();
    await testApiEndpoints();
    await testPostEndpoint();
    await testVercelSpecific();
    
    console.log('\n📋 Summary:');
    console.log('If you see source code instead of JSON responses, this indicates:');
    console.log('1. Vercel is not properly executing your Node.js code');
    console.log('2. Missing vercel.json configuration');
    console.log('3. Environment variables not set');
    console.log('4. Build configuration issues');
}

// Run tests
runTests().catch(console.error);
