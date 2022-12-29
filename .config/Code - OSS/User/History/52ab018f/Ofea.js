const person = {
        firstName: 'Saurabh',
        lastName: 'Chaudhary',
        hobbies: ['football', 'sports', 'music'],
        address: {
                city: "zirakpur",
                state: "punjab",
                street:"vip road"
        }
}

for(let i of person.hobbies)
{
        console.log(i);
}