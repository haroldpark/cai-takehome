// Instructions:
// Given the pre-written code in this file, please write an implementation
// of the sendAverageNotifications function where indicated by the TODO comment
// below. The function you write should find the average high score of all
// the users in both groups and then send a notification to each user containing
// a message that indicates their score and whether it is equal to, above or below
// the average.
const getUsersFromA = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { userId: 1, highScore: 73 },
        { userId: 2, highScore: 63 },
        { userId: 3, highScore: 95 },
      ]);
    }, 1000);
  });
};
const getUsersFromB = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { userId: 4, highScore: 51 },
        { userId: 5, highScore: 85 },
      ]);
    }, 1500);
  });
};
const sendNotification = (userId, message) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Notification sent to user ${userId}: ${message}`);
      resolve();
    }, 500);
  });
};
const sendAverageNotifications = async () => {
  try {
    // Find the average high score of all the users in both groups
    const usersA = await getUsersFromA();
    const usersB = await getUsersFromB();
    const allUsers = [...usersA, ...usersB];
    const avgHighScore =
      allUsers.map((user) => user.highScore).reduce((a, b) => a + b) /
      allUsers.length;

    // send a notification to each user containing a message that indicates
    // their score and whether it is equal to, above or below the average.
    for (let i = 0; i < allUsers.length; i++) {
      const { userId, highScore } = allUsers[i];
      const result =
        avgHighScore == highScore
          ? "equal"
          : avgHighScore < highScore
          ? "higher"
          : "lower";
      await sendNotification(
        userId,
        `Hello user ${userId}, your score of ${highScore} was ${result} than the average score of ${avgHighScore}`
      );
    }
    return avgHighScore;
  } catch (error) {
    console.log("There was an error ");
  }
};
(async () => {
  const p1 = performance.now();
  try {
    const average = await sendAverageNotifications();
    console.log(`average = ${average}`);
  } catch (e) {
    console.error(e);
  } finally {
    const p2 = performance.now();
    console.log(`took ${(p2 - p1) / 1000} seconds`);
  }
})();
