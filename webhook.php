<?php

$hubVerifyToken = 'phpmaster_toke';
$accessToken = 'EAALXfawbbkgBO07anPtpZBiGdxsJUuHmbTJo94OacerjvCrkd5xZBYzC3F88j7GgkgtRHlg7g5DN22k4clWZAe3HtxndEEaZCdtQcIoA956qoySBwg6CRUbogS15EPU0ZAtACa5UMm3yZBDRbzR6IZCYu3Ci5Xal8GGfYgfvUFTReBHljQQBfpNZCmqnbzsmxIMVxwrBalhci2bZBEd12ZCZAI8pF7V6p30gwZDZD';
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['hub_challenge']) && isset($_GET['hub_verify_token']) && $_GET['hub_verify_token'] === $hubVerifyToken) {
  echo $_GET['hub_challenge'];
  exit
}
