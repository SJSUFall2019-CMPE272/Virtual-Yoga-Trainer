# Virtual Yoga Trainer 

## Abstract
Are you a Yoga enthusiast? or someone who just wants to get started with yoga by learning new poses? then this app is for you! The Virtual Yoga trainer App can detect your yoga poses to check if you are using the right form for the workout. 

This app can be used by anyone who wants a virtual yoga trainer anywhere/anytime to track and gamify their workouts, all you need is a phone with a camera. The app will come with a re-trained POSNET model to detect yoga poses accurately in realtime.

Capitalizing on the fact that there are over 230 million smartphone users in the USA alone and over 300 million yoga practitioners worldwide the Virtual yoga trainer will be able to cater to anyone who wants to make their workout routine more effective. 


## Architecture diagram
![Architecture diagram](https://user-images.githubusercontent.com/18594304/66626073-bc253200-ebab-11e9-8fb9-9b1ac984f09d.png)

## Tech Stack
### Machine learning
[Python](https://www.python.org/), [TensorFlow](https://www.tensorflow.org/) - We will be using python and Tensorflow machine learning platform to train our machine learning model. Tranfer learning will be applied on top of a [POSENET model](https://github.com/tensorflow/tfjs-models/tree/master/posenet) so that the required yoga and workout poses will be detected. Once Tensorflow model is ready, we will convert it to tensorflow lite model so that it can be deployed in the mobile device itself. This is done using [TensorFlow Lite converter](https://www.tensorflow.org/lite/convert).   

### Mobile Application
[React Native](https://facebook.github.io/react-native/) - React Native is a framework for building native apps using React. The advantage of using React Native is that same codebase can be used for Android, IOS and other platforms. So a single application is only required to be written in Javascript using this framework which can be deployed across multiple platforms.

### Cloud Services


[Cloud Firestore](https://firebase.google.com/docs/firestore) - flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform. This database will be used to store user details, user preferences and user data. This data includes personal information, progress in app, app configurations etc. This is a cloud NoSQL database and can be accessed within the application via native SDKs.

[Firebase authentication](https://firebase.google.com/docs/auth) - Users will be authenticated into the application using Google Firebase Authenticator. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.

## Persona/Target Users
Persona/Target group consists of demographics aged 18-40 yrs who are looking to stay healthy/fit. This demographic might be interested in joining a gym or starting a fitness routine and owns a smart phone. This App will help people who want to workout anywhere with just a smartphone at their convenience.

## Hill Statement
A user who wants to workout and stay fit should be able to do so with live feedback anywhere with just our app at their convenience.

## Design Document
[Design Document PDF](https://github.com/SJSUFall2019-CMPE272/Virtual-Yoga-Trainer/blob/master/design/Design_doc.pdf)
