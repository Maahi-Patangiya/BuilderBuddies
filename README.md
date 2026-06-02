

<h1 style="text-align: center;">Builder Buddies (Team 7613)</h1>


### Team name
Builder Buddies


### Product Name
Builder Buddies (Web app)


### Motivation
73% of doctors believe healthcare for migrant workers is compromised. 92% of them cite communication as the primary hurdle, as many workers are left unaware of their rights and fearful of their future. As such we aim to not only make them more aware of their healthcare rights, but also their legal rights to help them fight unfair treatment from employers. Additionally we hope to help them better integrate into society, ultimately serving as an “all things Migrant Worker” to ease their transition into working and living here.


### Target Audience
Migrant Workers


### User stories
As a Migrant Worker who wants to gain access to information, I want to have all the information consolidated in a page (categorised neatly based on the nature of my issue), and access it in my native language for my own understanding with easy visuals.
As a Migrant Worker who wants to physically visit resources near me, I want to be able to do so efficiently, finding a place (e.g. a clinic) near my dormitory.
As a Migrant Worker who wants to clarify a doubt, I want to have access to an FAQ page where I can read through common and previously asked questions, as well as submit my own query.
As a Migrant Worker in an urgent situation, I want to be able to have my emergency contacts available at the click of a button.
As a Migrant Worker who has a long-term/ recurring issue, I would want to star my resources to be able to access them at my own convenience.
As an NGO Support Expert, I want a centralized, real-time dashboard feed of incoming worker queries so that our team can instantly see who requires help without manual page refreshes.


## App Use Case Diagram
![Use Case Diagram](assets/Use%20Case%20Diagram.png)


## Workflow Diagram
![Workflow Diagram](assets/Workflow%20Diagram.png)


Migrant Workers that use the app will first choose their preferred language, then login, and be directed to the home page. From there, there are 4 features for their use. Firstly, in times of emergency or sickness where Migrant Workers are confused or panicking, our find nearby clinic feature allows them to find HealthServe clinics (tailored for them) near them for greater convenience. Additionally, for more serious scenarios, there is a SOS button feature as well, that directly rings either the ambulance/ fire station or the police. Next, there is a FAQ feature for them to ask questions and be updated with information from others’ questions. These questions will be seen by the administrator, and will be attended to ASAP. Once answered, the questions will join the list of questions on the FAQ page if relevant. There is a resource directory too, for them to generally gain a better understanding on their rights, the resources entitled to them, etc.


### Design Considerations
We wanted to make sure that Migrant Workers overcome the language barrier they face so often in communication with their employers, hence ensuring the app will be translatable in a language of their choice using Google Translation API. Hence, that is the first thing Migrant Workers get to choose at the login page. This allows them to use the app comfortably.


Additionally, having the SOS button as its own button at the homepage helps ease the panic and time needed to take action.


## Architecture Diagram
![Architecture Diagram](assets/Architecture%20Diagram.png)


## Tech Stack Justification
1. Frontend Framework: Next.js (React) & TypeScript
It promotes component reuse, as Next.js uses React's component-based structure. This allows us to build UI elements (like input forms, navigation headers, or query cards) once and reuse them across both the worker and expert interfaces, drastically cutting down on code duplication.
Additionally, TypeScript helps us ensure code safety. It uses static type-checking and catches bugs, errors, and undefined data fields directly within VS Code before the application runs, ensuring our code is clean. Given the little experience we have in web-development, Next.js has extensive documentation and community support, making it an ideal environment for learning web development from scratch.


2. Backend-as-a-Service (BaaS): Firebase (Auth & Firestore NoSQL)
We use it to handle real-time data storage for submitted queries and dummy FAQs, alongside secure user registration and login management. Its zero server overhead was a reason why we chose it. Building and protecting custom backend servers (e.g., Express/Node.js or Django) requires significant configuration. Firebase handles cloud infrastructure serverlessly, allowing us to focus entirely on writing application features instead of managing database ports or routing protocols. It also allows for real-time synchronization. Firestore provides built-in listeners (onSnapshot). When a worker submits a question via the web portal, the data instantly appears on the Support Expert's dashboard feed in real time without needing page refreshes. Lastly it also has out-of-the-box Authentication. Firebase Auth securely encrypts user credentials and handles session tokens automatically, allowing us to build a secure login system for Milestone 1 efficiently.


3. Data Processing Pipeline: Python (BeautifulSoup & Pandas) (planned for Milestone 2)
It will web-scrape and structure information from official ministerial and NGO portals to populate our FAQ and resource directory database. This allows us to leverage team strengths. It gives our Data Science & Economics student a space to write data extraction scripts using Python, a language she is comfortable with. It also comes with a powerful ecosystem. BeautifulSoup will allow us to navigate and extract HTML data from complex external support websites, while Pandas provides rapid data manipulation capabilities to clean and restructure raw text into formatted JSON objects ready for our Firestore collections.


4. Interface Styling: Tailwind CSS
It will control the layout, responsiveness, and visual presentation of the platform. Instead of writing custom CSS across multiple separate stylesheets, Tailwind allows us to style HTML structures instantly using predictable inline utility classes (e.g., flex, bg-blue-500, rounded-lg), making it time efficient. Additionally, Migrant workers primarily access online resources via smartphones and tablets. Tailwind's mobile-first breakpoints (e.g., sm:, md:, lg:) ensure that our interfaces adjust dynamically and remain readable and responsive on any screen size.


# BuilderBuddies
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Getting Started


First, run the development server:


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Learn More


To learn more about Next.js, take a look at the following resources:


- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


## Deploy on Vercel


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.


Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.