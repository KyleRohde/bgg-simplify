function RecentPlay({ recentPlay }) {
    let gameName = recentPlay.item[0].$.name;
    let numPlays = recentPlay.$.quantity;
    let datePlayed = recentPlay.$.date;
    return (
        <>
            <h1>Recent Play</h1>
            <div>{gameName} was played {numPlays} time{parseInt(numPlays) !== 1 ? 's' : ''} on {datePlayed}</div>
        </>
    );
}

export default RecentPlay;

export async function getStaticProps() {
    let bggRequest = await fetch("https://boardgamegeek.com/xmlapi2/plays?username=Kiyosek");
    let data = await bggRequest.text();

    let parser = require('xml2js').parseString;
    let mostRecentPlay = null;
    parser(data, (error, result) => {
        mostRecentPlay = result.plays.play[0];
    });

    return {
        props: {
            recentPlay: mostRecentPlay
        }
    };
}