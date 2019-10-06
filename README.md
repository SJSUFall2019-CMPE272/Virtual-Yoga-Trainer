# Virtual Yoga Workout Trainer 

### Abstract
A virtual Yoga workout trainer which detects if you are using the right form of exercise(eg. Yoga pose) for the workout using Posenet, also gives points based on the correctness of the posture. The app will try to gamify your workout experience.
This app can be used by anyone who wants a virtual trainer anywhere/anytime to track and gamify their workouts. 


We will apply transfer learning on a POSNET model to detect Yoga poses and this trained model will be embedded in the mobile application as TensorFlow lite model. Using this model realtime pose detection is done locally on device. 

### Architecture diagram
![Architecture diagram](https://github.com/SJSUFall2019-CMPE272/Virtual-Trainer/blob/master/Architecture%20diag.jpg)

### Tech Stack
Python, TensorFlow

Mobile App - ReactNative: Android/iOS

Google Cloud : Cloud Firestore - NoSQL cloud Db by Google, Firebase authentication
