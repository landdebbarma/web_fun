import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log('Loaded env:', env.VITE_API_BASE_URL);
  return {
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  server: {
    proxy: {
      // Proxy Google OAuth - both login and callback
      '/auth/google': {
        target: env.VITE_API_BASE_URL,
        changeOrigin: false,
        selfHandleResponse: true,
        bypass: (req) => {
          if (req.url?.includes('callback')) {
            return req.url;
          }
        },
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying request:', req.url);
            proxyReq.setHeader('X-Forwarded-Host', 'localhost:5173');
            proxyReq.setHeader('X-Forwarded-Port', '5173');
            proxyReq.setHeader('X-Forwarded-Proto', 'http');
          });
          
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received response from backend:', proxyRes.statusCode, req.url);
            // Check if this is the callback endpoint
            if (req.url?.includes('/auth/google/callback')) {
              let body = '';
              proxyRes.on('data', (chunk) => {
                body += chunk.toString();
              });
              proxyRes.on('end', () => {
                console.log('Backend response body:', body);
                try {
                  const data = JSON.parse(body);
                  const token = data.access_token || data.token || data.accessToken;
                  
                  // Return HTML that sends postMessage to opener
                  const html = `
                    <!DOCTYPE html>
                    <html>
                    <head><title>Authenticating...</title></head>
                    <body>
                      <script>
                        if (window.opener) {
                          window.opener.postMessage(
                            { type: 'GOOGLE_AUTH_SUCCESS', token: '${token}' },
                            window.location.origin
                          );
                          window.close();
                        } else {
                          // Not a popup, redirect with token
                          window.location.href = '/auth/google/callback?access_token=${token}';
                        }
                      </script>
                      <p>Authenticating... Please wait.</p>
                    </body>
                    </html>
                  `;
                  
                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  res.end(html);
                } catch {
                  // Not JSON or parse error, pass through original response
                  res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
                  res.end(body);
                }
              });
            } else {
              // For non-callback requests (like /login), pipe through normally
              res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
              proxyRes.pipe(res);
            }
          });
        }
      },
      '/auth/login': {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
      },
      '/auth/register': {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
      },
      '/auth/forgot-password': {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
      },
      '/auth/verify-otp': {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
      },
      '/auth/change-password': {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
      },
      '/users': {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path
      },
      '/generate': {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path
      },
      '/chat': {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
        selfHandleResponse: true, // Required for streaming
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('X-Forwarded-Host', 'localhost:5173');
            proxyReq.setHeader('X-Forwarded-Port', '5173');
            proxyReq.setHeader('X-Forwarded-Proto', 'http');
          });

          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Pass through all headers to support streaming
            res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
            // Pipe the response directly without buffering to enable streaming
            proxyRes.pipe(res);
          });
        }
      },
      '/projects': {
        target: env.VITE_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  }
  }
})

