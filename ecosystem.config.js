/**
 * ? installed pm2 global: 
 ** -`npm install pm2 -g`
 *
 * ? I want to manage both Client and Server processes with one command. It's not mandatory.
 * 
 * todo: To start process digit in terminal  
 ** -`pm2 start ecosystem.config.js`
 * todo: To stop: 
 ** -`pm2 stop all` or 
 ** -`pm2 stop <process_id>` or 
 ** -`pm2 stop Client` or 
 ** -`pm2 stop Server`
 * todo: To delete process:
 ** -`pm2 delete all`
 ** -`pm2 delete <process_id>` or 
 ** -`pm2 delete Client` or 
 ** -`pm2 delete Server`
 * todo: To view list process: 
 **  - `pm2 list`
 */

module.exports = {
  apps: [
    {
      name: 'client',
      script: 'cd client && npm run dev',  /* http://localhost:3000 */
      watch: true
    },
    {
      name: 'server',
      script: 'cd server && npm start',  /* http://localhost:8080 */
      watch: true
    }
  ]
};