import { useEffect, useState } from "react"
import Adaptive from "../../components/adaptive/Adaptive";
import LikedGamesList from "../../components/likedGamesList/LikedGamesList";
import RecentGamesList from "../../components/recentGamesList/RecentGamesList";
import TopGamesList from "../../components/topGamesList/TopGamesList";
import SteamAPI from "../../network/Steam.api"
import './HomePage.css'

export default function HomePage(props) {

    // const [topGames, setTopGames] = useState([]);
    const [likedGames, setLikedGames] = useState([]);
    const [recentGames, setRecentGames] = useState(new Set());

    const {topGames} = props

//     useEffect(() => {
//         getTopGames()
//     }, []);

//     const getTopGames = async () => {
//         setTopGames(await SteamAPI.getTopGames())
//     };

    // console.log(topGames[0])

    const handleLike = (id) => {
        setLikedGames([...likedGames, topGames.find(el => el.game.appid === id)])
    }

    const handleUnlike = (id) => {
        setLikedGames(likedGames.filter(game => game.game.appid !== id));
    };

    const watchedGame = (id) => {
        setRecentGames(new Set([...recentGames, topGames.find(el => el.game.appid === id)]))
    };

    // console.log(recentGames)

    return (
        <Adaptive className="homepage" tagname={'section'} >
            <main className="home__topGames__list">
                <TopGamesList
                    games={topGames}
                    like={handleLike}
                    unlike={handleUnlike}
                    isLiked={likedGames}
                    watched={watchedGame}
                />
            </main>
            <aside className="home__aside__lists">
                <LikedGamesList games={likedGames} isEmpty={likedGames.length === 0} watched={watchedGame}/>
                <RecentGamesList games={recentGames} isEmpty={recentGames.size === 0} />
            </aside>
        </Adaptive>
    )
}