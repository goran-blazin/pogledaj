import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // Ramp-up to 5 users within 1 minute
    { duration: '5m', target: 10 }, // Stay at 5 users for 5 minutes
    { duration: '1m', target: 0 }, // Ramp-down to 0 users within 1 minute
  ],
};

export default function () {
  // Replace this with your website URL
  const res = http.get('https://api.pogledaj.rs/movies?onlyWithActiveProjections=true');

  // Check if the response status is 200 (OK)
  check(res, {
    'status was 200': (r) => r.status === 200,
  });

  // You can add a sleep to simulate real user think time (1 second between requests)
  sleep(1);
}