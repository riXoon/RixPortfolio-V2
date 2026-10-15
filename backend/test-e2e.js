import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config({ path: '.env.development.local' });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

const BASE_URL = 'http://localhost:5500/api/v1';

async function runTests() {
    console.log('--- Starting Integration Tests ---');
    
    // 1. Setup Test User
    console.log('1. Setting up test user...');
    const testEmail = 'test@example.com';
    const testPassword = 'testpassword123';
    const passwordHash = await bcrypt.hash(testPassword, 10);
    
    // Delete if exists
    await supabase.from('admin_users').delete().eq('email', testEmail);
    
    const { data: user, error: userError } = await supabase
        .from('admin_users')
        .insert({ email: testEmail, password_hash: passwordHash })
        .select()
        .single();
        
    if (userError) {
        console.error('Failed to create test user:', userError);
        return;
    }
    
    let token = '';

    try {
        // 2. Test Auth
        console.log('2. Testing Authentication...');
        const authRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testEmail, password: testPassword })
        });
        
        const authData = await authRes.json();
        if (!authRes.ok || !authData.token) {
            throw new Error('Auth failed: ' + JSON.stringify(authData));
        }
        token = authData.token;
        console.log('✅ Auth successful! Token received.');

        const authHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        // Helper function for CRUD testing
        async function testCRUD(entityName, endpoint, testPayload, updatePayload) {
            console.log(`\n--- Testing ${entityName} CRUD ---`);
            
            // CREATE
            const createRes = await fetch(`${BASE_URL}/${endpoint}`, {
                method: 'POST',
                headers: authHeaders,
                body: JSON.stringify(testPayload)
            });
            const created = await createRes.json();
            if (!createRes.ok) throw new Error(`Create failed: ${JSON.stringify(created)}`);
            const id = created.id;
            console.log(`✅ Create successful. ID: ${id}`);
            
            // GET ALL
            const getAllRes = await fetch(`${BASE_URL}/${endpoint}`);
            const all = await getAllRes.json();
            if (!getAllRes.ok || !Array.isArray(all)) throw new Error('Get All failed');
            console.log(`✅ Get All successful. Count: ${all.length}`);
            
            // GET ONE
            const getOneRes = await fetch(`${BASE_URL}/${endpoint}/${id}`);
            const one = await getOneRes.json();
            if (!getOneRes.ok || one.id !== id) throw new Error('Get One failed');
            console.log(`✅ Get One successful.`);
            
            // UPDATE
            const updateRes = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
                method: 'PUT',
                headers: authHeaders,
                body: JSON.stringify(updatePayload)
            });
            const updated = await updateRes.json();
            if (!updateRes.ok) throw new Error(`Update failed: ${JSON.stringify(updated)}`);
            console.log(`✅ Update successful.`);
            
            // DELETE
            const deleteRes = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
                method: 'DELETE',
                headers: authHeaders
            });
            if (!deleteRes.ok) throw new Error('Delete failed');
            console.log(`✅ Delete successful.`);
        }

        // 3. Test Projects
        await testCRUD('Projects', 'projects', {
            title: 'Test Project',
            slug: 'test-project-123',
            description: 'Test description'
        }, {
            description: 'Updated test description'
        });

        // 4. Test Certificates
        await testCRUD('Certificates', 'certificates', {
            title: 'Test Certificate',
            issuer: 'Test Issuer'
        }, {
            issuer: 'Updated Issuer'
        });

        // 5. Test Skills
        await testCRUD('Skills', 'skills', {
            name: 'Test Skill',
            category: 'Frontend',
            proficiency: 95
        }, {
            proficiency: 99
        });

        // 6. Test Experiences
        await testCRUD('Experiences', 'experiences', {
            type: 'Work',
            company_school: 'Test Company',
            role: 'Developer'
        }, {
            role: 'Senior Developer'
        });

        // 7. Test Messages
        await testCRUD('Messages', 'messages', {
            sender_name: 'Test Sender',
            sender_email: 'sender@test.com',
            message: 'Hello World'
        }, {
            is_read: true
        });

        console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! 🎉');

    } catch (error) {
        console.error('❌ TEST FAILED:', error.message);
    } finally {
        // Cleanup test user
        console.log('\nCleaning up test user...');
        await supabase.from('admin_users').delete().eq('id', user.id);
        console.log('Cleanup complete.');
    }
}

runTests();
