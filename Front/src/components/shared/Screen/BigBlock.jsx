import React from "react";
const BigBlock = ({info, onMatchSelect , onWatchLive}) => {
    if (!info) return null;
    return (
        
    <>
        <div>     
            <ScoreComp 
              info={info}
              onMatchSelect={(onMatchSelect) => console.log("Selected match:", onMatchSelect)}
              onWatchLive={() => console.log("Opening live stream...")}
            />
            <div className="h-20 w-[300px] bg-blue-200"></div>
        </div>
    </>

    )};

    const ScoreComp = ({info, onMatchSelect , onWatchLive}) => {
        return(
    <>
            <div className="bg-white p-4">
                <div
                className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer max-w-md mx-auto"
                onClick={() => onMatchSelect(info)}
            >
                
                <div className="flex justify-between items-center">
                    
                    <div
                        className="w-16 h-16 bg-cover bg-center rounded"
                        style={{ backgroundImage: `url("${info.image}")` }}
                    ></div>


                    <div className="flex flex-col flex-grow pl-4">
                        <div className="font-semibold text-sm md:text-base hover:underline">
                            {info.matchTitle}
                        </div>
                        <div className="text-xs text-gray-600">{info.venue}</div>
                        <div className="text-xs text-gray-500 mt-1">
                            {info.status === "Completed" && info.result ? info.result : info.status}
                        </div>
                    </div>


                    <div className="text-right">
                        <div className="font-semibold text-gray-700">{info.score || "--"}</div>
                        {info.overs && (
                            <div className="text-xs text-gray-500">{info.overs} overs</div>
                        )}
                    </div>
                </div>


                {info.status === "Live" && (
                    <button
                        className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                        onClick={(e) => {
                            e.stopPropagation();
                            onWatchLive();
                        }}
                    >
                        🔴 Watch Live
                    </button>
                )}
            </div>
            </div>
    </>
        )
    };

export default BigBlock;