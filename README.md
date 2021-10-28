In this project let's build a **Movies App** by applying the concepts we have learned till now. This project allows you to practice the concepts and techniques learned till React Course and apply them in a concrete project.

You will demonstrate your skills by creating an app that will fetch data from an internal server using a class component, displaying that data, using **component lifecycle** methods, **routing** concepts, **authentication**, and **authorization**, and adding responsiveness to the website.

This is an individual assessment. All work must be your own. You will also be given feedback by code reviewers after your project submission.

### Prerequisites

#### UI Prerequisites

<details>
<summary>Click to view</summary>

- What is Figma?
  - Figma is a vector graphics editor and prototyping tool which is primarily web-based. You can check more info on the <a href="https://www.figma.com/" target="_blank">Website</a>.
- Create a Free account in Figma
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=hrHL2VLMl7g&t=37s" target="_blank">this</a> video to create a Free Figma account.
- How to Check CSS in Figma?
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=B242nuM3y2s" target="_blank">this</a> video to check CSS in the Figma screen.
- Export Images in Figma screen
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=NpzL1MONwaw" target="_blank">this</a> video to export images from the Figma screen.
  - Check <a href="https://help.trydesignlab.com/hc/en-us/articles/360011010634-How-do-I-export-images-and-PDFs-from-Sketch-or-Figma-in-my-short-course-" target="_blank">this</a> reference docs to export images in Figma screen.

</details>

#### API Prerequisites

<details>
<summary>Click to view</summary>

- What is TMDb?
  - TMDb has an open API allowing people freely access the information programmatically. TMDb offers a powerful API service that is free to use as long as you properly attribute us as the source of the data and/or images you use. You can check it out <a href="https://www.themoviedb.org/" target="_blank">here</a>.
- Create a Free account in TMDb
  - Kindly follow the instructions as shown in <a href="https://www.youtube.com/watch?v=mbImkkJFxBs" target="_blank">this</a> video to create the TMDb Account to use the APIs.
- API Key
  - After creating your free TMDb account. You can see your API Key (v3 auth) in <a href="https://www.themoviedb.org/settings/api" target="_blank">this</a>.
  - After everything is successfully done, you should have an API key similar to `521a30043599bb08p45f4d9ff35fbad8`. This will be used to make further API requests.

</details>

#### Design Files

<details>
<summary>Click to view</summary>

- You can check the **Design Files** for different devices <a href="https://www.figma.com/file/tPdVlj0p5PESmymNkHYVgk/Movies_App?node-id=0%3A1" target="_blank">here</a>.

</details>

### Set Up Instructions

<details>
<summary>Click to view</summary>

- Download dependencies by running `npm install`
- Start up the app using `npm start`
</details>

### Completion Instructions

<details>
<summary>Functionality to be added</summary>

The app must have the following functionalities

- Login Route
  - Users should be able to login to their account by entering a valid username and password.
- Users should be able to navigate to Home, popular, account routes using links in Navbar.
- When the data is being fetched then the Loading view should be displayed to the user.
- Users should be able to view the website responsively in mobile view, tablet view as well
- Home Route
  - Users should be able to see Random Originals movie title and movie poster with its details.
  - Users should be able to navigate to Home route when clicking on **MOVIES** logo.
  - Users should be able to see Originals,Trending now movies, Top Rated Collections
  - The collections should be horizontally scrollable.
  - Users should be able to see the footer as shown in figma
  - Users should be able to see Home with highlighted text in Navbar.
- Specific Movie details Route
  - When users click a movie in a particular collection, it should open a new page with respective movie details
  - Users should be able to see similar movies sections as shown in the figma screens.
- Search Functionality
  - Users should be able to search for movie titles.
  - Users should be able to browse search results using pagination buttons.
  - When the user provides the movie name which is not in the database then the No results view should be displayed.
  - When the users click a movie, it should open a new page with respective movie details
- Popular Movies Route
  - Users should be able to select and view popular movies using the Popular link in the navbar in a separate page.
  - Users can browse popular movies using pagination buttons.
  - When users click a movie, it should open a new page with respective movie details
  - Users should be able to see the footer as shown in figma
  - Users should be able to see Popular with highlighted text in Navbar
- Account Route
  - Users should be able to select and view basic account details using the Profile Icon in the navbar in a separate page.
  - Users should be able to logout from accounts page
- When the users enter invalid route in the URL then the Lost your Way Route should be displayed.

</details>

### Quick Tips

<details>
<summary>Click to view</summary>

- You can use React-slick third party library to implement carousel
  - React Slick <a href="https://react-slick.neostack.com/docs/get-started" target="_blank">Documentation</a>
  - React Slick implementation <a href="https://codesandbox.io/s/w7z4v" target="_blank">CodeSandbox</a>

</details>

### Important Note

<details>
<summary>Click to view</summary>

