const user = [
    {
        name: "Meet Chauhan",
        email: "meet@gmail.com",
        phone: 4563215789,
        gender: "male",
        isStudent: true,
        age: 20
    },
    {
        name: "Rahul Patel",
        email: "rahul@gmail.com",
        phone: 9876543210,
        gender: "male",
        isStudent: false,
        age: 22
    }

]

console.log(typeof(user))

// to access spacific value
console.log(user)
console.log(user[0].phone)
console.log(user[1]["phone"])

// to add new new value
user.city = "surat"
console.log(user)

// to delete spacific value
delete user.email
console.log(user)