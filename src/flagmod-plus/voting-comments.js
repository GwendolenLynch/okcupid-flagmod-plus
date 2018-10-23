
class VotingComments {
    static move() {
        const leftColumn = document.getElementById('left_column');
        const rightColumn = document.getElementById('right_column');
        const reportComments = rightColumn.querySelector('ul.comments');
        const voteComments = document.getElementById('voter_comments');

        if (reportComments) {
            rightColumn.removeChild(reportComments);
            leftColumn.appendChild(reportComments);
        }

        if (voteComments) {
            rightColumn.removeChild(voteComments);
            leftColumn.appendChild(voteComments);
        }
    }
}

export default VotingComments;
