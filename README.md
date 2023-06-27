
# **Tasks**
   

 **`Live link:`**  [Photography Campus](https://photography-camp.web.app) 
 
<br/>

## **Technologies Used**
1. HTML
2. CSS
3. Tailwindcss
4. daisyui
5. React
6. Firebase
7. Node JS
8. Express JS
9. MongoDB
10. JSON web token
11. Axios
12. Tanstack query

<br/>
<hr/>
<br/>

## ****Features****

 - Users have to login or create account first..  
 - After login,users can browse all posts even other users posts(for example in fb,twitter one can browse others post too) ..
  - User can see the time of post has been created..
 - User can only update or delete own post..
<br/>

## ****Process ****
- At first, I created a Login and Register Page.
- Then, I used Firebase for authentication.
- I protected the home page so that only logged-in users can access it.
- On the home page, I added a CreatePost component where users can create posts.
- Users can also add images to their posts if they wish.
- The created posts are stored in MongoDB.
- To fetch and display the posts, I used axios and Tanstack Query.
- When users click on the update icon, a modal opens allowing them to update their own posts.
- When users click on the delete icon, a confirmation popup appears. If confirmed, the post is deleted from both the interface and the database.
- After deleting a post, there's no need to refresh the browser as I implemented Tanstack Query's refetch function, which automatically updates the remaining posts.
<br/>

## ****Steps for locally run ****
### `Client side`
In the project directory, you can run:
- At first git clone the folder.
- Then open terminal, go to  `Grow-Global` folder as it is client side folder.I used React for client side code.
- then open terminal in `Grow-Global` and ### `npm i -f` run this command.
- Then run ### `npm run dev` ## ****make sure you provide your imgbb key and firebases keys otherwise it'll get an error. I have my keys in .env file as an developer is not good practise to share curisal information into public.    ****
<br/>

### `Server side`
 - Go to  `Grow-Global` folder as it is server side folder.I used React for client side code.
- then open terminal in `Grow-Global-Server` and ### `npm i` run this command.
- Then run ### `npm start` ## ****make sure you provide your own mongodb database key and firebases keys and access token otherwise it'll get an error. I have my keys in .env file as an developer is not good practise to share curisal information into public.    ****
