// Cloudflare Worker - Admin API
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // CORS headers - restricted to GitHub Pages origin for security
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://manelcamarg.github.io',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Vary': 'Origin'
    };
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // API routes
    if (path.startsWith('/api/')) {
      return handleApi(request, env, path, corsHeaders);
    }
    
    // Serve static files for admin page
    if (path === '/admin' || path.startsWith('/admin/')) {
      return handleAdmin(request, env);
    }
    
    return new Response('Not Found', { status: 404 });
  }
};

async function handleApi(request, env, path, corsHeaders) {
  const method = request.method;
  const segments = path.split('/').filter(s => s);
  
  // Remove 'api' from segments
  segments.shift();
  
  const resource = segments[0];
  const id = segments[1];
  
  // Verify session for all protected routes except login
  if (resource !== 'login' && resource !== 'register') {
    const session = await verifySession(request, env);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
  
  // Route handlers
  switch (resource) {
    case 'login':
      return handleLogin(request, env, corsHeaders);
    case 'logout':
      return handleLogout(request, env, corsHeaders);
    case 'tasks':
      return handleTasks(request, env, id, method, corsHeaders);
    case 'schedule':
      return handleSchedule(request, env, id, method, corsHeaders);
    case 'team':
      return handleTeam(request, env, id, method, corsHeaders);
    case 'lore':
      return handleLore(request, env, id, method, corsHeaders);
    case 'announcements':
      return handleAnnouncements(request, env, id, method, corsHeaders);
    default:
      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
  }
}

async function verifySession(request, env) {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const sessionCookie = cookies.find(c => c.startsWith('session='));
  
  if (!sessionCookie) return null;
  
  const sessionId = sessionCookie.split('=')[1];
  
  const result = await env.DB.prepare(
    'SELECT user_id, email FROM sessions WHERE session_id = ? AND expires_at > datetime("now")'
  ).bind(sessionId).first();
  
  return result;
}

async function handleLogin(request, env, corsHeaders) {
  const { email, password } = await request.json();
  
  // Get user from database
  const user = await env.DB.prepare(
    'SELECT id, email, password_hash, salt FROM users WHERE email = ?'
  ).bind(email).first();
  
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  // Verify password using PBKDF2 with stored salt
  const isValid = await verifyPassword(password, user.password_hash, user.salt);
  
  if (!isValid) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  // Create session
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
  await env.DB.prepare(
    'INSERT INTO sessions (session_id, user_id, expires_at) VALUES (?, ?, ?)'
  ).bind(sessionId, user.id, expiresAt.toISOString()).run();
  
  // Set HTTP-only cookie
  // SameSite=None required for cross-origin authentication (GitHub Pages → Cloudflare Worker)
  const response = new Response(JSON.stringify({ 
    user: { id: user.id, email: user.email }
  }), {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'Set-Cookie': `session=${sessionId}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=86400`
    }
  });
  
  return response;
}

async function handleLogout(request, env, corsHeaders) {
  const cookieHeader = request.headers.get('Cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const sessionCookie = cookies.find(c => c.startsWith('session='));
    
    if (sessionCookie) {
      const sessionId = sessionCookie.split('=')[1];
      await env.DB.prepare('DELETE FROM sessions WHERE session_id = ?').bind(sessionId).run();
    }
  }
  
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'Set-Cookie': 'session=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0'
    }
  });
}

async function handleTasks(request, env, id, method, corsHeaders) {
  return handleResource(request, env, id, method, corsHeaders, 'tasks');
}

async function handleSchedule(request, env, id, method, corsHeaders) {
  return handleResource(request, env, id, method, corsHeaders, 'schedule');
}

async function handleTeam(request, env, id, method, corsHeaders) {
  return handleResource(request, env, id, method, corsHeaders, 'team_members');
}

async function handleLore(request, env, id, method, corsHeaders) {
  return handleResource(request, env, id, method, corsHeaders, 'lore_story');
}

async function handleAnnouncements(request, env, id, method, corsHeaders) {
  return handleResource(request, env, id, method, corsHeaders, 'announcements');
}

async function handleResource(request, env, id, method, corsHeaders, table) {
  switch (method) {
    case 'GET':
      if (id) {
        const item = await env.DB.prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
        return new Response(JSON.stringify(item), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } else {
        const items = await env.DB.prepare(`SELECT * FROM ${table} ORDER BY id`).all();
        return new Response(JSON.stringify(items.results), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
    case 'POST':
      const data = await request.json();
      const result = await env.DB.prepare(
        `INSERT INTO ${table} (${Object.keys(data).join(', ')}) VALUES (${Object.keys(data).map(() => '?').join(', ')})`
      ).bind(...Object.values(data)).run();
      
      return new Response(JSON.stringify({ id: result.meta.last_row_id }), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
      
    case 'PUT':
      const updateData = await request.json();
      const updateResult = await env.DB.prepare(
        `UPDATE ${table} SET ${Object.keys(updateData).map(k => k + ' = ?').join(', ')} WHERE id = ?`
      ).bind(...Object.values(updateData), id).run();
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
      
    case 'DELETE':
      await env.DB.prepare(`DELETE FROM ${table} WHERE id = ?`).bind(id).run();
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
      
    default:
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
  }
}

async function hashPassword(password) {
  // Generate a cryptographically secure random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Derive hash using PBKDF2
  const hash = await deriveKey(password, salt);
  
  return {
    hash: hash,
    salt: saltHex
  };
}

async function deriveKey(password, salt) {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = typeof salt === 'string' 
    ? new Uint8Array(salt.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
    : salt;
  
  // Import password as key material
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits']
  );
  
  // Derive key using PBKDF2 with SHA-256
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 100000, // Strong iteration count for security
      hash: 'SHA-256'
    },
    keyMaterial,
    256 // 256-bit output
  );
  
  return Array.from(new Uint8Array(derivedBits)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(password, storedHash, storedSalt) {
  const computedHash = await deriveKey(password, storedSalt);
  return computedHash === storedHash;
}

async function handleAdmin(request, env) {
  // For GitHub Pages, this would need to be served separately
  // The admin.html file should be hosted on GitHub Pages at /admin
  return new Response('Admin page should be served from GitHub Pages at /admin', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  });
}