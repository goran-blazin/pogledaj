import axios from 'axios';
import Utils from '../helpers/Utils';

export const PogledajApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Browser-Name': Utils.browserInfo.name,
    'X-Browser-Version': Utils.browserInfo.version,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pblVzZXJSb2xlIjoiU3VwZXJBZG1pbiIsImZ1bGxOYW1lIjoiR29yYW4gQmxhemluIiwiY2luZW1hSWRzIjpbIjJlZjc3YmM0LWE2NzgtNGUwNS04NzlhLWVjYTViMmNmNTQ3MyIsIjVmNDczMGU1LTc0Y2EtNDYwNy1iN2MwLTBkODJiZTU0MTdmMiJdLCJlbWFpbCI6ImdvcmFuLmJsYXppbkBnbWFpbC5jb20iLCJqdGkiOiI0N2JhYjBkNC0zNThlLTRkODYtOTFmOC03NDI1ZTdjZTZjZGUiLCJpYXQiOjE2NzQwNTUwMzUsImV4cCI6MTY3NTI2NDYzNX0.5gYOJtWcNTOEUkQpv5F7MiUfSWjKp5v1vmOae-kPFZY`,
  },
});
