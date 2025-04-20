import {useCallback, useEffect, useState} from 'react'
import data from '/data/info.json'

//input score, add , each 3 digits
const formatScore = (score) => {
    const scoreString = score.toString();
    return scoreString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//add 0 before number
const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
}

function Home() {
    const [seed, setSeed] = useState(1)
    const [seedData, setSeedData] = useState({scores: [], players: []})
    const handleKeyPress = useCallback((event) => {
        if (event.key === 'a') {
                setSeed((prevSeed) => prevSeed !== 1 ? prevSeed - 1 : prevSeed);
        } else if (event.key === 'd') {
                setSeed((prevSeed) => prevSeed !== data.length ? prevSeed + 1 : prevSeed);
        }
        console.log('hi')
    }, []);
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    useEffect(() => {
        const currentSeedData = data.find((item) => item.seed === seed);
        console.log(currentSeedData);
        if (currentSeedData) {
            setSeedData(currentSeedData);
        } else {
            setSeedData({});
        }
    }, [seed]);

    return (
        <main className={'p-[48px] border-black w-[1920px] h-[1080px] flex flex-col bg-[#243642]'}>
            <div className='info-container flex w-full h-[864px] gap-[40px]'>
                <div className={"w-[610px] flex flex-col h-full text-white"}>
                    <div className={'w-full h-[160px] bg-[#89d6c0] rounded-t-[15px] flex items-center p-[20px]'}>
                        <img src='/placeholder.jpg' className={'w-[120px] h-[120px] rounded-md border-[4px] border-[#243642]'} alt='team logo'/>
                        <div className={'ml-[19px] w-[431px] text-wrap max-w-[431px]'}>
                            <span className={'font-bold text-[48px] text-[#243642] text-left break-all leading-10 overflow-hidden'}>
                                Stars Of Lyra
                            </span>
                        </div>
                    </div>
                    <div className={'w-full flex flex-col h-[400px] bg-[#e2f1e7] rounded-b-[15px] mt-[6px] pt-[14px] pb-[25px] pl-[24px] pr-[24px]'}>
                        {seedData.players.map((player, index) => (
                            <div key={player.index} className={'flex flex-row items-center h-[90px] mb-[19px]'}>
                                <img src={`https://a.ppy.sh/${player.userId}`} alt="player avatar" className={'w-[90px] h-[90px] rounded-md border-4 border-[#243642]'}/>
                                <div className={'flex justify-between w-full'}>
                                    <div className={'flex flex-col ml-[15px] justify-center h-full'}>
                                        <span
                                            className={'text-[#243642] font-medium italic text-[26px]'}>#{formatScore(player.rank)}</span>
                                        <span
                                            className={'text-[#243642] font-bold text-[28px]'}>{player.username}</span>
                                    </div>
                                    <div className={'flex flex-col h-full text-[#243642] text-end'}>
                                        <span className={'text-[12px] font-medium'}>avg. score</span>
                                        <span
                                            className={'text-[18px] font-bold -mt-1'}>{formatScore(player.stats.score)}</span>
                                        <span className={'text-[12px] font-medium -mt-1'}>avg. acc</span>
                                        <span
                                            className={'text-[18px] font-bold -mt-1'}>{player.stats.accuracy}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className={'seed-info flex flex-row self-end text-[#FF5D5D]'}>
                            <span className={'font-semibold text-[39px]'}>SEED</span>
                            <span className={'font-extrabold text-[39px] ml-[10px]'}>
                                {seed < 10 ? `0${seed}` : seed}
                            </span>
                        </div>
                    </div>
                    <div className={'w-full h-[265px] rounded-[20px] bg-[#17222a] mt-[33px]'}>

                    </div>
                </div>
                <div className={'maps-info w-[1170px] flex flex-col gap-[16px] h-full text-white'}>
                    {seedData.scores.map((score, index) => (
                        <div key={index} className={"flex flex-row w-full h-[64px] rounded-lg bg-[#e2f1e7] p-[8px]"}>
                            <img src="/placeholder.jpg" alt="map bg" className={'object-cover h-full w-[190px] rounded-[5px]'}/>
                            <div className={'maps-info-details flex flex-col w-[778px] h-full ml-[15px]'}>
                                <div className={'maps-info-details-name inline-block text-[#387478] font-bold text-[22px]'}>
                                    San-Z - Original Me
                                </div>
                                <div className={'maps-info-details-scores inline-block font-bold text-[18px] -mt-1 text-[#243642]'}>
                                    {`${score.players[0].username} • ${formatScore(score.players[0].score)} • ${score.players[0].accuracy}% • ${score.players[1].username} • ${formatScore(score.players[1].score)} • ${score.players[1].accuracy}%`}
                                </div>
                            </div>
                            <div className={'maps-info-map-scores flex justify-between items-center bg-[#387478] h-full w-[160px] ml-[9px] rounded-lg'}>
                                <div className={'map-score-font text-white font-bold text-[37px] ml-[11px] h-full flex items-center'}>
                                    #{score.rank}
                                </div>
                                <div className={'text-end text-[13px] self-end mr-[6px] mb-[4px]'}>
                                    {formatScore(score.players[0].score + score.players[1].score)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Home