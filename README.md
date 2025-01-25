# Quiz Application  

**A fun and interactive platform to test your knowledge, track progress, and compete with others!**  

## 🚀 Features  

### Admin Features  
- Create and manage quizzes.  
- Add, edit, and organize questions.  
- Save quizzes as drafts and publish them.  

### User Features  
- Take quizzes and view results.  
- Track progress with scores, percentages, and detailed feedback.  
- Compete on the leaderboard based on scores and submission time.  

### Additional Features  
- Randomized questions for every user.  
- Question order changes every 10 seconds during the quiz.  
- Anti-cheating measures to ensure fairness.  

---

## 🛠️ Tech Stack  

- **Backend**: Django Rest Framework (DRF)  
- **Frontend**: React with Vite  
- **Styling**: Tailwind CSS  

---

## 📚 How It Works  

1. **Login or Sign Up**  
   - Admins and users can create an account or log in.  

2. **Admin Dashboard**  
   - Create quiz sets, add questions, and manage drafts.  
   - Publish quizzes for users to attempt.  

3. **User Interaction**  
   - Browse all published quizzes.  
   - Take a quiz, with random question order for each user.  
   - View detailed results, including correct and wrong answers.  

4. **Leaderboard**  
   - Compare scores and ranks with others.  
   - Faster submissions are ranked higher in case of tied scores.  

---

## 🖥️ Installation  

### Clone the Repository  
```bash  
git clone https://github.com/shifat025/Quiz_Application  
cd Quiz_Application 
Install Dependencies

Install the required dependencies using npm (Node Package Manager):
npm install

 Set Up Environment Variables
In the frontend folder, create a .env file and add the necessary environment variables, such as the API URL for the backend:


VITE_API_URL=https://quiz-application-vzaz.onrender.com/  # The URL of your Django backend API


Run the Development Server
Start the development server to view the application in your browser:


npm run dev
