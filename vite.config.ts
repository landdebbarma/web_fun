import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Proxy Google OAuth - both login and callback
      '/auth/google': {
        target: 'http://localhost:8006',
        changeOrigin: true,
        selfHandleResponse: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('X-Forwarded-Host', 'localhost:5173');
            proxyReq.setHeader('X-Forwarded-Port', '5173');
            proxyReq.setHeader('X-Forwarded-Proto', 'http');
          });
          
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Check if this is the callback endpoint
            if (req.url?.includes('/auth/google/callback')) {
              let body = '';
              proxyRes.on('data', (chunk) => {
                body += chunk.toString();
              });
              proxyRes.on('end', () => {
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
        target: 'http://localhost:8006',
        changeOrigin: true,
      },
      '/auth/register': {
        target: 'http://localhost:8006',
        changeOrigin: true,
      },
      '/users': {
        target: 'http://localhost:8006',
        changeOrigin: true,
        rewrite: (path) => path
      },
      '/generate': {
        target: 'http://localhost:8006',
        changeOrigin: true,
        rewrite: (path) => path
      },
      '/chat': {
        target: 'http://localhost:8006',
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
        target: 'http://localhost:8006',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  }
})

