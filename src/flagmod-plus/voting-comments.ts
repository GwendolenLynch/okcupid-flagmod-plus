export class VotingComments {
    public static move(): void {
        const leftColumn = document.getElementById('left_column') as HTMLElement;
        const rightColumn = document.getElementById('right_column') as HTMLElement;
        const reportComments = rightColumn.querySelector('ul.comments') as HTMLElement;
        const voteComments = document.getElementById('voter_comments') as HTMLElement;

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
