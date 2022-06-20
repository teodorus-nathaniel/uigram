# Project Overview
UIGram is a social media platform, mainly made for *Frontend Developers* or *UI Designers* to share and get feedback for each others' designs.  
UI for the shared posts are catered for production website, which mainly have long pages, compared to dribbble or similar websites that shares the images as landscape which results in cropped design.  

There is also a special feature, which allows user to just give the URL of their website, and UIGram will automatically screenshot that page fully so user can create their post (if they have their website ready) easily.  
Note that this feature is currently not working if you are using the production backend (which is hosted in free heroku), because there is a timeout which makes the screenshot feature not working.

-- 
This project is made using `react`, `typescript`, `redux`, `redux-saga`, `scss`  
and have close ties with [UIGram API Repository](https://github.com/teodorus-nathaniel/uigram-api) which acts as the backend.

-- 
Note: Currently the backend url is hardcoded into the code, where the development backend link is `http://localhost:8080/api/v1`, and production link is `https://uigram-api.herokuapp.com/api/v1`. To change, adjust the values of `baseURL` inside `src/redux/utils/fetch.ts`