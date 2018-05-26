# Employee-Review

setp 1: Setup the Sever(laravel 5.5.36):
		1. Go to the Server folder using command line and run `composer install`
		2.Follow "http://www.laravelinterviewquestions.com/2017/12/cross-origin-request-blocked-error-laravel.html#sthash.8EVhqcT3.dpbs"
		  to set up CORS. To avoid "Access-Control-Allow-Origin" error.
		3.Go to 'app/Http/Kernel.php' of the Server and comment out // \App\Http\Middleware\VerifyCsrfToken::class,
		
setp 2: Import the database dump on your local mysql serve and configure the .env and database.php on the config folder of the `Server`
step 3: Start the laravel serve on port 8080 using
        `php artisan serve --port=8080`
step 4: Go to the `webportal` folder from command line and run `npm install`
		Run the webportal(reactjs) using 'npn start' command the webportal will start at 'http://localhost:3000/'. 

step 5: admin user login is username: admin@gmail.com, password:1234
        Normal User login is username:sajib@gmail.com, password:1234
        you can create and view your user from the admin panel.
        
        
  PS: Please keep Internet connection on while using the portal, because some of the libraries are loaded online
