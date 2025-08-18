const imgWpfFuture = "/icons/01a06071bb00def338f2533eed5ebf44a16d3045.svg";
const imgCarbonInProgress = "/icons/3b16109919bcae82cf9ff5f486a76d077ae275f0.svg";
const imgSvg5 = "/icons/8195f6590487dccda43e1e1714733a9cd7d8479e.svg";

export const SprintOverview:React.FC=()=>{
    return(
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm h-full w-full">
        <h3 className="text-lg font-medium text-[#242424] mb-4">Sprint Overview</h3>
        <div className="space-y-3">
          {[
            { name: 'Scrum 24', subtitle: 'Payments', status: 'Planned', progress: 0, color: '#4e84b4' },
            { name: 'Scrum 23', subtitle: 'Payment Integration', status: 'Active', progress: 68, color: '#f59f0a' },
            { name: 'Scrum 22', subtitle: 'User Authentication', status: 'Completed', progress: 100, color: '#16a249' }
          ].map((sprint, index) => (
            <div key={index} className="bg-[#f9f9f9] rounded-xl p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img alt="sprint" className="w-3.5 h-3.5" src={index === 0 ? imgWpfFuture : index === 1 ? imgCarbonInProgress : imgSvg5} />
                  <div>
                    <span className="text-sm font-medium text-[#333333]">{sprint.name} </span>
                    <span className="text-xs text-[#666666]">{sprint.subtitle}</span>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-xs font-bold text-white`} style={{ backgroundColor: sprint.color }}>
                  {sprint.status}
                </div>
              </div>
              <p className="text-xs text-[#666666] mb-2">Jun 25, 2025 - Jul 30, 2025</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#ecf2f2] h-2 rounded-full">
                  <div className="bg-[#67909b] h-2 rounded-full" style={{ width: `${sprint.progress}%` }}></div>
                </div>
                <span className="text-xs text-zinc-500">{sprint.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}