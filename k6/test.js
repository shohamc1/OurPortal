import http from "k6/http";
export default function () {
  http.get(
    "https://ourportal.shohamc1.com/trade/tining-demobilization-cancel-shortstop"
  );
}
