# cPanel Deployment Instructions

## Step 1: Upload Files to cPanel

1. Create a zip file of the project (exclude node_modules)
2. Upload to cPanel File Manager
3. Extract the zip in your desired location

## Step 2: Setup Node.js Application in cPanel

Navigate to: **cPanel → Setup Node.js App → CREATE APPLICATION**

### Configuration Settings:

**Node.js version:** 18.x (or latest available)

**Application mode:** Production

**Application root:** /home/prudfin/loan-site
(Replace 'prudfin' with your actual cPanel username)

**Application URL:** https://prudentialfinancial.com.au
(Or your desired domain/subdomain)

**Application startup file:** server/production-server.cjs

**Passenger log file:** /home/prudfin/logs/passenger.log

### Environment variables:
Click "Add variable" and add these THREE variables:

1. **Name:** NODE_ENV
   **Value:** production

2. **Name:** ADMIN_USERNAME
   **Value:** (your chosen admin username)

3. **Name:** ADMIN_PASSWORD
   **Value:** (your chosen secure password)

## Step 3: Install Dependencies

After creating the application, cPanel will show a command like:

```bash
source /home/prudfin/nodevenv/loan-site/18/bin/activate && cd /home/prudfin/loan-site && npm install
```

Run this command in the Terminal or it will run automatically.

## Step 4: Start the Application

Click "Run NPM Install" and then "Restart" in the Node.js App interface.

## Step 5: Access Your Site

- **Frontend:** https://prudentialfinancial.com.au
- **Admin Panel:** https://prudentialfinancial.com.au/admin
  - Use the username and password you set in environment variables

## Security Notes

- **REQUIRED:** You MUST set ADMIN_USERNAME and ADMIN_PASSWORD environment variables
- The application will not start without these credentials configured
- Never commit credentials to git
- Use a strong, unique password
- Change your password regularly

## Troubleshooting

If the app doesn't start:
1. Check passenger.log file: `/home/prudfin/logs/passenger.log`
2. Ensure all dependencies are installed
3. Verify file permissions (755 for directories, 644 for files)
4. Make sure the Application Root path is correct
