const imgStashPlusSolid = "/icons/e28b8423897034bc83c4d67baaf1d5c49f0ddb20.svg";
const threeDots = "/icons/Group.svg";
const AppIntegration = ({ className }: { className: string }) => {
    const integrations = [
        {
          id: 1,
          name: "Google Meet",
          description: "Conduct calls and meetings online",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
          <path d="M13.5762 9.98332L15.9159 12.6873L19.0623 14.72L19.6096 10.0004L19.0623 5.38721L15.8556 7.17289L13.5762 9.98332Z" fill="#00832D"/>
          <path d="M0 14.2806V18.3024C0 19.2206 0.73725 19.9662 1.64569 19.9662H5.6235L6.44719 16.9275L5.6235 14.2806L2.89444 13.4478L0 14.2806Z" fill="#0066DA"/>
          <path d="M5.6235 0L0 5.68569L2.89462 6.51649L5.6235 5.68569L6.43219 3.07479L5.6235 0Z" fill="#E94235"/>
          <path d="M0 14.2823H5.62341V5.68555H0V14.2823Z" fill="#2684FC"/>
          <path d="M22.6549 2.4076L19.0625 5.38731V14.72L22.6697 17.7113C23.2097 18.139 23.9997 17.7492 23.9997 17.0552V3.05044C23.9997 2.34873 23.1909 1.96087 22.6548 2.40769" fill="#00AC47"/>
          <path d="M13.5766 9.98291V14.2804H5.62305V19.966H17.4172C18.3256 19.966 19.0628 19.2204 19.0628 18.3022V14.7196L13.5766 9.98291Z" fill="#00AC47"/>
          <path d="M17.4172 0H5.62305V5.68569H13.5766V9.98313L19.0629 5.38692V1.66398C19.0629 0.745498 18.3256 9.47867e-05 17.4172 9.47867e-05" fill="#FFBA00"/>
          </svg>,
          count: 3,
          bgColor: "bg-teal-600",
        },
        {
          id: 2,
          name: "Slack",
          description: "Communicate with the team",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5.10938 15.1346C5.10938 16.509 3.9885 17.6316 2.61394 17.6316C1.23937 17.6316 0.117188 16.509 0.117188 15.1346C0.117188 13.7603 1.23975 12.6377 2.61412 12.6377H5.10956L5.10938 15.1346ZM6.36731 15.1346C6.36731 13.7603 7.48987 12.6377 8.86425 12.6377C10.2386 12.6377 11.3612 13.7601 11.3612 15.1346V21.3849C11.3612 22.7593 10.2388 23.8819 8.86425 23.8819C7.48987 23.8819 6.36731 22.7593 6.36731 21.3849V15.1346Z" fill="#DE1C59"/>
          <path d="M8.86425 5.11035C7.48987 5.11035 6.36731 3.98948 6.36731 2.61491C6.36731 1.24035 7.48987 0.118164 8.86425 0.118164C10.2386 0.118164 11.3612 1.24073 11.3612 2.6151V5.11054L8.86425 5.11035ZM8.86425 6.36829C10.2386 6.36829 11.3612 7.49085 11.3612 8.86523C11.3612 10.2396 10.2388 11.3622 8.86425 11.3622H2.61394C1.23956 11.3622 0.117188 10.2398 0.117188 8.86523C0.117188 7.49085 1.23975 6.36829 2.61412 6.36829H8.86425Z" fill="#35C5F0"/>
          <path d="M18.8905 8.86523C18.8905 7.49085 20.0114 6.36829 21.3859 6.36829C22.7605 6.36829 23.8829 7.49085 23.8829 8.86523C23.8829 10.2396 22.7603 11.3622 21.3859 11.3622H18.8905V8.86523ZM17.6325 8.86523C17.6325 10.2396 16.51 11.3622 15.1356 11.3622C13.7612 11.3622 12.6387 10.2398 12.6387 8.86523V2.61491C12.6387 1.24054 13.761 0.118164 15.1356 0.118164C16.51 0.118164 17.6325 1.24073 17.6325 2.6151V8.86523Z" fill="#2EB57D"/>
          <path d="M15.1356 18.8895C16.51 18.8895 17.6325 20.0104 17.6325 21.3849C17.6325 22.7595 16.51 23.8819 15.1356 23.8819C13.7612 23.8819 12.6387 22.7593 12.6387 21.3849V18.8895H15.1356ZM15.1356 17.6316C13.7612 17.6316 12.6387 16.509 12.6387 15.1346C12.6387 13.7603 13.761 12.6377 15.1356 12.6377H21.3859C22.7603 12.6377 23.8829 13.7601 23.8829 15.1346C23.8829 16.509 22.7603 17.6316 21.3859 17.6316H15.1356Z" fill="#EBB02E"/>
        </svg>,
          count: 15,
          bgColor: "bg-sky-600",
        },
        {
          id: 3,
          name: "Figma",
          description: "Lorem ipsum is a dummy text to fill..",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 3H12V9H9C8.20435 9 7.44129 8.68393 6.87868 8.12132C6.31607 7.55871 6 6.79565 6 6C6 5.20435 6.31607 4.44129 6.87868 3.87868C7.44129 3.31607 8.20435 3 9 3Z" fill="#F4511E"/>
          <path d="M15 9H12V3H15C15.7956 3 16.5587 3.31607 17.1213 3.87868C17.6839 4.44129 18 5.20435 18 6C18 6.79565 17.6839 7.55871 17.1213 8.12132C16.5587 8.68393 15.7956 9 15 9Z" fill="#FF8A65"/>
          <path d="M12 12C12 13.6569 13.3431 15 15 15C16.6569 15 18 13.6569 18 12C18 10.3431 16.6569 9 15 9C13.3431 9 12 10.3431 12 12Z" fill="#29B6F6"/>
          <path d="M9 9H12V15H9C8.20435 15 7.44129 14.6839 6.87868 14.1213C6.31607 13.5587 6 12.7956 6 12C6 11.2044 6.31607 10.4413 6.87868 9.87868C7.44129 9.31607 8.20435 9 9 9Z" fill="#7C4DFF"/>
          <path d="M9 15H12V18C12 18.7956 11.6839 19.5587 11.1213 20.1213C10.5587 20.6839 9.79565 21 9 21C8.20435 21 7.44129 20.6839 6.87868 20.1213C6.31607 19.5587 6 18.7956 6 18C6 17.2044 6.31607 16.4413 6.87868 15.8787C7.44129 15.3161 8.20435 15 9 15Z" fill="#00E676"/>
        </svg>,
          count: 1,
          bgColor: "bg-slate-500",
        },
      ];

    return (
        <div className={`flex flex-col gap-4 mt-4 bg-white w-full h-full rounded-2xl shadow-sm ${className} p-6`}>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <div className="text-[20px]">App Integration</div>
                    <span className="text-[14px] text-[#999999]">Connect integrations with other services to be faster</span>
                </div>
                <div className="bg-[#06263d] w-6 h-6 rounded-full flex items-center justify-center">
                    <img alt="add" className="w-4 h-4" src={imgStashPlusSolid} />
                </div>
            </div>
             {/* Cards */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {integrations.map((app) => (
          <div
            key={app.id}
            className={`${app.bgColor} rounded-2xl p-4 flex flex-col justify-between w-48 min-w-[12rem] relative`}
          >
            {/* Icon + Badge */}
            <div className="flex justify-between items-start">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  {app.icon}
                </div>
                <span className="absolute -top-1 -right-1 bg-slate-800 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {app.count}
                </span>
              </div>
              <img alt="threeDots" className="w-4 h-4" src={threeDots} />
            </div>

            {/* Text */}
            <div className="mt-4">
              <h3 className="text-white font-semibold">{app.name}</h3>
              <p className="text-white text-sm opacity-80 mt-1">{app.description}</p>
            </div>
          </div>
        ))}

        {/* Empty card for add new */}
        <div className="bg-gray-50 rounded-2xl w-48 min-w-[12rem] shadow-inner"></div>
      </div>
        </div>
    )
}

export default AppIntegration;