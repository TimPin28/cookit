# cookit, recipes made easy!

cookit is a recipe-sharing site where anyone can share their dishes no matter what cuisine!

You can either download the code, or open it using this link: [https://cookit-apdev.herokuapp.com](https://cookit-apdev.herokuapp.com)


# Features
* **Register & Log in** - Before being able to create, share, and comment on recipes, create your own account and login!
* **Create & Edit Recipe Posts** - Share your recipes on the site! Put in the ingredients, instructions, and upload a photo of your dish.
* **Create & Edit Comments on Posts** - Want to tell someone how delicious their recipe is? Comment on their post!
* **View All Recipes** - Can't decide on what to cook? View all the recipes on the site in one page.
* **Search Recipes or Tags** - Want to search for a pork dish, or a Japanese dish? Use the search bar to search for recipes and tags!
* **Delete Posts, Comments, and your Account** - Have control over your data. Delete your posts, comments, and even your account.

## Software Dependencies
* Any text editor
* [NodeJS & npm](https://www.npmjs.com/get-npm)
* [MongoDB Community Server](https://www.mongodb.com/try/download/community)
* [MongoDB Compass (Optional)](https://www.mongodb.com/try/download/compass)


## Local setup
1. Clone the repository to your machine.
  ```shell
  git clone https://github.com/TimPin28/cookit
  ```
2. Navigate to the directory where forked the local copy of cookit.
  ```shell
  cd cookit
  ```
3. Install the dependencies in package.json. All needed packages are already included.
  ```shell
  npm install
  ```
4. Run the server by inputting the script below on your terminal:
  ```shell
  node index.js
  ```
5. Navigate to [http://localhost:3000](http://localhost:3000). This should this display the home page of cookit.
![alt text](screens/homepage.PNG "Home page")

#### Note
The application will initially be without any entries since your database is not yet populated.
