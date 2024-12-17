import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api/', '');
    const method = event.httpMethod;
    const body = event.body ? JSON.parse(event.body) : {};

    // Handle authentication
    if (path === 'auth/login' && method === 'POST') {
      const { email, password } = body;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: error.message })
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
    }

    // Handle other API routes
    switch (true) {
      case path === 'bills' && method === 'GET':
        const { data: bills, error: billsError } = await supabase
          .from('bills')
          .select('*');

        if (billsError) throw billsError;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(bills)
        };

      case path === 'bills' && method === 'POST':
        const { data: newBill, error: createError } = await supabase
          .from('bills')
          .insert([body])
          .select()
          .single();

        if (createError) throw createError;

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(newBill)
        };

      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Route not found' })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal server error' 
      })
    };
  }
};