- Use the below prefix to access movie images or poster images from the keys - `backdrop_path` or `poster_path` in the API response

  ```js
  'https://image.tmdb.org/t/p/original/{backdrop_path}'

  ```

  ```js
  'https://image.tmdb.org/t/p/original/{poster_path}'

  ```

- Check the usage in <a href="https://developers.themoviedb.org/3/configuration/get-api-configuration" target="_blank">this</a>

</details>

### Resources

<details>
<summary>Data fetch URLs</summary>

- **Note:** Use the values in the APIs as shown below

  - Use your TMDB API Key (v3 auth) in place of API_KEY
  - Use respective movie id in place of MOVIE_ID
  - Use respective page number in place of PAGE_NUMBER
  - Use respective query in place of QUERY
  - Use the below sample code snippet to make a POST request on Login using **TMDb username** and **TMDb password**

    ```js
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }
    ```

- Login

  - Get Request Token :

    ```js
    'https://api.themoviedb.org/3/authentication/token/new?api_key={API_KEY}'

    ```

    - Check the usage of <a href="https://developers.themoviedb.org/3/authentication/create-request-token" target="_blank">this</a> API

  - Login using TMDb Username and Password :

    ```js
    'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key={API_KEY}'

    ```

  - Sample request object :

    ```json
    {
      "username": "rahul",
      "password": "ccbp123",
      "request_token": "1234abcd5678"
    }
    ```

    - Check the usage of <a href="https://developers.themoviedb.org/3/authentication/validate-request-token" target="_blank">this</a> API

- Home Route:

  - Get Trending Movies :

    ```js
    'https://api.themoviedb.org/3/trending/all/week?api_key={API_KEY}'

    ```

    - Check the usage of <a href="https://developers.themoviedb.org/3/trending/get-trending" target="_blank">this</a> API

  - Get Top Rated Movies :

    ```js
    'https://api.themoviedb.org/3/movie/top_rated?api_key={API_KEY}&language=en-US'

    ```

    - Check the usage of <a href="https://developers.themoviedb.org/3/movies/get-top-rated-movies" target="_blank">this</a> API

  - Get Originals :

    ```js
    'https://api.themoviedb.org/3/discover/tv?api_key={API_KEY}'

    ```

    - Check the usage of <a href="https://developers.themoviedb.org/3/discover/tv-discover" target="_blank">this</a> API

- Specific Movie Details Route:

  - Get Movie Details :

    ```js
    'https://api.themoviedb.org/3/movie/{MOVIE_ID}?api_key={API_KEY}&language=en-US'

    ```

    - Check the usage of <a href="https://developers.themoviedb.org/3/movies/get-movie-details" target="_blank">this</a> API

  - Get Similar Movies :

    ```js
    'https://api.themoviedb.org/3/movie/{MOVIE_ID}/similar?api_key={API_KEY}&language=en-US&page={PAGE_NUMBER}'

    ```

    - Check the usage of <a href="https://developers.themoviedb.org/3/movies/get-similar-movies" target="_blank">this</a> API

- Search Movies:

  ```js
  'https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&language=en-US&query={QUERY}&page={PAGE_NUMBER}'

  ```

  - Check the usage of <a href="https://developers.themoviedb.org/3/search/search-movies" target="_blank">this</a> API

- Popular Movies Route:

  - Get Popular Movies :

    ```js
    'https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&language=en-US&page={PAGE_NUMBER}'

    ```

    - Check the usage of <a href="https://developers.themoviedb.org/3/movies/get-popular-movies" target="_blank">this</a> API

</details>

### Stretch Goals

If you complete the main features of the project you can try out the below features as well.

**Note:** Just a reminder the additional functionality is just extra practice using the tools we have learned. These are not required. If you do not reach the stretch goals, don't worry.

<details>
<summary>Additional Functionality to be added</summary>

- TV Shows Route
  - Users should be able to select and view TV shows using the TV Shows link in the navbar in a separate page.
  - TV Shows should have genre filter
  - Users can browse TV shows using pagination buttons.
  - Users should be able to search for TV Shows as well.
- Multiple Profiles Functionality:
  - User should be able to add multiple profiles
  - User should be able to manage profile functionality
- Animation Functionality:
  - When a user hover particular movie then it should show about more details of a title with scaled animation.

</details>

### Project Submission Instructions

- For Mini Projects, you no need to submit the code using `ccbp submit RJSCP79ATS`, Though you submit the test cases may or may not succeed and you can ignore the result, Test cases will be added soon.

- For Mini Projects, you need to only publish/deploy the code using `ccbp publish RJSCP79ATS domain_name.ccbp.tech`. So that our team will be able to see that code and deployed URL( Ex: something.ccbp.tech) and will share feedback to you if required.

> ### _Things to Keep in Mind_
>
> - All components you implement should go in the `src/components` directory.
> - **Do not remove the pre-filled code**
> - Want to quickly review some of the concepts you’ve been learning? Take a look at the Cheat Sheets.
