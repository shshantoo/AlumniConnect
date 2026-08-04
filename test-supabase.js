import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zhikurpgjuqsdalmdcjr.supabase.co';
const supabaseKey = 'sb_publishable_OsNMkEz3H6GwOtoJmozgmg_zbQYQMgw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('--------------------------------------------------');
  console.log('🔍 Testing Connection to Supabase Project');
  console.log('Target URL:', supabaseUrl);
  console.log('--------------------------------------------------');

  // Test 1: Query departments table
  console.log('\n[Test 1] Querying "departments" table...');
  const { data: deptData, error: deptErr, status: deptStatus } = await supabase.from('departments').select('*');
  console.log(`HTTP Status: ${deptStatus}`);
  if (deptErr) {
    console.log('Result:', deptErr.message);
  } else {
    console.log('✅ SUCCESS! Departments table data:', deptData);
  }

  // Test 2: Query countries table
  console.log('\n[Test 2] Querying "countries" table...');
  const { data: cntData, error: cntErr, status: cntStatus } = await supabase.from('countries').select('*');
  console.log(`HTTP Status: ${cntStatus}`);
  if (cntErr) {
    console.log('Result:', cntErr.message);
  } else {
    console.log('✅ SUCCESS! Countries count:', cntData?.length || 0, cntData);
  }

  // Test 3: Query users table
  console.log('\n[Test 3] Querying "users" table...');
  const { data: usrData, error: usrErr, status: usrStatus } = await supabase.from('users').select('*');
  console.log(`HTTP Status: ${usrStatus}`);
  if (usrErr) {
    console.log('Result:', usrErr.message);
  } else {
    console.log('✅ SUCCESS! Users records:', usrData);
  }
  
  console.log('--------------------------------------------------');
}

testConnection();
