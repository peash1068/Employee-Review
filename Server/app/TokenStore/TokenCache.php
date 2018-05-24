<?php

namespace App\TokenStore;
use Carbon\Carbon;
use GuzzleHttp;
use Illuminate\Support\Facades\Log;

class TokenCache {
    private $access_token;
    private $refresh_token;
    private $expires;

    //private $server_url = 'http://apigateway.dev';
    private $server_url = 'http://45.249.100.28';
    private $username = 'someUser@gmail.com';
    private $password = 'Nopass1234';
    private $client_id = '4';
    private $client_secret = 'LUyymJBjiUGVoyt0NxtEs0SY4efMs72BC3nThTjD';

    private function cacheTokens() {
        app('cache')->put('access_token', $this->access_token, $this->expires);
        app('cache')->put('refresh_token', $this->refresh_token, $this->expires);
        app('cache')->put('token_expires', time() + $this->expires*60, $this->expires);
    }

    public function clearTokens() {
        app('cache')->forget('access_token');
        app('cache')->forget('refresh_token');
        app('cache')->forget('token_expires');
    }

    private function setTokens(array $content){
        $this->access_token = $content['access_token'];
        $this->refresh_token = $content['refresh_token'];
        $this->expires = (int) ($content['expires_in']/60);
    }

    public function getExpirationTime(){
        if(app('cache')->has('token_expires')){
            $date = Carbon::createFromTimestamp(app('cache')->get('token_expires'));
            return $date;
        }else{
            return "not found";
        }
    }

    public function getAccessToken() {
        // Check if tokens exist
        if (!app('cache')->has('access_token')) {
            $this->retrieveToken();
            return $this->access_token;
        }else{
            // Check if token is expired
            //Get current time + 5 minutes (to allow for time differences)
            $now = time() + 300;

            if (app('cache')->get('token_expires') <= $now) {
                // Token is expired (or very close to it)
                // so let's refresh
                $this->refreshToken();
                return $this->access_token;
            }
            else {
                // Token is still valid, just return it
                return app('cache')->get('access_token');
            }
        }
    }

    public function retrieveToken(){
        $requestParams = [
            'grant_type' => 'password',
            'client_id' => $this->client_id,
            'client_secret' => $this->client_secret,
            'username' => $this->username,
            'password' => $this->password,
            'scope' => '',
        ];

        $client = new GuzzleHttp\Client();
        $response = $client->post($this->server_url . '/oauth/token', [ 'form_params' => $requestParams ]);

        $content = json_decode((string) $response->getBody(), true);

        $this->setTokens($content);
        $this->cacheTokens();
    }

    public function refreshToken(){
        if(app('cache')->has('refresh_token')){
            $requestParams = [
                'grant_type' => 'refresh_token',
                'refresh_token' => cache()->get('refresh_token'),
                'client_id' => $this->client_id,
                'client_secret' => $this->client_secret,
                'scope' => '',
            ];

            $client = new GuzzleHttp\Client();
            $response = $client->post($this->server_url . '/oauth/token', [ 'form_params' => $requestParams ]);


            $content = json_decode((string) $response->getBody(), true);
            if(!empty($content)){
                $this->setTokens($content);
            }else{
                $this->retrieveToken();
            }
            $this->cacheTokens();
        }else{
            $this->retrieveToken();
        }
    }

    public function revokeTokens() {
        $requestParams = [
            'token' => app('cache')->get('access_token')
        ];

        $client = new GuzzleHttp\Client();
        $client->post($this->server_url . '/oauth/token', [ 'form_params' => $requestParams ]);


        $this->clearTokens();

        return true;
    }

    public function getHeaders(){
        return [
            'Authorization' => 'Bearer ' . $this->getAccessToken(),
            'Content-Type' => 'application/x-www-form-urlencoded',
            'Accept' => 'application/json',
        ];
    }
}