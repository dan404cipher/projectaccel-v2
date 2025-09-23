const StatsCard=({title='Unknown',value=0,subtitle=null})=>{
    return(
        <div className="bg-white h-24 sm:h-32 lg:h-[140px] w-full rounded-2xl sm:rounded-3xl shadow-[0px_9px_20px_0px_rgba(46,35,94,0.07)] flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4">
        <h3 className="text-sm sm:text-base lg:text-[20px] font-semibold text-[#333333] text-center">{title}</h3>
        <div className="text-lg sm:text-xl lg:text-[20px] font-bold text-[#06263D]">{value}</div>
       { subtitle && <p className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#999999] text-center">{subtitle}</p>}
      </div>
    )
};

export default StatsCard;