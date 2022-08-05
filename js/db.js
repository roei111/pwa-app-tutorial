console.log(db)
db.collection("recipes").onSnapshot((snapshot) => {
  console.log(snapshot.docChanges());
});
