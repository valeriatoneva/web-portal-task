<?php
include 'config.php';

function get_access_token(){
  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_URL => API_URL . "/index.php/login",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode(array(
        "username"=>API_USERNAME,
        "password"=>API_PASSWORD
    )),
    CURLOPT_HTTPHEADER => array(
        "Authorization: Basic " . base64_encode(API_USERNAME . ":" . API_PASSWORD),
        "Content-Type: application/json"
    ),
  ));

  $response = curl_exec($curl);
  $data = json_decode($response, true);
  curl_close($curl);
  return $data['oauth']['access_token'];
}

function get_tasks(){
  $access_token = get_access_token();
  $curl = curl_init();

  curl_setopt_array($curl, array(
    CURLOPT_URL => API_URL . "/index.php/v1/tasks/select",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
      "Authorization: Bearer $access_token"
    ),
  ));

  $response = curl_exec($curl);
  $data = json_decode($response, true);
  curl_close($curl);
  return $data;
}
