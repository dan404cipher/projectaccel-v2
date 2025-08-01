import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, Search, Filter, Calendar as CalendarIcon } from 'lucide-react';

export default function ProjectCalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  // Sample project events/tasks
  const projectEvents = [
    {
      id: 1,
      title: "Sprint Planning Meeting",
      date: new Date(2024, 11, 15),
      type: "meeting",
      priority: "high",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Feature Development Deadline",
      date: new Date(2024, 11, 20),
      type: "deadline",
      priority: "high",
      color: "bg-red-500"
    },
    {
      id: 3,
      title: "Code Review Session",
      date: new Date(2024, 11, 18),
      type: "review",
      priority: "medium",
      color: "bg-yellow-500"
    },
    {
      id: 4,
      title: "UI/UX Design Review",
      date: new Date(2024, 11, 22),
      type: "review",
      priority: "medium",
      color: "bg-purple-500"
    }
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getEventsForDate = (date: Date) => {
    return projectEvents.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  return (
    <Layout>
      <div className="bg-[#f6f6f6] min-h-screen w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Project Calendar
              </h1>
              <p className="text-gray-600 mt-1">
                Track project milestones, deadlines, and team activities
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>
          </div>

          {/* Calendar Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-xl font-semibold text-gray-900 min-w-48 text-center">
                  {formatDate(currentDate)}
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
            </div>

            {/* View Mode Toggles */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['month', 'week', 'day'] as const).map((mode) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(mode)}
                  className="capitalize"
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Main Calendar */}
          <div className="flex-1">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentDate}
                  onMonthChange={setCurrentDate}
                  className="w-full"
                  components={{
                    Day: ({ date, ...props }) => {
                      const events = getEventsForDate(date);
                      const isToday = date.toDateString() === new Date().toDateString();
                      
                      return (
                        <div className="relative w-full h-full">
                          <button
                            {...props}
                            className={`
                              w-full h-16 p-1 border border-gray-200 text-left hover:bg-gray-50
                              ${isToday ? 'bg-blue-50 border-blue-200' : ''}
                              ${selectedDate?.toDateString() === date.toDateString() ? 'bg-blue-100' : ''}
                            `}
                          >
                            <div className="text-sm font-medium text-gray-900 mb-1">
                              {date.getDate()}
                            </div>
                            <div className="space-y-1">
                              {events.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={`text-xs px-1 py-0.5 rounded text-white truncate ${event.color}`}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {events.length > 2 && (
                                <div className="text-xs text-gray-500">
                                  +{events.length - 2} more
                                </div>
                              )}
                            </div>
                          </button>
                        </div>
                      );
                    }
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Selected Date Events */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'Select a date'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-3">
                    {getEventsForDate(selectedDate).map((event) => (
                      <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${event.color}`} />
                          <span className="font-medium text-sm">{event.title}</span>
                        </div>
                        <div className="text-xs text-gray-600 capitalize">
                          {event.type} • {event.priority} priority
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    {selectedDate ? 'No events for this date' : 'Select a date to view events'}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {projectEvents
                    .filter(event => event.date >= new Date())
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .slice(0, 5)
                    .map((event) => (
                      <div key={event.id} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${event.color}`} />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{event.title}</div>
                          <div className="text-xs text-gray-500">
                            {event.date.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                        <div className={`
                          text-xs px-2 py-1 rounded-full capitalize
                          ${event.priority === 'high' ? 'bg-red-100 text-red-700' : 
                            event.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-gray-100 text-gray-700'}
                        `}>
                          {event.priority}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Set Deadline
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Search className="w-4 h-4 mr-2" />
                  View All Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
} 