const imgMdiBugOutline = "/icons/cb2280d66195675cdb1a349a2b097f5c140ee578.svg";
const imgStashPlusSolid = "/icons/e28b8423897034bc83c4d67baaf1d5c49f0ddb20.svg";

const BugOverview = ({className}:{className?:string}) => {
  return (
    <div className={`bg-white rounded-2xl p-[1.5rem] shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium text-[#242424]">Bug overview</h3>
          <p className="text-sm text-[#999999] ">
            Connect integrations with other services to be faster
          </p>
        </div>
        <div className="bg-[#06263d] w-6 h-6 rounded-full flex items-center justify-center">
          <img alt="add" className="w-4 h-4" src={imgStashPlusSolid} />
        </div>
      </div>
      <div className="space-y-3 mt-[1.5rem]">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex gap-3 h-full">
            <div className="flex items-start gap-1 h-full mt-1">
              <div className="bg-[#263238] w-4 h-4 rounded-full flex items-center justify-center">
                <img alt="bug" className="w-2.5 h-2.5" src={imgMdiBugOutline} />
              </div>
              <p className="text-xs text-[#666666] mb-1">BG – 17</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium text-[#252525] mb-1">
                Login forgot password bugfix
              </h4>
              <div className="flex items-center gap-2 text-xs text-[#333333] mb-1">
                <span>Projects</span>
                <span className="font-semibold text-[#666666]">Hire-Accel Portal</span>
              </div>
            </div>
            <div className="flex flex-1 justify-evenly gap-3">
              <div className="text-center">
                <p className="text-xs text-[#4a4a4a] mb-1">Status</p>
                <div className="bg-[rgba(192,206,210,0.4)] h-4 rounded flex items-center px-2">
                  <span className="text-xs text-[#445256]">Open</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-[#4a4a4a] mb-1">Priority</p>
                <div className="bg-[rgba(192,206,210,0.4)] h-4 rounded flex items-center px-2">
                  <span className="text-xs text-[#445256]">Highest</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-[#4a4a4a] mb-1">Severity</p>
                <div className="bg-[rgba(192,206,210,0.4)] h-4 rounded flex items-center px-2">
                  <span className="text-xs text-[#445256]">Critical</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-[#4a4a4a] mb-1">Category</p>
                <div className="bg-[rgba(192,206,210,0.4)] h-4 rounded flex items-center px-2">
                  <span className="text-xs text-[#445256]">Functionality</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BugOverview;