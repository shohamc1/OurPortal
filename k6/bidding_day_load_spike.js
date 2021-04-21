import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "5m", target: 500 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: "10m", target: 500 }, // stay at 100 users for 10 minutes
    { duration: "5m", target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = "https://ourportal.shohamc1.com";

export default () => {
  http.get(BASE_URL, { timeout: 100000 });
};
