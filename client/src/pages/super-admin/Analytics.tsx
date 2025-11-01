const Analytics = () => {
  return (
    <div className="w-full max-w-full h-auto sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[831px] bg-white rounded-[15px] sm:rounded-[20px] md:rounded-[30px] lg:rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] border border-black/10 p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden">
      {/* Table Header */}
      <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="min-w-[900px] lg:min-w-full h-12 sm:h-14 lg:h-16 bg-slate-300 rounded-[15px] sm:rounded-[20px] md:rounded-[30px] lg:rounded-[40px] shadow-[0px_2px_4px_0px_rgba(6,38,61,0.10)] flex items-center text-gray-700 font-semibold">
          {/* Company name */}
          <div className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 lg:px-3 py-2 sm:py-3 text-left min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] flex-shrink-0">
            <input type="checkbox" className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-neutral-800 font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              Company name
            </span>
          </div>
          
          {/* Industry */}
          <div className="px-1.5 sm:px-2 lg:px-3 py-2 sm:py-3 text-center min-w-[100px] sm:min-w-[120px] flex-shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-neutral-800 font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              Industry
            </span>
          </div>
          
          {/* Admin Email */}
          <div className="px-1.5 sm:px-2 lg:px-3 py-2 sm:py-3 text-center min-w-[140px] sm:min-w-[160px] lg:min-w-[200px] flex-shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-neutral-800 font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              Admin Email
            </span>
          </div>
          
          {/* Plan Type */}
          <div className="px-1.5 sm:px-2 lg:px-3 py-2 sm:py-3 text-center min-w-[100px] sm:min-w-[120px] flex-shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-neutral-800 font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              Plan Type
            </span>
          </div>
          
          {/* Status */}
          <div className="px-1.5 sm:px-2 lg:px-3 py-2 sm:py-3 text-center min-w-[70px] sm:min-w-[80px] lg:min-w-[120px] flex-shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-neutral-800 font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              Status
            </span>
          </div>
          
          {/* Users */}
          <div className="px-1.5 sm:px-2 lg:px-3 py-2 sm:py-3 text-center min-w-[60px] sm:min-w-[70px] lg:min-w-[80px] flex-shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-neutral-800 font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              Users
            </span>
          </div>
          
          {/* Revenue */}
          <div className="px-1.5 sm:px-2 lg:px-3 py-2 sm:py-3 text-center min-w-[80px] sm:min-w-[90px] lg:min-w-[100px] flex-shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-neutral-800 font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              Revenue
            </span>
          </div>
          
          {/* Date joined */}
          <div className="px-1.5 sm:px-2 lg:px-3 py-2 sm:py-3 text-center min-w-[100px] sm:min-w-[110px] lg:min-w-[120px] flex-shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-neutral-800 font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              Date joined
            </span>
          </div>
          
          {/* Action */}
          <div className="px-1 sm:px-2 py-2 sm:py-3 text-center w-[3%] lg:w-auto lg:min-w-[60px] flex-shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-neutral-800 font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              Action
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="mt-2 sm:mt-3 border-t border-gray-200"></div>
    </div>
  );
};

export default Analytics;