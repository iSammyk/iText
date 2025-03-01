import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "john23@example.com",
    fullName: "John Kellerman",
    password: "123456",
    profilePic: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
  },
  {
    email: "Bran.wler@example.com",
    fullName: "Winifren Bran",
    password: "123456",
    profilePic: "https://st.depositphotos.com/1030327/2363/i/450/depositphotos_23636285-stock-photo-portrait-of-young-beautiful-woman.jpg",
  },
  {
    email: "Debanks@example.com",
    fullName: "Hannah Mert",
    password: "123456",
    profilePic: "https://i.pinimg.com/236x/6c/ed/b6/6cedb690a48f5613baef9b93f247d22d.jpg",
  },
 

  // Male Users
  {
    email: "Christy1444@example.com",
    fullName: "Shawn barrister",
    password: "123456",
    profilePic: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
  },
  {
    email: "All2hdf@example.com",
    fullName: "Allen samson",
    password: "123456",
    profilePic: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
  },
  {
    email: "Topade@example.com",
    fullName: "Adeyemi Seun",
    password: "123456",
    profilePic: "https://www.shutterstock.com/image-photo/handsome-happy-african-american-bearded-600nw-2460702995.jpg",
  },
  {
    email: "olasjuwee@example.com",
    fullName: "Tunji james",
    password: "123456",
    profilePic: "https://st.depositphotos.com/1002314/3418/i/450/depositphotos_34185209-stock-photo-african-business-man.jpg",
  },
  {
    email: "hughtasmen155@example.com",
    fullName: "Agent fortune",
    password: "123456",
    profilePic: "https://i.pinimg.com/550x/1b/70/c2/1b70c2e8cd1d78a079d518e6d23e5b97.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
