"use strict";

const { green, red } = require("chalk");
const {
  db,
  models: { User, Project, List, Card, UserCards, UserProjects },
} = require("../server/db");

const users = [
  {
    firstName: "Erik",
    lastName: "Trejo",
    email: "erik@erik.com",
    password: "123",
    isAdmin: true,
    avatarURL: "/images/profilePic/erik.jpeg",
  },
  {
    firstName: "Matt",
    lastName: "Bruer",
    email: "matt@matt.com",
    password: "123",
    isAdmin: false,
    avatarURL: "/images/profilePic/matt.jpeg",
  },
  {
    firstName: "Jonatha",
    lastName: "Brooke",
    email: "jonatha@jonatha.com",
    password: "123",
    isAdmin: false,
    avatarURL: "/images/profilePic/jonatha.png",
  },
  {
    firstName: "Katie",
    lastName: "Crutchfield",
    email: "katie@katie.com",
    password: "123",
    isAdmin: false,
    avatarURL: "/images/profilePic/katie.jpeg",
  },
  {
    firstName: "Jerral",
    lastName: "Graham",
    email: "jerral@jerral.com",
    password: "123",
    isAdmin: false,
    avatarURL: "/images/profilePic/jerral.jpeg",
  },
  {
    firstName: "Peter",
    lastName: "Rodocker",
    email: "peter@peter.com",
    password: "123",
    isAdmin: false,
    avatarURL: "/images/profilePic/peter.jpeg",
  },
];

const projects = [
  {
    title: "Mad This Summer",
    complete: false,
    heading: "Artist: August Is Falling",
    subHeading: "Album: The Simple Plan"
  },
  {
    title: "Track List",
    complete: false,
    heading: "Artist: August Is Falling",
    subHeading: "Album: The Simple Plan"
  },
];

const lists = [
  {
    title: "Record",
    projectId: 1,
    listindex: 0,
  },
  {
    title: "Edit",
    projectId: 1,
    listindex: 1,
  },
  {
    title: "Finished",
    projectId: 1,
    listindex: 2,
  },
  {
    title: "To Record",
    projectId: 2,
    listindex: 0,
  },
  {
    title: "Recording",
    projectId: 2,
    listindex: 1,
  },
  {
    title: "Mixed",
    projectId: 2,
    listindex: 2,
  },
];

const cards = [
  {
    title: "Vocals",
    description: "TLM105, LA2A",
    complete: false,
    cardindex: 1,
    listId: 1,
  },
  {
    title: "BGV",
    description: "C1 into Warm Audio WA4, Distressor, Studer 800",
    complete: false,
    cardindex: 2,
    listId: 1,
  },
  {
    title: "AcGtr",
    description: "KM184 spaced pair",
    complete: true,
    cardindex: 3,
    listId: 1,
  },
  {
    title: "ElGtr1",
    description: "Direct through Slate TH-U",
    complete: true,
    cardindex: 0,
    listId: 1,
  },
  {
    title: "Drums",
    description: "Glyn John's technique. Sonar kit with Auto-Align",
    complete: false,
    cardindex: 1,
    listId: 2,
  },
  {
    title: "Bass",
    description: "Precision Bass through Avalon in VMR and VTM",
    complete: true,
    cardindex: 0,
    listId: 2,
  },
  {
    title: "Rhodes",
    description: "Blues Driver through Fender Deluxe",
    complete: false,
    cardindex: 0,
    listId: 3,
  },
  {
    title: "Organ",
    description: "Hammond C3 through Leslie 125",
    complete: true,
    cardindex: 1,
    listId: 3,
  },
  {
    title: "ElGtr2",
    description: "Les Paul - Crybaby Wah - Tube Screamer - Ampeg Reverberocket",
    complete: false,
    cardindex: 2,
    listId: 3,
  },


  {
    title: "Mad This Summer",
    description: "",
    complete: false,
    cardindex: 1,
    listId: 4,
  },
  {
    title: "August Is Falling",
    description: "",
    complete: false,
    cardindex: 0,
    listId: 4,
  },
  {
    title: "Btgg",
    description: "",
    complete: true,
    cardindex: 3,
    listId: 5,
  },
  {
    title: "The Simple Plan",
    description: "",
    complete: true,
    cardindex: 4,
    listId: 5,
  },
  {
    title: "Don't Click the Link",
    description: "",
    complete: false,
    cardindex: 1,
    listId: 5,
  },
  {
    title: "Too Much Time",
    description: "",
    complete: true,
    cardindex: 0,
    listId: 5,
  },
  {
    title: "All Roads",
    description: "",
    complete: false,
    cardindex: 2,
    listId: 5,
  },
  {
    title: "Is This All",
    description: "",
    complete: true,
    cardindex: 1,
    listId: 6,
  },
  {
    title: "Probably",
    description: "",
    complete: false,
    cardindex: 0,
    listId: 6,
  },
];

const seeduserCards = [
  {
    userId: 1,
    cardId: 1,
  },
  {
    userId: 2,
    cardId: 2,
  },
  {
    userId: 3,
    cardId: 3,
  },
  {
    userId: 4,
    cardId: 4,
  },
  // {
  //   userId: 5,
  //   cardId: 5,
  // },
  {
    userId: 6,
    cardId: 6,
  },
  {
    userId: 4,
    cardId: 7,
  },
  // {
  //   userId: 5,
  //   cardId: 8,
  // },
  {
    userId: 6,
    cardId: 9,
  },

  {
    userId: 1,
    cardId: 10,
  },
  {
    userId: 2,
    cardId: 11,
  },
  {
    userId: 3,
    cardId: 12,
  },
  {
    userId: 4,
    cardId: 13,
  },
  // {
  //   userId: 5,
  //   cardId: 14,
  // },
  {
    userId: 6,
    cardId: 15,
  },
  {
    userId: 4,
    cardId: 16,
  },
  // {
  //   userId: 5,
  //   cardId: 17,
  // },
  {
    userId: 6,
    cardId: 18,
  },
];

const seeduserProjects = [
  {
    userId: 1,
    projectId: 1,
  },
  {
    userId: 2,
    projectId: 1,
  },
  {
    userId: 3,
    projectId: 1,
  },
  {
    userId: 4,
    projectId: 1,
  },
  // {
  //   userId: 5,
  //   projectId: 1,
  // },
  {
    userId: 6,
    projectId: 1,
  },

  {
    userId: 1,
    projectId: 2,
  },
  {
    userId: 2,
    projectId: 2,
  },
  {
    userId: 3,
    projectId: 2,
  },
  {
    userId: 4,
    projectId: 2,
  },
  // {
  //   userId: 5,
  //   projectId: 2,
  // },
  {
    userId: 6,
    projectId: 2,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );
    await Promise.all(
      projects.map((project) => {
        return Project.create(project);
      })
    );
    await Promise.all(
      lists.map((list) => {
        return List.create(list);
      })
    );
    await Promise.all(
      cards.map((card) => {
        return Card.create(card);
      })
    );
    await Promise.all(
      seeduserCards.map((userC) => {
        return UserCards.create(userC);
      })
    );
    await Promise.all(
      seeduserProjects.map((userP) => {
        return UserProjects.create(userP);
      })
    );
  } catch (err) {
    console.error(err);
  }
};

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
