const comments = [
    {id:1, text:"bhosda"},
    {id:2, text:"lund"},
    {id:3, text:"gaand"}
];

const commentText = comments.map(function(comment){
    return comment.text;
})

console.log(commentText);