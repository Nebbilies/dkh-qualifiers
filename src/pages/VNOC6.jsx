import {useCallback, useEffect, useState, useReducer} from 'react'
import {motion} from 'motion/react'
import data from '/data/vnoc6.json'
import playerData from '/data/vnoc6_seed.json'
import logo from '/src/assets/vnoc6/logo.png'
import logotext from '/src/assets/vnoc6/logotext.png'
import logomicouter from '/src/assets/vnoc6/logomicouter.png'
import logomicinner from '/src/assets/vnoc6/logomicinner.png'

//input score, add , each 3 digits
const formatScore = (score) => {
    const scoreString = score.toString();
    return scoreString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//add 0 before number
const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
}

const fadeIn = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0},
    exit: { opacity: 0, y: 5},
}

const calculateMapSeed = (scoreData) => {
    let seed = 1;
    data.scores.forEach((item) => {
        if (scoreData.map === item.map && item.score > scoreData.score) {
            seed++;
        }
    })
    return seed;
}

const mappool = ['NM1', 'NM2', 'NM3', 'NM4', 'HD1', 'HD2', 'HR1', 'HR2', 'DT1', 'DT2', 'DT3']

function VNOC6() {
    const [seed, setSeed] = useState(20)
    const [playerStats, setPlayerStats] = useState({ id: 0, avgScore: 0, avgAccuracy: 0, vnoc5Seed: 0, sipRating: 0 });
    const [seedData, setSeedData] = useState([{'username': '', 'teamAvatar': '', 'userId': '', 'rank': '', 'score': 0, 'accuracy': 0, 'map': ''}]);
    const handleKeyPress = useCallback((event) => {
        if (event.key === 'a' || event.key === 'ArrowLeft') {
            setSeed((prevSeed) => prevSeed !== 1 ? prevSeed - 1 : prevSeed);
        } else if (event.key === 'd' || event.key === 'ArrowRight') {
            setSeed((prevSeed) => prevSeed !== 20 ? prevSeed + 1 : prevSeed);
            //hardcode vai l
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

    useEffect(x => {
        setSeedData([])
        let currentSeedData = [];
        const playerId = playerData.players.find((player) => player.seed === seed).id;
        const vnoc5Seed = playerData.players.find((player) => player.seed === seed).vnoc5;
        const sipRating = playerData.players.find((player) => player.seed === seed).sip;
        mappool.forEach(slot => {
            data.scores.forEach((result) => {
                if (result.map === slot && result.userID === playerId) {
                    currentSeedData.push(result);
                }
            })
        })
        if (currentSeedData) {
            setSeedData(currentSeedData);
        } else {
            setSeedData([]);
        }
        setPlayerStats({
            id: playerId,
            avgScore: currentSeedData.reduce((avg, score) => avg + score.score, 0) / currentSeedData.length || 0,
            avgAccuracy: Math.round(currentSeedData.reduce((avg, score) => avg + parseInt(score.accuracy.substring(0, 4)), 0) / currentSeedData.length * 100) / 100 || 0,
            vnoc5Seed: vnoc5Seed ? vnoc5Seed : 0,
            sipRating: sipRating
        });
    }, [seed]);

    return (
        <main className={'p-[50px] border-black w-[1920px] h-[1080px] flex flex-col bg-[#1F0D0C]'}>
            <div className='info-container flex w-full h-[864px] gap-[40px]'>
                <div className={"w-[610px] flex flex-col h-full text-white"}>
                    <motion.div key={seed} className={'w-full h-[342px] bg-[#FFA2A2] rounded-[10px] flex flex-col items-center p-[30px]'}>
                        <motion.div className={'font-extrabold text-[#381717] text-[40px] mb-[29px] h-[41px] self-start'}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, delay: 2 }}>
                            {seedData[0].username}
                        </motion.div>
                        <div className={'w-full border-[4px] border-[#753836] rounded-[8px] h-0 mb-[27px]'}>
                        </div>
                        <motion.div className={'flex flex-row w-full h-[180px] self-start gap-[20px]'}
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, delay: 2 }}>
                            <motion.img key={seedData[0].username} src={seedData[0].teamAvatar}
                                        className={'w-[180px] h-[180px] rounded-[5px] border-[4px] border-[#753836] self-start'}
                            />
                            <div className={'flex flex-col'}>
                                <div
                                    className={'h-[60px] rounded-l-[50px] w-[380px] pr-[-30px] bg-[#753836] text-white font-extrabold text-[40px] pl-[45px] mb-[12px]'}>
                                    SEED #{seed}
                                </div>
                                <div className={'inline-block font-bold text-[22px] text-[#381717]'}>
                                    Average score:
                                </div>
                                <div className={'inline-block font-extrabold text-[52px] text-[#381717] leading-none'}>
                                    {formatScore(Math.round(playerStats.avgScore))}
                                </div>
                                <div className={'inline-block font-bold text-[16px] text-[#381717]'}>
                                    Average accuracy: <span className={'font-extrabold'}>{playerStats.avgAccuracy}%</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                    <div className={'w-full flex h-[50px] mt-[20px] gap-[20px]'}>
                        <div
                            className={'w-[270px] h-[50px] bg-[#F3F3F3] rounded-[8px] font-extrabold text-[20px] text-[#323232] flex items-center justify-between px-[28px] tracking-wide'}>
                            <span>VNOC5 SEED</span>
                            <span>#{formatNumber(playerStats.vnoc5Seed)}</span>
                        </div>
                        <div
                            className={'w-[320px] h-[50px] bg-[#DAFFCA] rounded-[8px] font-extrabold text-[20px] text-[#304029] flex items-center justify-between px-[28px] tracking-wide leading-none'}>
                                <span>SIP RATING <span className={'opacity-60 italic text-[15px]'}>(!sip)</span> </span>
                            <span>{formatNumber(playerStats.sipRating)}</span>
                        </div>
                    </div>
                    <div className={'mt-[24px] w-full flex items-center'}>
                        {Array(24).fill().map((_, index) => (
                            <div key={index} className={`border-[2px] border-[#FFA2A2] ${index !== 0 ? 'ml-[24px]' : ''}`}>
                                </div>
                        ))}
                    </div>
                    <div className={'w-full h-[408px] rounded-[10px] bg-[#0F0606] mt-[20px]'}>

                    </div>
                </div>
                <div className={'maps-info w-[1170px] flex flex-col gap-[16px] h-full '}>
                    {seedData.map((score, index) => (
                        <div key={score.score}
                             className={"w-full h-[64px] bg-[rgba(0,0,0,0)] gap-[20px] flex items-center"}>
                            <div className={'flex flex-row w-[1030px] rounded-[5px] p-[6px] h-full' +
                                `${score.map.substring(0, 2) === 'NM' ? ' bg-[#65A8FF]' : score.map.substring(0, 2) === 'HD' ? ' bg-[#FFDB65]' : score.map.substring(0, 2) === 'HR' ? ' bg-[#FF6A65]' : score.map.substring(0, 2) === 'DT' ? ' bg-[#CC65FF]' : ''}`}>
                                <a alt="map bg" className={'object-cover h-full w-[190px] rounded-[5px]'}/>
                                <div className={'maps-info-details flex flex-col w-[778px] h-full ml-[10px]'}>
                                    <div
                                        className={'maps-info-details-name inline-block text-[#387478] font-bold text-[22px]'}>
                                        ‎
                                    </div>
                                    <motion.div
                                        className={'maps-info-details-scores inline-block font-bold text-[16px] -mt-1.5 text-[#243642]' +
                                                    `${score.map.substring(0, 2) === 'NM' ? ' text-[#31598C]' : score.map.substring(0, 2) === 'HD' ? ' text-[#8C7731]' : score.map.substring(0, 2) === 'HR' ? ' text-[#8C3431]' : score.map.substring(0, 2) === 'DT' ? ' text-[#6E318C]' : ''}`}
                                        variants={fadeIn}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{duration: 0.3, delay: 0.5 + 0.1 * index}}
                                    >
                                        Score: <span className={'font-extrabold'}>{formatScore(score.score)}</span> · Accuracy: <span className={'font-extrabold'}>{score.accuracy}</span> · Max combo: <span className={'font-extrabold'}>{score.maxcombo}x</span>
                                    </motion.div>
                                </div>
                                <div className={'self-end flex h-full items-center leading-none text-[26px] font-black pr-[17px]' +
                                `${score.map.substring(0, 2) === 'NM' ? ' text-[#1D2F46]' : score.map.substring(0, 2) === 'HD' ? ' text-[#463C1D]' : score.map.substring(0, 2) === 'HR' ? ' text-[#461E1D]' : score.map.substring(0, 2) === 'DT' ? ' text-[#381D46]' : ''}`}>
                                   {score.map}
                                </div>
                            </div>

                            <div
                                className={'maps-info-map-scores flex justify-between items-center bg-[rgba(0,0,0,0)] h-full w-[120px] rounded-[5px] border-[4px]' +
                                    `${score.map.substring(0, 2) === 'NM' ? ' border-[#43689B]' : score.map.substring(0, 2) === 'HD' ? ' border-[#9B8643]' : score.map.substring(0, 2) === 'HR' ? ' border-[#9B4643]' : score.map.substring(0, 2) === 'DT' ? ' border-[#7E439B]' : ''}`}>
                                <div
                                    className={'map-score-font font-bold text-[37px] ml-[11px] h-full flex items-center'
                                + `${score.map.substring(0, 2) === 'NM' ? ' text-[#A2C9FF]' : score.map.substring(0, 2) === 'HD' ? ' text-[#FFE9A2]' : score.map.substring(0, 2) === 'HR' ? ' text-[#FFA5A2]' : score.map.substring(0, 2) === 'DT' ? ' text-[#E0A2FF]' : ''}`}>
                                    #{calculateMapSeed(score)}
                                </div>
                                <div className={'text-end text-[13px] self-end mr-[6px] mb-[4px]'}>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={'flex items-center mt-[30px]'}>
                <div className={'flex items-center'}>
                </div>
                <div className={'w-[240px] h-[86px] rounded-[10px] bg-transparent ml-[279px]'}> 
                </div>
                <img src={logomicouter} className={'absolute left-[1769px]'} alt={'logomic'}/>
                <img src={logomicinner} className={'absolute left-[1797px]'} alt={'logomic'}/>
            </div>
        </main>
    )
}

export default VNOC6