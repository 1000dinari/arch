const comments = [
    {id:1, text:"bhosda"},
    {id:2, text:"lund"},
    {id:3, text:"gaand"}
];

const commentText = comments.filter(function(comment){
    return comment.id === 1 || 2;
})

console.log(commentText);