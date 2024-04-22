"use client";

import clsx from "clsx";
import React from "react";
import { useGetAuth } from "@/api/auth";
import "react-day-picker/dist/style.css";
import { CalendarDays } from "lucide-react";
import { DayPicker } from "react-day-picker";
import TaskListByDate from "./task-list-bydate";
import { formatDate } from "@/lib/utils/format-date";
import { SpinnerIcon } from "@/components/icons/spinner";
import { NoCompletedTaskOnDate } from "./no-completed-task";
import TodoCompletedForm from "@/containers/activity/todo-completed-form";
import { useGetCompletedTasks, useGetCompletedTasksByDate } from "@/api/user";

const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 
    font-weight: bold;
    font-size: 120%; 
    color: "#6200EE"
    }
    .container {
      width: 280px
    }
`;

const CompletedActivities = () => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

  const todayDate = new Date();

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    weekDates.push(currentDate);
  }

  // state management
  const [showCalender, setShowCalender] = React.useState(false);

  // get dates
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(
    todayDate
  );
  const [seeAllTasks, setSeeAllTasks] = React.useState<boolean>(true);

  const closeCalender = () => {
    setShowCalender(false), setSeeAllTasks(false);
  };

  const CloseCalender = () => (
    <div
      className="text-end text-sm cursor-pointer pt-2 text-[#714EE7] font-bold"
      onClick={closeCalender}
    >
      Check date
    </div>
  );

  // api calls
  const { data, isLoading } = useGetCompletedTasksByDate(
    formatDate(selectedDay)
  );
  const {
    data: allCompleted,
    isLoading: allLoading,
    isFetching: allFetching,
  } = useGetCompletedTasks();
  const { data: user } = useGetAuth({ enabled: true });

  const dateString = user?.lastClaimTime;
  const date = new Date(dateString);

  if (allFetching || allLoading) {
    <SpinnerIcon />;
  }

  interface Task {
    id: number;
    image: string;
    name: string;
    description: string;
    type: string;
    completedDate: string;
    score: number;
    slug: string;
    reward: number;
    point: number;
    duration: number;
    createdAt: string;
    priority: boolean;
    ratings: number;
    ratingsLevel: string;
  }

  interface Reward {
    id: number;
    type: string;
    completedDate: string;
    image: string;
    name: string;
    description: string;
    score: number;
    slug: string;
    reward: number;
    point: number;
    duration: number;
    createdAt: string;
    priority: boolean;
    ratings: number;
    ratingsLevel: string;
  }

  const renderData: { [date: string]: (Task | Reward)[] } =
    allCompleted?.data.reduce(
      (acc: { [x: string]: any[] }, item: { completedDate: any }) => {
        const date = item.completedDate;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        console.log(acc, "acc here");
        return acc;
      },
      {}
    );

  return (
    <div className="px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="flex flex-col mb-2">
        <div className="flex flex-row items-end justify-between">
          <div className="flex flex-col relative w-full items-end cursor-pointer">
            <div
              onClick={() => {
                setShowCalender(!showCalender);
              }}
              className="flex items-end justify-end text-xs text-[#714EE7] gap-2"
            >
              <CalendarDays size={18} stroke="#7C56FE" />
            </div>

            {showCalender && (
              <>
                <div className="absolute top-10 bg-white -m-3 border-2 border-[#6200EE] rounded-2xl">
                  <style>{css}</style>
                  <DayPicker
                    mode="single"
                    required
                    fixedWeeks
                    showOutsideDays
                    selected={selectedDay}
                    onSelect={setSelectedDay}
                    modifiersClassNames={{
                      selected: "my-selected",
                      today: "my-today",
                      conainer: "container",
                    }}
                    footer={<CloseCalender />}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* <div onClick={() => setSeeAllTasks(!seeAllTasks)}>
        {seeAllTasks ? (
          <p className="text-xs cursor-pointer text-[#7C56FE] py-3 font-bold text-end">
            View activities by date
          </p>
        ) : (
          <p className="text-xs cursor-pointer text-[#7C56FE] py-3 font-bold text-end">
            View all completed activities
          </p>
        )}
      </div> */}

      {seeAllTasks ? (
        <div>
          {allCompleted?.data.length >= 1 ? (
            <div className="py-3">
              {Object.entries(renderData).map(([date, items]) => (
                <div key={date} className="pb-5">
                  <p className="text-xs text-[#141414] py-3 font-bold">
                    {date}
                  </p>
                  {items.map((i, index) => (
                    <div key={index}>
                      <>
                        {i.type === "DAILY_REWARD" ? (
                          <div
                            key={i.id}
                            className="text-[#626262] mb-3 bg-white font-bold flex items-center justify-between p-3 rounded-xl"
                          >
                            <p className="text-xs">Daily rewards</p>
                            <p className="text-sm">1000 pts</p>
                          </div>
                        ) : (
                          <TodoCompletedForm
                            key={i.id}
                            score={i.score}
                            reward={i.reward}
                            priority={i.priority}
                            taskTitle={i.description}
                            approximateTime={i.duration / 60}
                            ratings={i.ratings || 675}
                            ratingsLevel={
                              i.ratingsLevel || "/images/empty-rating.svg"
                            }
                          />
                        )}
                      </>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : allLoading ? (
            <SpinnerIcon />
          ) : (
            <NoCompletedTaskOnDate onclick={() => setSeeAllTasks(true)} />
          )}
        </div>
      ) : (
        <div>
          {data?.data.length >= 1 ? (
            <div className="">
              <p className="text-xs text-[#141414] py-3 font-bold">
                {formatDate(selectedDay)}
              </p>

              {data?.data?.map((i: any) => (
                <>
                  {i.type === "DAILY_REWARD" ? (
                    <div
                      key={i.id}
                      className="text-[#626262] mb-3 bg-white font-bold flex items-center justify-between p-3 rounded-xl"
                    >
                      <p className="text-xs">Daily rewards</p>
                      <p className="text-sm">1000 pts</p>
                    </div>
                  ) : (
                    <TodoCompletedForm
                      key={i.id}
                      score={i.score}
                      reward={i.reward}
                      priority={i.priority}
                      taskTitle={i.description}
                      approximateTime={i.duration / 60}
                      ratings={i.ratings || 675}
                      ratingsLevel={
                        i.ratingsLevel || "/images/empty-rating.svg"
                      }
                    />
                  )}
                </>
              ))}
            </div>
          ) : isLoading ? (
            <SpinnerIcon />
          ) : (
            <NoCompletedTaskOnDate onclick={() => setSeeAllTasks(true)} />
          )}
        </div>
      )}

      {/* <TaskListByDate /> */}

      {/* <CoompletedSurvey /> */}
    </div>
  );
};

export default CompletedActivities;
