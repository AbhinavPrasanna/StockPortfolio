## Frontend (cardgame)

The React frontend lives in `../cardgame` and consumes this backend's GraphQL API.

### Run frontend in PowerShell

1. Open a new terminal and go to the frontend project:
   - `cd ..\cardgame`
2. Install dependencies:
   - `npm.cmd install`
3. Point frontend to backend GraphQL endpoint:
   - `$env:REACT_APP_GRAPHQL_URL="http://localhost:8080/graphql"`
4. Start the dev server:
   - `npm.cmd start`
5. Open:
   - `http://localhost:3000`

### Frontend notes

- If backend is not running, card rows will fail to load.
- PowerShell may block `npm` script execution (`npm.ps1 cannot be loaded`); use `npm.cmd` commands or run:
  - `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
- Optional image base override (used when `imageS3Key` is present):
  - `$env:REACT_APP_S3_IMAGE_BASE_URL="https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/"`