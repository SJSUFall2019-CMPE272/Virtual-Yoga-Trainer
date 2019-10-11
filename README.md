# Virtual Yoga Workout Trainer 
A workout/yoga companion application enhanced with machine learning

## Abstract
A virtual Yoga workout trainer which detects if you are using the right form of exercise(eg. Yoga pose) for the workout using Posenet, also gives points based on the correctness of the posture. The app will try to gamify your workout experience.
This app can be used by anyone who wants a virtual trainer anywhere/anytime to track and gamify their workouts. 


We will apply transfer learning on a POSNET model to detect Yoga poses and this trained model will be embedded in the mobile application as TensorFlow lite model. Using this model realtime pose detection is done locally on device. 

## Architecture diagram
![Architecture diagram](https://github.com/SJSUFall2019-CMPE272/Virtual-Trainer/blob/master/Architecture%20diag.jpg)

## Tech Stack
### Machine learning
[Python](https://www.python.org/), [TensorFlow](https://www.tensorflow.org/) - We will be using python and Tensorflow machine learning platform to train our machine learning model. Tranfer learning will be applied on top of a [POSENET model](https://github.com/tensorflow/tfjs-models/tree/master/posenet) so that the required yoga and workout poses will be detected. Once Tensorflow model is ready, we will convert it to tensorflow lite model so that it can be deployed in the mobile device itself. This is done using [TensorFlow Lite converter](https://www.tensorflow.org/lite/convert).   

### Mobile Application
[React Native](https://facebook.github.io/react-native/) - React Native is a framework for building native apps using React. The advantage of using React Native is that same codebase can be used for Android, IOS and other platforms. So a single application is only required to be written in Javascript using this framework which can be deployed across multiple platforms.

### Cloud Services
Google Cloud : [Cloud Firestore](https://firebase.google.com/docs/firestore) - flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform. This database will be used to store user details, user preferences and user data. This data includes personal information, progress in app, app configurations etc. This is a cloud NoSQL database and can be accessed within the application via native SDKs.

[Firebase authentication](https://firebase.google.com/docs/auth) - Users will be authenticated into the application using Google Firebase Authenticator. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.
