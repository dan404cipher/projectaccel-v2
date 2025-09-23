const imgSvg5 = "/icons/8195f6590487dccda43e1e1714733a9cd7d8479e.svg";
const imgSvg6 = "/icons/a28adb31099ee707512b5c31ffcc447b465cb104.svg";

export const RecentActivity=({className}:{className:string})=>{
    return(
        <div className={`bg-white rounded-2xl p-4 shadow-sm ${className}`}>
        <h3 className="text-lg font-medium text-[#242424] mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            {
              user: 'AC',
              name: 'Alex Chen',
              color: '#67909b',
              action: 'Payment Integration Completed',
              priority: 'high',
              priorityColor: '#ef4343',
              description: 'Successfully integrated Stripe payment gateway with error handling and webhook support',
              time: '6 mins ago'
            },
            {
              user: 'SJ',
              name: 'Sarah Johnson',
              color: '#679b7c',
              action: 'API Rate Limit Risk Identified',
              priority: 'medium',
              priorityColor: '#f59f0a',
              description: 'Third-party API may hit rate limits during peak usage. Need to implement caching strategy.',
              time: '6 mins ago'
            },
            {
              user: 'SJ',
              name: 'Sarah Johnson',
              color: '#7b679b',
              action: 'API Rate Limit Risk Identified',
              priority: 'medium',
              priorityColor: '#f59f0a',
              description: 'Third-party API may hit rate limits during peak usage. Need to implement caching strategy.',
              time: '6 mins ago'
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-xl">
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: activity.color }}
                >
                  {activity.user}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2">
                    <img alt="activity" className="w-3.5 h-3.5" src={index === 0 ? imgSvg5 : imgSvg6} />
                    <span className="text-sm font-medium text-[#333333]">{activity.action}</span>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-xs font-bold text-white`} style={{ backgroundColor: activity.priorityColor }}>
                    {activity.priority}
                  </div>
                </div>
                <p className="text-xs text-zinc-500 mb-1">{activity.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#333333]">By {activity.name}</span>
                  <span className="text-xs text-[#999999]">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}