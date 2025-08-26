import dayjs from "dayjs";
const ActiveSprintCalender = ({ viewMode = "month" }: { viewMode?: "month" | "week" | "day" }) => {
    const weeks = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];

    const today = dayjs();
    console.log(today.format("DD-MM-YYYY"));
    const startOfMonth = today.startOf('month');
    const endOfMonth = today.endOf('month');
    const daysInMonth = endOfMonth.date();
    const monthDays = Array.from({ length: daysInMonth }, (_, i) =>
        startOfMonth.add(i, "day")
    );

    const startDayOfWeek = startOfMonth.day(); // 0 = Sunday, 1 = Monday, etc.
    const emptyCells = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; // Convert to Monday = 0

    // Get previous month's days to fill empty cells
    const prevMonthDays = Array.from({ length: emptyCells }, (_, i) =>
        startOfMonth.subtract(emptyCells - i, "day")
    );
    return (
        <div className="flex bg-white w-full h-full rounded-2xl">
            {
                viewMode === "month" && (
                    <div className="grid grid-cols-7 w-full h-full">
                        {
                            weeks.map((week, index) => (
                                <div key={index} className={`flex items-center border-b  h-fit justify-center px-10 py-5 text-[#06263D] border-slate-300 ${index !== weeks.length - 1 ? 'border-r' : ''}`}>
                                    <span>{week}</span>
                                </div>
                            ))
                        }
                        {/* Previous month's days */}
                        {prevMonthDays.map((day, i) => (
                            <div key={`prev-${i}`} className={`flex px-2 py-2 text-gray-400 border-slate-300 border-t ${i % 7 !== 6 ? 'border-r' : ''}`}>
                                <span>{day.format('MMM D')}</span>
                            </div>
                        ))}
                        {
                            monthDays.map((day, index) => (
                                <div key={index} className={`flex items-center justify-center p-2 text-[#06263D] border-slate-300 border-t ${(emptyCells + index) % 7 !== 6 ? 'border-r' : ''}`}>
                                    <span>{day.format('DD')}</span>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                viewMode === "week" && (
                    <div className=" w-full flex flex-col">
                        <div className={`grid w-full h-fit ${viewMode === "week" ? 'grid-cols-8' : 'grid-cols-7'}`}>
                            <div className="flex items-center justify-center bg-violet-300 py-5 text-[#06263D] border-slate-300">
                                <span>Hrs</span>
                            </div>
                            {
                                weeks.map((week, index) => (
                                    <div key={index} className={`flex items-center justify-center bg-violet-400 py-5 text-[#06263D] border-slate-300 ${index !== weeks.length - 1 ? 'border-r' : ''}`}>
                                        <span>{week}</span>
                                    </div>
                                ))
                            }
                        </div>
                        <div className=" bg-violet-500 w-full h-full">s</div>
                    </div>
                )
            }
            {
                viewMode === "day" && (
                    <div className="grid grid-cols-7 w-full h-fit">
                        {
                            weeks.map((week, index) => (
                                <div key={index} className={`flex items-center justify-center px-10 py-5 text-[#06263D] border-slate-300 ${index !== weeks.length - 1 ? 'border-r' : ''}`}>
                                    <span>{week}</span>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
};

export default ActiveSprintCalender;